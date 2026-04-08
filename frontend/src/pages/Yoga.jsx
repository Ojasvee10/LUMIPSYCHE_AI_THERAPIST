import { useNavigate } from "react-router-dom";
import yogaData from "../data/yogaData";

export default function Yoga() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Choose Your Yoga 🧘‍♀️</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {yogaData.map((pose) => (
          <div
            key={pose.id}
            onClick={() => navigate(`/yoga/${pose.id}`)}
            className="bg-white/10 p-6 rounded-xl cursor-pointer hover:bg-white/20"
          >
            <h3 className="font-semibold text-lg">{pose.name}</h3>
            <p className="text-sm opacity-80">{pose.benefits}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
