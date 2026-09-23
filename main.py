from __future__ import annotations

from contextlib import asynccontextmanager
from datetime import datetime, timezone
from math import asin, ceil, cos, radians, sin, sqrt
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlmodel import Session, or_, select

from database import engine, get_session, init_db
from models import Buyer, Lot, Mandi, Offer, Pool
from seed import seed_initial_data

limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    seed_initial_data()
    yield

app = FastAPI(title="Krishiq API", version="1.4.0", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://krishiq.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TRUCK_CAPACITY_QTL = 100
BASE_TRUCK_COST = 1800
TRUCK_COST_PER_KM = 42
APMC_FEE_RATE = 0.01
COMMISSION_RATE = 0.02
HAMALI_PER_QTL = 22

GRADE_FACTORS = {"A": 1.04, "B": 1.00, "C": 0.95, "FAQ": 1.00}

def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    earth_radius_km = 6371.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * earth_radius_km * asin(sqrt(a))

def calc_transport_per_qtl(distance_km: float, quantity_qtl: float) -> float:
    effective_load = min(max(quantity_qtl, 1.0), TRUCK_CAPACITY_QTL)
    trip_cost = BASE_TRUCK_COST + (TRUCK_COST_PER_KM * distance_km)
    return trip_cost / effective_load

def calc_net_realisation(modal_price: float, distance_km: float, quantity_qtl: float) -> dict:
    transport_qtl = calc_transport_per_qtl(distance_km, quantity_qtl)
    apmc = modal_price * APMC_FEE_RATE
    commission = modal_price * COMMISSION_RATE
    hamali = HAMALI_PER_QTL
    net_per_qtl = modal_price - apmc - commission - hamali - transport_qtl
    return {
        "modal_price": round(modal_price, 2),
        "transport_per_qtl": round(transport_qtl, 2),
        "net_per_qtl": round(net_per_qtl, 2),
        "total_net": round(net_per_qtl * quantity_qtl, 2),
    }

DAILY_STORAGE_RATE_PER_QTL = {
    "Soybean": 1.20,
    "Wheat": 0.90,
    "Cotton": 2.50
}

# Post-harvest seasonal recovery rate (expected % price appreciation over a 15-day hold)
SEASONAL_15D_APPRECIATION_RATE = {
    "Soybean": 0.035,   # +3.5%
    "Wheat": 0.020,     # +2.0%
    "Cotton": 0.040      # +4.0%
}

def evaluate_sell_vs_wait(crop: str, current_modal: float, quantity_qtl: float, window_days: int = 15) -> dict:
    daily_rate = DAILY_STORAGE_RATE_PER_QTL.get(crop, 1.20)
    appreciation_rate = SEASONAL_15D_APPRECIATION_RATE.get(crop, 0.03)

    total_storage_cost_per_qtl = daily_rate * window_days
    total_holding_cost = round(total_storage_cost_per_qtl * quantity_qtl, 2)

    projected_modal_per_qtl = round(current_modal * (1 + appreciation_rate), 2)
    expected_gross_gain_per_qtl = round(projected_modal_per_qtl - current_modal, 2)
    expected_net_gain_per_qtl = round(expected_gross_gain_per_qtl - total_storage_cost_per_qtl, 2)

    # If holding gain exceeds warehouse fee by at least ₹25/qtl, recommend waiting
    recommend_wait = expected_net_gain_per_qtl >= 25.0

    return {
        "verdict": "WAIT & STORE" if recommend_wait else "SELL NOW",
        "holding_window_days": window_days,
        "daily_storage_per_qtl": daily_rate,
        "total_storage_cost_per_qtl": total_storage_cost_per_qtl,
        "projected_modal_per_qtl": projected_modal_per_qtl,
        "expected_net_gain_per_qtl": expected_net_gain_per_qtl,
        "total_projected_delta": round(expected_net_gain_per_qtl * quantity_qtl, 2),
        "reasoning": (
            f"Holding for {window_days} days earns an estimated net gain of ₹{expected_net_gain_per_qtl}/q after warehouse fees."
            if recommend_wait
            else f"Selling today avoids ₹{total_storage_cost_per_qtl}/q warehouse costs that erode expected market gains."
        )
    }

class RecommendationRequest(BaseModel):
    crop: str = "Soybean"
    quantity_qtl: float = Field(default=20.0, gt=0)
    quality_grade: str = "B"
    latitude: float = 21.1458
    longitude: float = 79.0882

    @field_validator("quality_grade", mode="before")
    def clean_grade(cls, v):
        return "B" if v == "FAQ" else str(v).upper()

class LotCreateRequest(BaseModel):
    crop: str
    quantity_qtl: float = Field(..., gt=0)
    quality_grade: str = "B"
    latitude: float = 21.1458
    longitude: float = 79.0882
    location_name: Optional[str] = "Nagpur"

class PoolJoinRequest(BaseModel):
    lot_id: int

class OfferStatusUpdate(BaseModel):
    status: str  # accepted, rejected

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "krishiq-api", "storage": "sqlite"}

