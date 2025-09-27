import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg sm:text-xl font-semibold tracking-wide flex items-center gap-2"
          >
            🌍 <span className="hidden sm:inline">SkillUp EcoPlatform</span>
          </Link>

          {/* Desktop Menu + Login */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            <Link to="/about" className="hover:text-green-200 transition">About</Link>
            <Link
              to="/login"
              className="bg-white text-green-600 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-green-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 bg-green-700 text-sm">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/login"
            className="block bg-white text-green-600 px-3 py-2 rounded-md font-semibold hover:bg-green-100 transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
