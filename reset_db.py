import os
from database import init_db
from seed import seed_initial_data

DB_PATH = "krishiq.db"

def reset():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        print(f"Removed existing {DB_PATH}.")
    init_db()
    seed_initial_data()
    print("Clean SQLite database initialized and seeded successfully!")

if __name__ == "__main__":
    reset()