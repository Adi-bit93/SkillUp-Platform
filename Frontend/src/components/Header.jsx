import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-bold text-green-700">SkillUp EcoLearn</h1>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-gray-700 font-semibold">{user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}