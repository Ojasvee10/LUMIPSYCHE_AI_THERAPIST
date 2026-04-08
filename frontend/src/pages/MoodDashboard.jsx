import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function MoodDashboard() {
  const navigate = useNavigate();
  const userId = "demo_user_001";

  // state for backend data
  const [moodHistory, setMoodHistory] = useState(null); // null = not loaded yet
  const [activityHistory, setActivityHistory] = useState(null);
const streak =
  JSON.parse(localStorage.getItem("lumipsyche_streak"))?.count || 0;

const getBadge = (days) => {
  if (days >= 30) return "🏆 Zen Master";
  if (days >= 14) return "🌿 Consistency Champ";
  if (days >= 7) return "🔥 7-Day Warrior";
  if (days >= 3) return "🌱 Getting Started";
  return "✨ First Steps";
};

  // ---------------------------------------
  // Fetch data (and auto-refresh)
  // ---------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mood history
        const moodRes = await fetch(
          `http://127.0.0.1:8000/mood/history/${userId}`
        );
        const moodData = await moodRes.json();
        // If the API returns something valid, use it; else keep null
        if (Array.isArray(moodData) && moodData.length > 0) {
          setMoodHistory(moodData);
        } else {
          setMoodHistory([]); // mark as loaded but no real data
        }

        // Activity history
        const actRes = await fetch(
          `http://127.0.0.1:8000/activity/history/${userId}`
        );
        const actData = await actRes.json();
        // Expect object, but if empty or invalid, mark as empty
        if (
          actData &&
          typeof actData === "object" &&
          Object.keys(actData).length > 0
        ) {
          setActivityHistory(actData);
        } else {
          setActivityHistory({});
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        // In case of error, treat as empty data
        setMoodHistory([]);
        setActivityHistory({});
      }
    };

    fetchData();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------
  // Fallback dummy example (only used when no real data)
  // ---------------------------------------
  const fallbackMood = [
    // example values similar to your earlier screenshot
    { date: "Mon", score: 2 },
    { date: "Tue", score: 4 },
    { date: "Wed", score: 3 },
    { date: "Thu", score: 4.5 },
    { date: "Fri", score: 3.5 },
    { date: "Sat", score: 4 },
    { date: "Sun", score: 5 },
  ];

  const fallbackActivity = {
    Meditation: 20,
    Chat: 30,
    Yoga: 35,
    Journaling: 15,
  };

  // Decide which data to use: real or fallback
  const moodToUse =
    moodHistory && moodHistory.length > 0 ? moodHistory : fallbackMood;
  const activityToUse =
    activityHistory && Object.keys(activityHistory).length > 0
      ? activityHistory
      : fallbackActivity;

  // ---------------------------------------
  // Prepare chart data
  // ---------------------------------------
  const moodChartData = {
    labels: moodToUse.map((_, i) => moodToUse[i].date || `Day ${i + 1}`),
    datasets: [
      {
        label: "Mood Score",
        data: moodToUse.map((m) => m.score),
        borderColor: "#C084FC", // neon violet
        backgroundColor: "rgba(192,132,252,0.25)",
        pointBackgroundColor: "#22D3EE", // neon cyan
        pointBorderColor: "#ffffff",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const activityChartData = {
    labels: Object.keys(activityToUse),
    datasets: [
      {
        data: Object.values(activityToUse),
        backgroundColor: [
          "#A855F7", // purple
          "#22D3EE", // cyan
          "#FB7185", // pink
          "#34D399", // green
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Your Mental Wellness Journey 🌱</h1>

        <button
          onClick={() => navigate("/chat")}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          ⬅ Back to Chat
        </button>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Mood */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Mood Over Time 📈</h2>

          {moodToUse.length > 0 ? (
            <Line data={moodChartData} options={chartOptions} />
          ) : (
            <p className="text-white/70">No mood data yet</p>
          )}
        </div>
        
        {/* 🔥 STREAK OVERVIEW */}
<div className="mb-10 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 flex justify-between items-center">
  <div>
    <h2 className="text-2xl font-bold">
      🔥 {streak} Day Streak
    </h2>
    <p className="text-indigo-200 text-sm mt-1">
      {getBadge(streak)}
    </p>
  </div>

  <div className="text-5xl animate-pulse">
    🔥
  </div>
</div>

        {/* Activity */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Activity Breakdown 🧘‍♀️</h2>

          {activityToUse && Object.keys(activityToUse).length > 0 ? (
            <Pie data={activityChartData} />
          ) : (
            <p className="text-white/70">Loading activity data…</p>
          )}
        </div>
      </div>
    </div>
  );
}
