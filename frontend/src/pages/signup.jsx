import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    const user = {
      id: "user_" + Date.now(),
      email: "newuser@lumipsyche.ai",
    };

    localStorage.setItem("lumipsyche_user", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-purple-600">
          Join Lumipsyche ✨
        </h2>

        <form className="mt-6 space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" />

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-purple-600 text-white p-3 rounded-xl"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
