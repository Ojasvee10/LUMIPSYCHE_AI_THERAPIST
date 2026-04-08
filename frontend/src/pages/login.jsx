import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TEMP AUTH (later backend auth)
    const user = {
      id: "user_" + Date.now(),
      email: "demo@lumipsyche.ai",
    };

    localStorage.setItem("lumipsyche_user", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back 🌱
        </h2>

        <form className="mt-6 space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white p-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
