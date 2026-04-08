from collections import defaultdict

activity_db = defaultdict(lambda: {
    "Yoga": 0,
    "Meditation": 0,
    "Breathing": 0,
    "Journaling": 0
})

def track_activity(user_id: str, activity: str):
    if activity in activity_db[user_id]:
        activity_db[user_id][activity] += 1


def get_activity_history(user_id: str):
    return activity_db.get(user_id)
