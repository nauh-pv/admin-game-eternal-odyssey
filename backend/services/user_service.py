from typing import List, Dict
from fastapi import Request
from firebase_admin import auth, db
from datetime import datetime

from database import get_db_ref

from models.user_model import UserRegister, Token

def format_timestamp(timestamp: int) -> str:
    return datetime.fromtimestamp(timestamp / 1000).strftime('%d/%m/%Y %H:%M:%S')


def fetch_all_users() -> List[Dict[str, str]]:
    all_users = auth.list_users().iterate_all()
    user_list = []

    for user in all_users:
        user_id = user.uid
        db_ref = db.reference(f"users/{user_id}")
        user_data = db_ref.get() or {}

        user_info = {
            "id": user_id,
            "email": user.email,
            "username": user_data.get("username", "N/A"),
            "created_at": format_timestamp(user.user_metadata.creation_timestamp),
            "updated_at": format_timestamp(user_data.get("updated_at", 0)), 
            "status": user_data.get("status", "1"),
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
            raise ValueError("Email hoặc username đã được sử dụng.")

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

        print("Đây là user_id:",user_id)
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
    except auth.InvalidIdTokenError:
        raise ValueError("Invalid ID token")
    except auth.ExpiredIdTokenError:
        raise ValueError("Token has expired")
    except auth.RevokedIdTokenError:
        raise ValueError("Token has been revoked")
    except Exception as e:
        # Bắt lỗi Clock Skew hoặc các lỗi khác
        if "Token used too early" in str(e):
            raise ValueError("Clock skew detected. Please ensure your system clock is accurate.")
        raise ValueError(f"Failed to verify token: {str(e)}")

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
    
def fetch_worlds_for_user(user_id: str):
    try:
        worlds_ref = db.reference("worlds")
        all_worlds = worlds_ref.get()

        if not all_worlds:
            return []

        user_worlds = []

        for world_id, world_data in all_worlds.items():
            if "playerWorld" in world_data and user_id in world_data["playerWorld"]:
                user_world = {
                    "world_id": world_id,
                    "name": world_data.get("name"),
                    "role": world_data["playerWorld"][user_id].get("role", "0"),
                    "status": world_data.get("realtimeObject", {}).get("status", "1"),
                    "start_at": world_data.get("realtimeObject", {}).get("startAt", "N/A"),
                    "end_at": world_data.get("endAt", "N/A"),
                }
                user_worlds.append(user_world)

        return user_worlds

    except Exception as e:
        raise ValueError(f"Error fetching user's worlds: {str(e)}")
    
def fetch_user_details(user_id: str) -> dict:
    try:
        user_db_ref = db.reference(f"users/{user_id}")
        user_data = user_db_ref.get()

        if not user_data:
            raise ValueError("User not found in Firebase Realtime Database")

        user_details = {
        }

        user_worlds = fetch_worlds_for_user(user_id)
        user_details["worlds"] = user_worlds

        return user_details

    except auth.UserNotFoundError:
        raise ValueError("User not found in Firebase Authentication")
    except Exception as e:
        raise ValueError(f"Error fetching user details: {str(e)}")

def update_user_info(user_id: str, user_update: dict) -> dict:
    try:
        update_fields = {}
        if "email" in user_update:
            update_fields["email"] = user_update["email"]
        if "username" in user_update:
            update_fields["display_name"] = user_update["username"]
        if "password" in user_update:
            update_fields["password"] = user_update["password"]

        if update_fields:
            auth.update_user(user_id, **update_fields)

        db_ref = db.reference(f"users/{user_id}")
        user_data_from_db = db_ref.get()

        if not user_data_from_db:
            raise ValueError("User not found in Firebase Realtime Database")

        for key, value in user_update.items():
            user_data_from_db[key] = value

        db_ref.update(user_data_from_db)

        return {
            "user_id": user_id,
            "email": user_data_from_db.get("email"),
            "username": user_data_from_db.get("username"),
            "role": user_data_from_db.get("role"),
            "status": user_data_from_db.get("status")
        }
    except auth.UserNotFoundError:
        raise ValueError("User not found in Firebase Authentication")
    except Exception as e:
        raise ValueError(f"Error updating user information: {str(e)}")
