import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gitaQuotes from "../data/gitaQuotes";

export default function Home() {
  const navigate = useNavigate();
  const streak = JSON.parse(localStorage.getItem("lumipsyche_streak"))?.count || 0;
  
  // 🔁 Dynamic Bhagavad Gita quote (changes every login)
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * gitaQuotes.length);
    return gitaQuotes[randomIndex];
  });

  if (!quote) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white overflow-hidden">

      {/* ✨ BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 p-8 max-w-6xl mx-auto">

        {/* 🌱 BRAND */}
{/* 🌱 HEADER */}
<div className="flex justify-between items-center mb-10">
  <div>
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
      Lumipsyche
    </h1>
    <p className="text-indigo-200 text-lg mt-1">
      Heal • Reflect • Grow
    </p>
  </div>
  {/* 🔥 STREAK DISPLAY */}
<div className="flex justify-center items-center gap-2 py-2 text-white text-sm">
  🔥 <span className="font-semibold">{streak}</span> Day Streak
</div>


  {/* 🚪 LOGOUT BUTTON */}
  <button
    onClick={() => {
      localStorage.removeItem("lumipsyche_user");
      window.location.href = "/";
    }}
    className="text-sm bg-red-500/20 text-red-200 px-4 py-2 rounded-full hover:bg-red-500/30 transition"
  >
    Logout
  </button>
</div>


        {/* 🕉 BHAGAVAD GITA CARD */}
        <div className="max-w-2xl mx-auto mb-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <p className="text-center text-sm tracking-widest text-pink-300 mb-3">
            भगवद्गीता — Today’s Thought
          </p>

          <p className="text-center text-2xl md:text-3xl font-serif italic text-white mb-6 leading-relaxed">
            “{quote.sanskrit}”
          </p>

          <p className="text-center text-indigo-100 text-base md:text-lg">
            {quote.meaning}
          </p>
        </div>

        {/* 🔥 STREAK CARD */}
<div className="max-w-md mx-auto mb-10 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
  <div className="text-3xl mb-2">🔥</div>
  <h3 className="text-xl font-bold">
    {streak} Day Streak
  </h3>
  <p className="text-sm text-indigo-200 mt-1">
    Consistency creates calm ✨
  </p>
</div>

        {/* 🚀 PRIMARY ACTIONS */}
        <div className="flex flex-col md:flex-row justify-center gap-5 mb-16">
          <button
            onClick={() => navigate("/chat")}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-xl hover:scale-105 transition"
          >
            Start Healing Chat 💬
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-lg font-semibold hover:bg-white/20 transition"
          >
            View Progress 📊
          </button>
        </div>

        {/* 🌸 ACTIVITIES */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Daily Activities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* 🧘 YOGA */}
          <div
            onClick={() => navigate("/yoga")}
            className="cursor-pointer bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">🧘</div>
            <h3 className="font-semibold text-lg">Yoga</h3>
            <p className="text-sm text-indigo-200 mt-1">
              Balance • Strength • Calm
            </p>
          </div>

          {/* 🧠 MEDITATION (NOW WORKING) */}
          <div
            onClick={() => navigate("/meditation")}
            className="cursor-pointer bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-semibold text-lg">Meditation</h3>
            <p className="text-sm text-indigo-200 mt-1">
              Breath • Stillness • Focus
            </p>
          </div>

          {/* 🎯 FOCUS / CALM (NEXT) */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center opacity-70">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-lg">Focus / Calm</h3>
            <p className="text-sm text-indigo-200 mt-1">
              Coming soon
            </p>
          </div>

          {/* 📓 JOURNAL (NEXT) */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center opacity-70">
            <div className="text-4xl mb-3">📓</div>
            <h3 className="font-semibold text-lg">Journaling</h3>
            <p className="text-sm text-indigo-200 mt-1">
              Coming soon
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