@app.post("/recommendations")
@limiter.limit("30/minute")
def get_recommendations(
    request: Request, req: RecommendationRequest, session: Session = Depends(get_session)
):
    factor = GRADE_FACTORS.get(req.quality_grade, 1.00)

    mandis_db = session.exec(select(Mandi)).all()
    ranked_mandis = []
    for m in mandis_db:
        if req.crop in m.modal_prices:
            dist = haversine_km(req.latitude, req.longitude, m.latitude, m.longitude)
            price = m.modal_prices[req.crop] * factor
            res = calc_net_realisation(price, dist, req.quantity_qtl)
            ranked_mandis.append({
                "id": m.id,
                "name": m.name,
                "price": round(price),
                "distance": f"{round(dist, 1)} km",
                "net": round(res["net_per_qtl"]),
                "transport_per_qtl": res["transport_per_qtl"],
                "note": "",
            })

    ranked_mandis.sort(key=lambda x: x["net"], reverse=True)
    for idx, m in enumerate(ranked_mandis, start=1):
        m["rank"] = idx
        if idx == 1:
            m["note"] = "Optimal return after APMC, hamali & transport deductions."
        elif "km" in m["distance"] and float(m["distance"].replace(" km", "")) > 100:
            m["note"] = "Long transit distance increases transport deductions."
        else:
            m["note"] = "Local selling alternative."

    active_lots_db = session.exec(
        select(Lot).where(Lot.crop == req.crop, Lot.status == "active")
    ).all()

    nearby_lots = [
        l for l in active_lots_db
        if haversine_km(req.latitude, req.longitude, l.latitude, l.longitude) <= 35.0
    ]

    pool_suggestion = None
    if nearby_lots and req.quantity_qtl < 80:
        added_qty = sum(l.quantity_qtl for l in nearby_lots)
        total_pooled_qty = req.quantity_qtl + added_qty
        top_mandi = ranked_mandis[0] if ranked_mandis else None

        if top_mandi:
            dist_val = float(top_mandi["distance"].replace(" km", ""))
            pooled_calc = calc_net_realisation(top_mandi["price"], dist_val, total_pooled_qty)
            solo_net = top_mandi["net"]
            pooled_net = pooled_calc["net_per_qtl"]

            buyers_db = session.exec(select(Buyer)).all()
            unlocked = [
                b.name for b in buyers_db
                if req.crop in b.crops_accepted and req.quantity_qtl < b.min_order_qty_qtl <= total_pooled_qty
            ]

            pool_suggestion = {
                "active": True,
                "farmer_count": len(nearby_lots) + 1,
                "total_pooled_qty": total_pooled_qty,
                "solo_net": solo_net,
                "pooled_net": pooled_net,
                "savings_per_qtl": round(pooled_net - solo_net, 2),
                "unlocked_buyers": unlocked,
            }

    top_modal = ranked_mandis[0]["price"] if ranked_mandis else 4720
    timing_rec = evaluate_sell_vs_wait(req.crop, top_modal, req.quantity_qtl)

    return {
        "status": "success",
        "crop": req.crop,
        "quantity_qtl": req.quantity_qtl,
        "mandis": ranked_mandis,
        "pooling": pool_suggestion,
        "timing_recommendation": timing_rec,
    }

