from app.database import get_db_ref
from typing import List, Dict

def fetch_all_users() -> List[Dict[str, str]]:
    db_ref = get_db_ref("users")
    users_data = db_ref.get()

    if not users_data:
        return []
    
    users = []
    for user_id, user_info in users_data.item():
        user_info["id"] = user_id
        users.append(user_info)
    
    return users