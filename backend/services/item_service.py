from firebase_admin import db

def fetch_all_items():
    try:
        items_ref = db.reference("items")
        items = items_ref.get()

        if not items:
            return []

        item_list = []
        for item_id, item_data in items.items():
            item_list.append({
                "item_id": item_id,
                **item_data
            })
        return item_list
    except Exception as e:
        raise ValueError(f"Error fetching all items: {str(e)}")


def fetch_item_by_id(item_id: str):
    try:
        item_ref = db.reference(f"items/{item_id}")
        item = item_ref.get()

        if not item:
            raise ValueError(f"Item with ID {item_id} not found")
        return item
    except Exception as e:
        raise ValueError(f"Error fetching item: {str(e)}")


def create_new_item(item_data: dict):
    try:
        if "itemId" not in item_data:
            raise ValueError("itemId is required to create a new item.")

        item_id = item_data["itemId"]
        items_ref = db.reference("items")
        new_item_ref = items_ref.child(item_id)
        new_item_ref.set(item_data)

        return {"item_id": new_item_ref.key, **item_data}
    except Exception as e:
        raise ValueError(f"Error creating item: {str(e)}")


def update_item_by_id(item_id: str, updated_data: dict):
    try:
        item_ref = db.reference(f"items/{item_id}")
        existing_data = item_ref.get()

        if not existing_data:
            raise ValueError(f"Item with ID {item_id} not found")

        item_ref.update(updated_data)
        return {"item_id": item_id, **updated_data}
    except Exception as e:
        raise ValueError(f"Error updating item: {str(e)}")


def delete_item_by_id(item_id: str):
    try:
        item_ref = db.reference(f"items/{item_id}")
        existing_data = item_ref.get()

        if not existing_data:
            raise ValueError(f"Item with ID {item_id} not found")

        item_ref.delete()
        return True
    except Exception as e:
        raise ValueError(f"Error deleting item: {str(e)}")
