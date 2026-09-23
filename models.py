from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import JSON
from sqlmodel import SQLModel, Field

def utcnow() -> datetime:
    return datetime.now(timezone.utc)

class Mandi(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    district: str
    latitude: float
    longitude: float
    # Maps crop -> modal price e.g. {"Soybean": 4720, "Cotton": 7150, "Wheat": 2450}
    modal_prices: dict = Field(default_factory=dict, sa_type=JSON)

class Buyer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    type: str  # Processor, Trader, Institutional
    crops_accepted: List[str] = Field(default_factory=list, sa_type=JSON)
    min_order_qty_qtl: float
    # Maps crop -> offer price e.g. {"Soybean": 4820}
    offer_prices: dict = Field(default_factory=dict, sa_type=JSON)

class Lot(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    crop: str = Field(index=True)
    quantity_qtl: float
    quality_grade: str
    latitude: float
    longitude: float
    location_name: str = Field(default="Nagpur")
    status: str = Field(default="active")  # active, pooled, sold
    pool_id: Optional[int] = Field(default=None, foreign_key="pool.id")
    created_at: datetime = Field(default_factory=utcnow)

class Pool(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    crop: str = Field(index=True)
    total_quantity_qtl: float
    member_count: int = 1
    status: str = Field(default="forming")  # forming, matched, completed
    matched_buyer_id: Optional[int] = Field(default=None, foreign_key="buyer.id")
    created_at: datetime = Field(default_factory=utcnow)

class Offer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    lot_id: Optional[int] = Field(default=None, foreign_key="lot.id")
    pool_id: Optional[int] = Field(default=None, foreign_key="pool.id")
    buyer_name: str
    offered_price: float
    status: str = Field(default="pending")  # pending, accepted, rejected
    payment_status: str = Field(default="not_started")  # not_started, pending, paid
    created_at: datetime = Field(default_factory=utcnow)