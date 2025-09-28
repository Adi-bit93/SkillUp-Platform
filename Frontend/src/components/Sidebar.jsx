import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    // { name: "Profile", path: "/dashboard/profile" },
    { name: "Challenges", path: "/dashboard/challenges" },
    { name: "Leaderboard", path: "/dashboard/leaderboard" },
  ];

  return (
    <aside className="bg-green-700 text-white w-64 h-screen hidden md:flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-green-600">
        🌍 EcoPlatform
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? "bg-green-500 font-semibold"
                    : "hover:bg-green-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-green-600">
        <button
          onClick={logout}
          className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}