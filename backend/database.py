from pymongo import MongoClient
from dotenv import load_dotenv

import os

# ====================================
# LOAD ENV
# ====================================

load_dotenv()

# ====================================
# MONGO URI
# ====================================

MONGO_URI = os.getenv(
    "MONGO_URI"
)

# ====================================
# CLIENT
# ====================================

client = MongoClient(
    MONGO_URI
)

# ====================================
# DATABASE
# ====================================

db = client["recipe_ai"]

# ====================================
# COLLECTIONS
# ====================================

recipes_collection = db["recipes"]

favorites_collection = db["favorites"]