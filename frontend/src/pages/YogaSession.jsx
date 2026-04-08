import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import yogaData from "../data/yogaData";

export default function YogaSession() {
  const { poseId } = useParams();
  const navigate = useNavigate();

  const pose = yogaData.find((p) => p.id === poseId);

  const [setIndex, setSetIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    pose?.sets[0]?.duration || 0
  );

  // ✅ complete session (SAFE)
  const completeSession = useCallback(async () => {
    try {
      await fetch("http://127.0.0.1:8000/activity/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "demo_user_001",
          activity: "Yoga",
        }),
      });
    } catch (e) {
      console.error(e);
    }

    navigate("/dashboard");
  }, [navigate]);

  // ⏱ timer countdown
  useEffect(() => {
    if (!pose || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, pose]);

  // ⏱ advance to next set when timer reaches 0
  useEffect(() => {
    if (!pose || timeLeft > 0) return;

    const handleSetComplete = async () => {
      if (setIndex < pose.sets.length - 1) {
        setSetIndex((prev) => prev + 1);
        setTimeLeft(pose.sets[setIndex + 1].duration);
      } else {
        completeSession();
      }
    };

    handleSetComplete();
  }, [timeLeft, setIndex, pose, completeSession]);

  if (!pose) {
    return <div className="text-white p-8">Pose not found</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-900 text-white flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* TITLE */}
      <motion.h1
        className="text-4xl font-bold mb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {pose.name} 🧘‍♀️
      </motion.h1>

      <p className="text-purple-200 mb-6 text-center max-w-xl">
        {pose.instructions}
      </p>

      {/* 🖼 YOGA GIF — gentle pulse */}
      <motion.img
        src={pose.gif}
        alt={pose.name}
        className="w-72 h-72 object-cover rounded-xl shadow-2xl mb-6"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* SET + TIMER */}
      <div className="text-center space-y-3">
        <p className="text-lg opacity-80">
          Set {setIndex + 1} of {pose.sets.length}
        </p>

        <motion.div
          key={timeLeft}
          className="text-6xl font-extrabold"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {timeLeft}s
        </motion.div>

        {/* MOTIVATION MESSAGE */}
        <motion.p
          key={setIndex}
          className="italic text-purple-300 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          “{pose.sets[setIndex].message}”
        </motion.p>
      </div>
    </motion.div>
  );
}
