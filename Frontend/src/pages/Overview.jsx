import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../lib/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Overview() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await apiRequest("/auth/profile", "GET", null, user.token);
        console.log(profile);
        
        console.log(res.data);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatsCard value={profile?.points || 12} label="Eco Points" />
        <StatsCard value={Math.floor((profile?.points || 600) / 100)} label="Level" />
        <StatsCard value={profile?.badges?.length || 50} label="Badges" />
        <StatsCard value={12} label="Quizzes Completed" />
      </div>
    </div>
  );
}

function StatsCard({ value, label }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h3 className="text-xl font-bold text-green-700">{value}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}