import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Overview from "../pages/Overview.jsx";
import EcoTasks from "../pages/EcoTasks.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-50">
      {/* Sidebar with slide animation */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Modern Header with glassmorphism */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
          <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        </div>

        {/* Main Content with cards and shadows */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Welcome banner */}
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-green-50 text-sm md:text-base">
              Here's what's happening with your eco journey today
            </p>
          </div>

          {/* Content container with smooth transitions */}
          <div className="animate-fadeIn">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Overview />
              </div>
            )}
            {activeTab === "tasks" && (
              <div className="space-y-6">
                <EcoTasks />
              </div>
            )}
            {activeTab === "leaderboard" && (
              <div className="space-y-6">
                <Leaderboard />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 px-8 bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 SkillUp Platform. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}