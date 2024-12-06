import os
from pathlib import Path

# Đường dẫn đến tệp service account key
BASE_DIR = Path(__file__).resolve().parent.parent
SERVICE_ACCOUNT_KEY_PATH = BASE_DIR / "serviceAccountKey.json"

# Firebase config
FIREBASE_DATABASE_URL = "https://unity3d-game-eternal-odyssey-default-rtdb.asia-southeast1.firebasedatabase.app/"

