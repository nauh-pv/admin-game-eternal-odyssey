from typing import List, Dict
from fastapi import Request
from firebase_admin import auth, db
from datetime import datetime

from app.database import get_db_ref

from app.models.user_model import UserRegister, Token

def format_timestamp(timestamp: int) -> str:
    """Chuyển đổi timestamp thành chuỗi ngày giờ."""
    return datetime.fromtimestamp(timestamp / 1000).strftime('%d/%m/%Y %H:%M:%S')  # Chia 1000 vì timestamp là mili giây


def fetch_all_users() -> List[Dict[str, str]]:
    all_users = auth.list_users().iterate_all()  # Lấy tất cả người dùng
    user_list = []

    for user in all_users:
        user_id = user.uid
        db_ref = db.reference(f"users/{user_id}")
        user_data = db_ref.get() or {}

        user_info = {
            "id": user_id,
            "email": user.email,
            "username": user_data.get("username", "N/A"),
            "created_at": format_timestamp(user.user_metadata.creation_timestamp),  # Chuyển đổi timestamp
            "updated_at": format_timestamp(user_data.get("updated_at", 0)), 
            "status": user_data.get("status", "N/A"),
            "role": user_data.get("role", "user"),  
        }
        user_list.append(user_info)
    
    return user_list

def user_exists(email: str, username: str) -> bool:
    users_ref = db.reference("users")
    email_query = users_ref.order_by_child("email").equal_to(email).get()
    if email_query:
        return True
    username_query = users_ref.order_by_child("username").equal_to(username).get()
    if username_query:
        return True
    return False

def register_user(user: UserRegister) -> Token:
    try:

        if user_exists(user.email, user.username):
            raise ValueError("Email hoặc username đã được sử dụng.")  # Lỗi nghiệp vụ

        firebase_user = auth.create_user(
            email = user.email,
            password = user.password,
            display_name = user.username
        )

        user_data = {
            "userID": firebase_user.uid,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
        get_db_ref(f"users/{firebase_user.uid}").set(user_data)

        return {"message": "User registered successfully"}
    except Exception as e:
        raise ValueError(f"{str(e)}")

def login_user(id_token: str) -> dict:
    try:
        decoded_token = auth.verify_id_token(id_token)

        user_id = decoded_token["uid"]

        ref = db.reference(f"users/{user_id}")
        user_data_from_db = ref.get()

        if not user_data_from_db:
            raise ValueError("User not found in Firebase Realtime Database")

        user_data = {
            "user_id": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name"),
            "role": user_data_from_db.get("role", "user"),
            "message": "Login successful"
        }
        return user_data
    except Exception as e:
        raise ValueError(f"{str(e)}")

def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token 
    except Exception as e:
        raise ValueError(f"{str(e)}")

def extract_token_from_header(request: Request) -> str:
    auth_header = request.headers.get("Authorization")
    print(auth_header)
    if not auth_header:
        raise ValueError("Authorization header is missing")

    if not auth_header.startswith("Bearer "):
        raise ValueError("Authorization header must start with 'Bearer'")

    id_token = auth_header.split(" ")[1]
    print(id_token)
    if not id_token:
        raise ValueError("Bearer token is missing")

    return id_token

def delete_user(user_id: str):
    try:
        auth.delete_user(user_id)
        db.reference(f"users/{user_id}").delete()

        return {"message": f"User with ID {user_id} has been deleted"}
    except auth.UserNotFoundError:
        raise ValueError("User not found")
    except Exception as e:
        raise ValueError(f"Failed to delete user: {str(e)}")
    
def update_user_password(user_id: str, new_password: str):
    try:
        auth.update_user(user_id, password=new_password)
        return {"message": "Password updated successfully"}
    except auth.UserNotFoundError:
        raise ValueError("User not found")
    except Exception as e:
        raise ValueError(f"Failed to update password: {str(e)}")
    
def fetch_worlds_for_user(user_id: str):
    try:
        # Lấy reference tới node "worlds"
        worlds_ref = db.reference("worlds")
        all_worlds = worlds_ref.get()

        if not all_worlds:
            return []

        user_worlds = []

        # Duyệt qua tất cả các world
        for world_id, world_data in all_worlds.items():
            # Kiểm tra nếu user_id tồn tại trong playerWorld
            if "playerWorld" in world_data and user_id in world_data["playerWorld"]:
                user_worlds.append({
                    "world_id": world_id,
                    "name": world_data.get("name"),
                    "code": world_data.get("code"),
                    "role": world_data.get("playerWorld", {}).get(user_id, {}).get("role", None),
                    "status": world_data.get("questWorld", {}).get("status", None),
                    "startAt": world_data.get("questWorld", {}).get("startAt", None)
                })

        return user_worlds

    except Exception as e:
        raise ValueError(f"Error fetching user's worlds: {str(e)}")