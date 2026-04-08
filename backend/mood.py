from datetime import datetime
from collections import defaultdict

# In-memory store (later MongoDB)
mood_db = defaultdict(list)

def track_mood(user_id: str, mood: str):
    mood_score_map = {
        "low": 2,
        "okay": 3,
        "good": 4,
        "great": 5
    }

    mood_db[user_id].append({
        "date": datetime.now().strftime("%Y-%m-%d"),
        "score": mood_score_map.get(mood, 3)
    })


def get_mood_history(user_id: str):
    return mood_db.get(user_id, [])
