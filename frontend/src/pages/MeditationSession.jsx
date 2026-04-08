import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import meditationData from "../data/meditationData";

export default function MeditationSession() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(meditationData.duration);
  const [messageIndex, setMessageIndex] = useState(0);

  // ✅ complete meditation
  const completeSession = useCallback(async () => {
    try {
      await fetch("http://127.0.0.1:8000/activity/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "demo_user_001",
          activity: "Meditation",
        }),
      });
    } catch (e) {
      console.error(e);
    }

    navigate("/dashboard");
  }, [navigate]);

  // ⏱ TIMER
  useEffect(() => {
    if (timeLeft <= 0) {
      completeSession();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, completeSession]);

  // 💬 rotate messages
  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex(
        (prev) => (prev + 1) % meditationData.messages.length
      );
    }, 6000);

    return () => clearInterval(msgTimer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-6">
      
      <h1 className="text-4xl font-bold mb-2">
        {meditationData.name} 🧠
      </h1>

      <p className="text-purple-200 mb-10 text-center max-w-md">
        {meditationData.description}
      </p>

      {/* 🫁 BREATHING CIRCLE */}
      <div className="relative w-48 h-48 mb-10">
        <div className="absolute inset-0 rounded-full bg-purple-400 opacity-30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-purple-500 opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-purple-600 flex items-center justify-center text-xl font-semibold">
          Breathe
        </div>
      </div>

      {/* ⏱ TIMER */}
      <div className="text-5xl font-extrabold mb-6">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      {/* 💬 CALM MESSAGE */}
      <p className="italic text-purple-200 text-lg text-center max-w-xl">
        “{meditationData.messages[messageIndex]}”
      </p>
    </div>
  );
}