@app.post("/lots")
@limiter.limit("20/minute")
def create_lot(
    request: Request, payload: LotCreateRequest, session: Session = Depends(get_session)
):
    grade = "B" if payload.quality_grade == "FAQ" else payload.quality_grade.upper()
    lot = Lot(
        crop=payload.crop.capitalize(),
        quantity_qtl=payload.quantity_qtl,
        quality_grade=grade,
        latitude=payload.latitude,
        longitude=payload.longitude,
        location_name=payload.location_name,
        status="active",
        created_at=datetime.now(timezone.utc)
    )
    session.add(lot)
    session.commit()
    session.refresh(lot)
    return {"status": "success", "lot": lot}

@app.post("/pools/join")
@limiter.limit("20/minute")
def join_or_create_pool(
    request: Request, payload: PoolJoinRequest, session: Session = Depends(get_session)
):
    lot = session.get(Lot, payload.lot_id)
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")
    if lot.status == "pooled":
        return {"status": "already_pooled", "message": "Lot is already part of an active pool."}

    # Find existing forming pool with same crop
    pool = session.exec(
        select(Pool).where(Pool.crop == lot.crop, Pool.status == "forming")
    ).first()

    if not pool:
        pool = Pool(
            crop=lot.crop,
            total_quantity_qtl=lot.quantity_qtl,
            member_count=1,
            status="forming",
            created_at=datetime.now(timezone.utc)
        )
        session.add(pool)
        session.flush()
    else:
        pool.total_quantity_qtl += lot.quantity_qtl
        pool.member_count += 1

    lot.status = "pooled"
    lot.pool_id = pool.id
    session.commit()
    session.refresh(pool)

    # Check buyer unlocking
    buyers = session.exec(select(Buyer)).all()
    qualifying_buyer = next(
        (b for b in buyers if lot.crop in b.crops_accepted and b.min_order_qty_qtl <= pool.total_quantity_qtl),
        None
    )
    if qualifying_buyer:
        pool.matched_buyer_id = qualifying_buyer.id
        pool.status = "matched"

        # Create an offer entry if not already present
        existing_offer = session.exec(select(Offer).where(Offer.pool_id == pool.id)).first()
        if not existing_offer:
            offer_price = qualifying_buyer.offer_prices.get(lot.crop, 4800)
            session.add(Offer(
                pool_id=pool.id,
                lot_id=lot.id,
                buyer_name=qualifying_buyer.name,
                offered_price=offer_price,
                status="accepted",
                payment_status="pending",
                created_at=datetime.now(timezone.utc)
            ))
        session.commit()
        session.refresh(pool)

    return {"status": "success", "pool": pool}

@app.get("/pools")
def list_pools(session: Session = Depends(get_session)):
    pools = session.exec(select(Pool)).all()
    results = []
    for p in pools:
        buyer_name = "Forming pool (searching buyers)"
        target_moq = 80
        if p.matched_buyer_id:
            b = session.get(Buyer, p.matched_buyer_id)
            if b:
                buyer_name = f"{b.name} (Min {b.min_order_qty_qtl} qtl)"
                target_moq = b.min_order_qty_qtl

        fill_pct = min(100, round((p.total_quantity_qtl / TRUCK_CAPACITY_QTL) * 100))

        member_lot = session.exec(
            select(Lot).where(Lot.pool_id == p.id).order_by(Lot.id)
        ).first()

        results.append({
            "id": p.id,
            "crop": p.crop,
            "grade": "Standard / Pooled",
            "qty": p.total_quantity_qtl,
            "status": p.status,
            "buyer": buyer_name,
            "members": p.member_count,
            "fill_pct": fill_pct,
            "target_moq": target_moq,
            "member_lot_id": member_lot.id if member_lot else None
        })
    return {"pools": results}

