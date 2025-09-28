import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Profile from "../pages/Auth/Profile.jsx";
import Challenges from "../pages/Challenges.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar only on md & larger */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="challenges" element={<Challenges />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}