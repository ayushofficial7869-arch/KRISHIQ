from sqlmodel import Session, select
from database import engine
from models import Mandi, Buyer, Lot

def seed_initial_data():
    with Session(engine) as session:
        # Check if already seeded
        existing_mandis = session.exec(select(Mandi)).first()
        if existing_mandis:
            return

        # 1. Baseline Mandis
        mandis = [
            Mandi(name="Nagpur Mandi", district="Nagpur", latitude=21.1458, longitude=79.0882, modal_prices={"Soybean": 4720, "Cotton": 7150, "Wheat": 2450}),
            Mandi(name="Akola Mandi", district="Akola", latitude=20.7002, longitude=77.0082, modal_prices={"Soybean": 4680, "Cotton": 7080, "Wheat": 2410}),
            Mandi(name="Amravati Mandi", district="Amravati", latitude=20.9374, longitude=77.7796, modal_prices={"Soybean": 4760, "Cotton": 7120, "Wheat": 2480}),
            Mandi(name="Wardha Mandi", district="Wardha", latitude=20.7453, longitude=78.6022, modal_prices={"Soybean": 4630, "Cotton": 6990, "Wheat": 2390}),
            Mandi(name="Yavatmal Mandi", district="Yavatmal", latitude=20.3888, longitude=78.1204, modal_prices={"Soybean": 4610, "Cotton": 7040, "Wheat": 2380}),
        ]
        session.add_all(mandis)

        # 2. Baseline Buyers
        buyers = [
            Buyer(name="Vidarbha Agro Processing", type="Processor", crops_accepted=["Soybean", "Cotton"], min_order_qty_qtl=60, offer_prices={"Soybean": 4820, "Cotton": 7350}),
            Buyer(name="Nagpur Oil Mills", type="Processor", crops_accepted=["Soybean"], min_order_qty_qtl=40, offer_prices={"Soybean": 4790}),
            Buyer(name="Shree Traders", type="Trader", crops_accepted=["Soybean", "Cotton", "Wheat"], min_order_qty_qtl=15, offer_prices={"Soybean": 4700, "Cotton": 7200, "Wheat": 2420}),
            Buyer(name="AgriCorp Institutional", type="Institutional", crops_accepted=["Soybean", "Cotton"], min_order_qty_qtl=100, offer_prices={"Soybean": 5010, "Cotton": 7480}),
        ]
        session.add_all(buyers)

        # 3. Active Demo Lots for Clustering & Pooling
        lots = [
            Lot(crop="Soybean", quantity_qtl=22, quality_grade="B", latitude=21.09, longitude=79.07, location_name="Hingna"),
            Lot(crop="Soybean", quantity_qtl=18, quality_grade="B", latitude=21.22, longitude=79.14, location_name="Kamptee"),
            Lot(crop="Soybean", quantity_qtl=15, quality_grade="B", latitude=20.98, longitude=78.96, location_name="Butibori"),
            Lot(crop="Cotton", quantity_qtl=35, quality_grade="A", latitude=21.12, longitude=79.02, location_name="Kalmeshwar"),
        ]
        session.add_all(lots)
        session.commit()