from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# AI + MEMORY
from memory import add_message, get_history, update_user_profile
from ai_logic import generate_reply

# MOOD & ACTIVITY
from mood import track_mood, get_mood_history
from activity import track_activity, get_activity_history

# 🔥 STREAK
from streak import update_streak, get_streak

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# SCHEMAS
# -------------------------

class ChatRequest(BaseModel):
    user_id: str
    message: str
    mood: str


class MoodRequest(BaseModel):
    user_id: str
    mood: str


class ActivityRequest(BaseModel):
    user_id: str
    activity: str


# -------------------------
# CHAT API (AI + MEMORY + STREAK)
# -------------------------

@app.post("/chat")
def chat(req: ChatRequest):
    user_id = req.user_id

    # 1️⃣ Store user message
    add_message(user_id, "user", req.message)

    # 2️⃣ Update long-term memory
    update_user_profile(user_id, req.mood)

    # 3️⃣ Update 🔥 STREAK (THIS IS THE PART YOU ASKED ABOUT)
    streak = update_streak(user_id)

    # 4️⃣ Get conversation history
    history = get_history(user_id)

    # 5️⃣ Generate AI reply
    reply = generate_reply(history, req.mood)

    # 6️⃣ Store assistant reply
    add_message(user_id, "assistant", reply)

    # 7️⃣ RETURN REPLY + STREAK
    return {
        "reply": reply,
        "streak": streak
    }


# -------------------------
# MOOD TRACKING
# -------------------------

@app.post("/mood/track")
def track_user_mood(req: MoodRequest):
    track_mood(req.user_id, req.mood)
    return {"status": "mood saved"}


@app.get("/mood/history/{user_id}")
def mood_history_api(user_id: str):
    return get_mood_history(user_id)


# -------------------------
# ACTIVITY TRACKING
# -------------------------

@app.post("/activity/track")
def track_user_activity(req: ActivityRequest):
    track_activity(req.user_id, req.activity)
    return {"status": "activity saved"}


@app.get("/activity/history/{user_id}")
def activity_history_api(user_id: str):
    return get_activity_history(user_id)


# -------------------------
# STREAK API (FOR HOME & DASHBOARD)
# -------------------------

@app.get("/streak/{user_id}")
def streak_api(user_id: str):
    return get_streak(user_id)
