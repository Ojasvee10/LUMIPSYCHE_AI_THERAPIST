import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ---- STREAK UTILS ----
const getToday = () => new Date().toISOString().split("T")[0];

const updateStreak = () => {
  const today = getToday();
  const saved = JSON.parse(localStorage.getItem("lumipsyche_streak"));

  if (!saved) {
    localStorage.setItem(
      "lumipsyche_streak",
      JSON.stringify({ count: 1, lastDate: today })
    );
    return 1;
  }

  if (saved.lastDate === today) return saved.count;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().split("T")[0];

  const newCount = saved.lastDate === y ? saved.count + 1 : 1;

  localStorage.setItem(
    "lumipsyche_streak",
    JSON.stringify({ count: newCount, lastDate: today })
  );

  return newCount;
};

const getStreak = () => {
  const saved = JSON.parse(localStorage.getItem("lumipsyche_streak"));
  return saved?.count || 0;
};


export default function Chat() {
  
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey 🌱 I’m here for you. How are you feeling today?" }
  ]);
  const [streak, setStreak] = useState(getStreak());
  const [input, setInput] = useState("");
  const [mood, setMood] = useState(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("lumipsyche_user"));
  const userId = user?.id;

  const themes = {
    light: {
      background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
      panel: "#ffffff"
    },
    dark: {
      background: "linear-gradient(135deg, #141e30, #243b55)",
      panel: "#1f2937"
    },
    pastel: {
      background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
      panel: "#ffffff"
    },
    sunset: {
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      panel: "#ffffff"
    },
    neon: {
      background: "linear-gradient(135deg, #00f2fe, #4facfe)",
      panel: "#ffffff"
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newStreak = updateStreak();
setStreak(newStreak);

    const userText = input;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          message: userText,
          mood: mood || "okay"
        })
      })
        .then(res => res.json())
        .then(data => {
          setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
        });
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Connection issue. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ background: themes[theme].background }}
      className="h-screen w-screen flex flex-col"
    >
      {/* HEADER */}
      <div className="w-full p-4 text-center text-white bg-black/40 backdrop-blur">
          <div className="font-semibold text-lg">Lumipsyche 🌸</div>
          <div className="text-sm opacity-90 mt-1">🔥 {streak} Day Streak</div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="mt-2 text-sm bg-white/20 px-4 py-1 rounded-full"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* THEME SWITCHER */}
      <div
        style={{ background: themes[theme].panel }}
        className="w-full flex justify-center gap-3 p-3 shadow"
      >
        <button onClick={() => setTheme("light")}>🌞</button>
        <button onClick={() => setTheme("dark")}>🌙</button>
        <button onClick={() => setTheme("pastel")}>🌸</button>
        <button onClick={() => setTheme("sunset")}>🌅</button>
        <button onClick={() => setTheme("neon")}>⚡</button>
      </div>

      {/* MOOD */}
      <div
        style={{ background: themes[theme].panel }}
        className="w-full flex justify-center gap-4 p-3"
      >
        <button onClick={() => setMood("low")} className="text-2xl">😞</button>
        <button onClick={() => setMood("okay")} className="text-2xl">😐</button>
        <button onClick={() => setMood("good")} className="text-2xl">🙂</button>
        <button onClick={() => setMood("great")} className="text-2xl">😊</button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-2xl shadow ${
              m.sender === "user"
                ? "bg-indigo-600 text-white ml-auto"
                : "bg-white text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="bg-white p-3 rounded-xl text-sm w-fit">
            Typing…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div
        style={{ background: themes[theme].panel }}
        className="p-4 flex gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-xl p-3"
          placeholder="Tell me what’s on your mind..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
