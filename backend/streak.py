from datetime import date

# In-memory store (later replace with DB)
streaks = {}

def update_streak(user_id: str):
    today = date.today().isoformat()

    user = streaks.get(user_id, {
        "last_active": None,
        "current": 0,
        "best": 0
    })

    if user["last_active"] == today:
        return user  # already counted today

    if user["last_active"]:
        yesterday = date.fromisoformat(user["last_active"])
        if (date.today() - yesterday).days == 1:
            user["current"] += 1
        else:
            user["current"] = 1
    else:
        user["current"] = 1

    user["last_active"] = today
    user["best"] = max(user["best"], user["current"])

    streaks[user_id] = user
    return user


def get_streak(user_id: str):
    return streaks.get(user_id, {
        "last_active": None,
        "current": 0,
        "best": 0
    })
