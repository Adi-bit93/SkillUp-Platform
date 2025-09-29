import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Overview from "../pages/Overview.jsx";
import EcoTasks from "../pages/EcoTasks.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // default

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          {activeTab === "overview" && <Overview />}
          {activeTab === "tasks" && <EcoTasks />}
          {activeTab === "leaderboard" && <Leaderboard />}
        </main>
      </div>
    </div>
  );
}