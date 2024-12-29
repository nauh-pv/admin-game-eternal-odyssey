from app.database import get_db_ref
from typing import List, Dict
from fastapi import Request
from firebase_admin import auth, db

def fetch_worlds_for_user(user_id: str):
    try:
        worlds_ref = db.reference("worlds")
        all_worlds = worlds_ref.get()

        if not all_worlds:
            return []

        user_worlds = []

        for world_id, world_data in all_worlds.items():
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