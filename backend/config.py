import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Đường dẫn đến tệp service account key
BASE_DIR = Path(__file__).resolve().parent.parent
SERVICE_ACCOUNT_KEY_PATH = BASE_DIR / "backend" / "serviceAccountKey.json"

# Firebase config
FIREBASE_DATABASE_URL = "https://unity3d-game-eternal-odyssey-default-rtdb.asia-southeast1.firebasedatabase.app/"

# Secret key để mã hóa JWT
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Thay bằng giá trị mạnh hơn trong môi trường production

# Thuật toán mã hóa JWT
ALGORITHM = "HS256"

# Thời gian hết hạn của Access Token (phút)
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Thời gian hết hạn của Refresh Token (ngày)
REFRESH_TOKEN_EXPIRE_DAYS = 7

# -------------------
# Environment Settings
# -------------------

# Môi trường hiện tại (development/production)
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Debug mode
DEBUG = ENVIRONMENT == "development"

# ---------------------
# Cấu hình các tham số khác
# ---------------------

# Số lần thử đăng nhập sai tối đa (nếu cần quản lý brute-force attack)
MAX_LOGIN_ATTEMPTS = 5