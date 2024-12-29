import firebase_admin
from firebase_admin import credentials, db

from app.config import SERVICE_ACCOUNT_KEY_PATH, FIREBASE_DATABASE_URL

# Khởi tạo Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': FIREBASE_DATABASE_URL
})

def get_db_ref(path: str = "/"):
    """Trả về reference tới một phần của Firebase Database"""
    return db.reference(path)

def add_to_database(path: str, data: dict):
    """Thêm dữ liệu mới"""
    ref = get_db_ref(path)
    ref.set(data)

def update_database(path: str, data: dict):
    """Cập nhật dữ liệu"""
    ref = get_db_ref(path)
    ref.update(data)

def get_from_database(path: str):
    """Lấy dữ liệu từ Firebase"""
    ref = get_db_ref(path)
    return ref.get()

def delete_from_database(path: str):
    """Xóa dữ liệu từ Firebase"""
    ref = get_db_ref(path)
    ref.delete()