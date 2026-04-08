import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("lumipsyche_user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
