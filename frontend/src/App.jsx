import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import MoodDashboard from "./pages/MoodDashboard";
import Yoga from "./pages/Yoga";
import YogaSession from "./pages/YogaSession";
import MeditationSession from "./pages/MeditationSession";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MoodDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/yoga"
        element={
          <ProtectedRoute>
            <Yoga />
          </ProtectedRoute>
        }
      />

      <Route
        path="/yoga/:poseId"
        element={
          <ProtectedRoute>
            <YogaSession />
          </ProtectedRoute>
        }
      />

      <Route
        path="/meditation"
        element={
          <ProtectedRoute>
            <MeditationSession />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
