import firebase_admin
from firebase_admin import credentials, db
from app.config import SERVICE_ACCOUNT_KEY_PATH, FIREBASE_DATABASE_URL

# Khởi tạo Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': FIREBASE_DATABASE_URL
})

# Hàm để lấy reference tới một phần của database
def get_db_ref(path: str = "/"):
    return db.reference(path)
