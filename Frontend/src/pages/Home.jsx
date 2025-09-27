import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-16 py-10">
        <div className="text-center max-w-2xl">
          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-green-700 mb-4 leading-snug">
            Learn • Act • Earn <span className="text-green-500">Eco Badges 🌱</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8">
            Join thousands of students making the planet greener, one small step at a time.
            Complete fun eco challenges, earn points, and climb the leaderboard.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/login")}
            className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-md bg-green-600 text-white shadow hover:bg-green-700 hover:scale-105 transition-transform duration-200"
          >
            Get Started 🚀
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-3 mt-auto text-xs sm:text-sm">
        <p>© 2024 SkillUp EcoPlatform | For a Greener Future 🌍</p>
      </footer>
    </div>
  );
}