@app.get("/pools/{pool_id}/members")
def get_pool_members(pool_id: int, session: Session = Depends(get_session)):
    pool = session.get(Pool, pool_id)
    if not pool:
        raise HTTPException(status_code=404, detail="Pool not found")

    member_lots = session.exec(
        select(Lot).where(Lot.pool_id == pool_id).order_by(Lot.id)
    ).all()

    return {
        "pool": {
            "id": pool.id,
            "crop": pool.crop,
            "total_quantity_qtl": pool.total_quantity_qtl,
            "member_count": pool.member_count,
            "status": pool.status,
            "matched_buyer_id": pool.matched_buyer_id
        },
        "members": [
            {
                "id": l.id,
                "crop": l.crop,
                "quantity_qtl": l.quantity_qtl,
                "quality_grade": l.quality_grade,
                "location_name": l.location_name,
                "status": l.status
            } for l in member_lots
        ]
    }

@app.get("/offers/lot/{lot_id}")
def get_lot_offers(lot_id: int, session: Session = Depends(get_session)):
    lot = session.get(Lot, lot_id)
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")

    where_clause = (Offer.lot_id == lot_id)
    if lot.pool_id:
        where_clause = or_(where_clause, Offer.pool_id == lot.pool_id)
    offers = session.exec(select(Offer).where(where_clause)).all()

    # If no dynamic offer exists yet, populate realistic contextual bids
    if not offers:
        buyers = session.exec(select(Buyer)).all()
        for b in buyers:
            if lot.crop in b.crops_accepted:
                price = b.offer_prices.get(lot.crop, 4700)
                status = "accepted" if lot.quantity_qtl >= b.min_order_qty_qtl else "pending"
                session.add(Offer(
                    lot_id=lot.id,
                    buyer_name=b.name,
                    offered_price=price,
                    status=status,
                    payment_status="not_started",
                    created_at=datetime.now(timezone.utc)
                ))
        session.commit()
        offers = session.exec(select(Offer).where(where_clause)).all()

    pool_qty = None
    if lot.pool_id:
        pool = session.get(Pool, lot.pool_id)
        pool_qty = pool.total_quantity_qtl if pool else None

    return {
        "lot": {
            "id": lot.id,
            "crop": lot.crop,
            "qty": lot.quantity_qtl,
            "status": lot.status
        },
        "offers": [
            {
                "id": o.id,
                "buyer": o.buyer_name,
                "price": o.offered_price,
                "total_value": round(o.offered_price * (pool_qty or lot.quantity_qtl)),
                "status": o.status,
                "payment": o.payment_status
            } for o in offers
        ]
    }

@app.post("/offers/{offer_id}/status")
def update_offer_status(
    offer_id: int, payload: OfferStatusUpdate, session: Session = Depends(get_session)
):
    if payload.status not in ("accepted", "rejected"):
        raise HTTPException(status_code=400, detail="Status must be 'accepted' or 'rejected'")
    offer = session.get(Offer, offer_id)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    offer.status = payload.status
    if payload.status == "accepted" and offer.payment_status == "not_started":
        offer.payment_status = "pending"
    session.commit()
    session.refresh(offer)
    return {"status": "success", "offer": offer}

@app.patch("/offers/{offer_id}/pay")
def mark_offer_paid(offer_id: int, session: Session = Depends(get_session)):
    offer = session.get(Offer, offer_id)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    offer.payment_status = "paid"
    offer.status = "accepted"
    session.commit()
    session.refresh(offer)
    return {"status": "success", "offer": offer}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)