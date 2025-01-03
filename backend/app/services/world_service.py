from typing import List, Dict
from fastapi import Request
from firebase_admin import auth, db

from app.models.world_model import World

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
    
def fetch_all_worlds():
    try:
        worlds_ref = db.reference("worlds")
        worlds_data = worlds_ref.get()

        if not worlds_data:
            return []
        
        worlds = []
        for world_id, world_info in worlds_data.items():
            worlds.append({
                "world_id": world_id,
                "name": world_info.get("name"),
                "code": world_info.get("code"),
                "status": world_info.get("status"),
                "endAt": world_info.get("endAt"),
                "startAt": world_info.get("startAt")
            })

        return worlds
    except Exception as e:
        raise ValueError(f"Error fetching all worlds: {str(e)}")
    
def preprocess_world_data(world_data: dict) -> dict:
    if "questWorld" in world_data:
        for quest in world_data["questWorld"]:
            quest["questId"] = quest.get("questId")
            quest["status"] = quest.get("status", 0)
            quest.pop("quest", None)

            if "progress_quest_world" not in quest:
                quest["progress_quest_world"] = []
    
    if "playerWorld" in world_data:
        for user_id, player_data in world_data["playerWorld"].items():
            if "playerDetails" in player_data:
                skin = player_data["playerDetails"].get("skin", "")
                if isinstance(skin, str):
                    player_data["playerDetails"]["skin"] = skin.split(",")
                elif not isinstance(skin, list):
                    player_data["playerDetails"]["skin"] = []

    return world_data

def fetch_world_detail_by_id(world_id: str):
    try:
        world_ref = db.reference(f"worlds/{world_id}")
        world_data = world_ref.get()

        if not world_data:
            raise ValueError(f"World with ID {world_id} not found")

        processed_data = preprocess_world_data(world_data)
        return processed_data
    except Exception as e:
        raise ValueError(f"Error fetching world detail: {str(e)}")
    
def delete_world_by_id(world_id: str):
    try:
        world_ref = db.reference(f"worlds/{world_id}")
        existing_data = world_ref.get()

        if not existing_data:
            raise ValueError(f"World with ID {world_id} not found")

        world_ref.delete()
        return True
    except Exception as e:
        raise ValueError(f"Error deleting world: {str(e)}")
    
def delete_user_from_world(world_id: str, user_id: str):
    try:
        user_ref= db.reference(f"worlds/{world_id}/playerWorld/{user_id}")
        existing_data = user_ref.get()

        if not existing_data:
            raise ValueError("User with ID {user_id} not found")
        
        user_ref.delete()
        return True
    except Exception as e:
        raise ValueError(f"Error deleting user from world: {str(e)}")
    
def delete_item_from_inventory(world_id: str, user_id: str, item_id: str) -> bool:
    try:
        item_ref = db.reference(f"worlds/{world_id}/playerWorld/{user_id}/inventorys/{item_id}")
        existing_data = item_ref.get()

        if not existing_data:
            raise ValueError(f"Item with ID {item_id} not found in User {user_id}'s Inventory in World {world_id}")

        item_ref.delete()
        return True
    except Exception as e:
        raise ValueError(f"Error deleting item from inventory: {str(e)}")

def update_world_by_id(world_id: str, updated_data: dict) -> bool:
    try:
        world_ref = db.reference(f"worlds/{world_id}")
        existing_data = world_ref.get()

        if not existing_data:
            raise ValueError(f"World with ID {world_id} not found")

        for key, value in updated_data.items():
            existing_data[key] = value

        world_ref.update(existing_data)
        return {
            "world_id": world_id,
            "name": existing_data.get("name"),
            "code": existing_data.get("code"),
            "status": existing_data.get("status"),
            "endAt": existing_data.get("endAt"),
            "startAt": existing_data.get("startAt")
        }
    except Exception as e:
        raise ValueError(f"Error updating world: {str(e)}")
