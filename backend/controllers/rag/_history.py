import json
import os

from models import _constants


############################################################################################################
# Save history
def save_history(session_id, query, answer):
    chatbot_name = _constants.NAME_CHATBOT
    _path = _constants.DATAS_PATH

    path = f"{_path}/{chatbot_name}/history"
    os.makedirs(path, exist_ok=True)

    user_history_file = os.path.join(
        path, f"history_{session_id}.json"
    )
    history = []
    if os.path.exists(user_history_file):
        with open(user_history_file, "r", encoding="utf-8") as file:
            try:
                history = json.load(file)
            except json.JSONDecodeError:
                print(f"Error decoding JSON from file: {user_history_file}")
                pass

    history.append({"query": query, "answer": answer})

    if len(history) > 3:
        history = history[-3:]

    for entry in history[:-2]:
        entry["answer"] = ""

    with open(user_history_file, "w", encoding="utf-8") as file:
        json.dump(history, file, indent=4)

    return


############################################################################################################
# Load history
def get_history(session_id):
    chatbot_name = _constants.NAME_CHATBOT
    _path = _constants.DATAS_PATH

    path = f"{_path}/{chatbot_name}/history"

    user_history_file = os.path.join(
        path, f"history_{session_id}.json"
    )

    if not os.path.exists(user_history_file):
        return []

    if os.path.getsize(user_history_file) == 0:
        return []

    with open(user_history_file, "r", encoding="utf-8") as file:
        try:
            history = json.load(file)
        except json.JSONDecodeError:
            print(f"Error decoding JSON from file: {user_history_file}")
            return []

    return history
