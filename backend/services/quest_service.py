from firebase_admin import db

def fetch_all_quests():
    try:
        quests_ref = db.reference("quests")
        quests = quests_ref.get()

        if not quests:
            return []

        quest_list = []
        for quest_id, quest_data in quests.items():
            quest_list.append({
                "quest_id": quest_id,
                **quest_data
            })
        return quest_list
    except Exception as e:
        raise ValueError(f"Error fetching all quests: {str(e)}")


def fetch_quest_by_id(quest_id: str):
    try:
        quest_ref = db.reference(f"quests/{quest_id}")
        quest = quest_ref.get()

        if not quest:
            raise ValueError(f"Quest with ID {quest_id} not found")
        return quest
    except Exception as e:
        raise ValueError(f"Error fetching quest: {str(e)}")


def create_new_quest(quest_data: dict):
    try:

        if "questID" not in quest_data:
            raise ValueError("questId is required to create a new quest.")

        if "targetDescription" in quest_data:
            quest_data["target_description"] = quest_data.pop("targetDescription")
        
        if "questID" in quest_data:
            quest_data["questId"] = quest_data.pop("questID")

        quest_id = quest_data["questId"]
        quests_ref = db.reference("quests")
        new_quest_ref = quests_ref.child(quest_id)
        new_quest_ref.set(quest_data)

        return {"quest_id": new_quest_ref.key, **quest_data}

    except Exception as e:
        print(f"Error details: {e}")
        print(f"Quest data: {quest_data}")
        raise ValueError(f"Error creating quest: {str(e)}")

def update_quest_by_id(quest_id: str, updated_data: dict):
    try:
        quest_ref = db.reference(f"quests/{quest_id}")
        existing_data = quest_ref.get()

        if "targetDescription" in updated_data:
            updated_data["target_description"] = updated_data.pop("targetDescription")

        if not existing_data:
            raise ValueError(f"Quest with ID {quest_id} not found")

        quest_ref.update(updated_data)
        return {"quest_id": quest_id, **updated_data}
    except Exception as e:
        raise ValueError(f"Error updating quest: {str(e)}")


def delete_quest_by_id(quest_id: str):
    try:
        quest_ref = db.reference(f"quests/{quest_id}")
        existing_data = quest_ref.get()

        if not existing_data:
            raise ValueError(f"Quest with ID {quest_id} not found")

        quest_ref.delete()
        return True
    except Exception as e:
        raise ValueError(f"Error deleting quest: {str(e)}")
