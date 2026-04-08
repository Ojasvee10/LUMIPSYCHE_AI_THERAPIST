import subprocess

SYSTEM_PROMPT = """
You are Lumipsyche, an empathetic AI mental wellness companion.
You remember past context.
You speak calmly, kindly, and naturally.
You never judge.
You guide like a psychologist and support like a friend.
"""

def generate_reply(history, mood):
    conversation = ""

    for msg in history:
        role = "User" if msg["role"] == "user" else "Assistant"
        conversation += f"{role}: {msg['content']}\n"

    prompt = f"""
Mood: {mood}

Conversation so far:
{conversation}

Respond empathetically, naturally, and with context awareness.
"""

    result = subprocess.run(
        ["ollama", "run", "llama3"],
        input=SYSTEM_PROMPT + prompt,
        text=True,
        capture_output=True
    )

    return result.stdout.strip()
