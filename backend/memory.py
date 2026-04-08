from collections import deque

# short-term memory (conversation)
conversation_memory = {}

# long-term memory (user profile)
user_memory = {}

MAX_HISTORY = 10


def get_history(user_id: str):
    if user_id not in conversation_memory:
        conversation_memory[user_id] = deque(maxlen=MAX_HISTORY)
    return conversation_memory[user_id]


def add_message(user_id: str, role: str, content: str):
    history = get_history(user_id)
    history.append({"role": role, "content": content})


def get_user_profile(user_id: str):
    if user_id not in user_memory:
        user_memory[user_id] = {
            "moods": [],
            "preferred_tone": "mixed",
            "spiritual_enabled": True
        }
    return user_memory[user_id]


def update_user_profile(user_id: str, mood: str):
    profile = get_user_profile(user_id)
    profile["moods"].append(mood)
