export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { name: "Overview", key: "overview" },
    { name: "Eco-Tasks", key: "tasks" },
    { name: "Leaderboard", key: "leaderboard" },
  ];

  return (
    <aside className="bg-white border-r w-64 h-screen sticky top-0 p-5 hidden md:flex flex-col">
      <div className="text-2xl font-bold text-green-700 mb-8">🌱 EcoLearn</div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center px-4 py-2 rounded-md transition text-left ${
                  activeTab === item.key
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t pt-4 text-sm text-gray-600">Student</div>
    </aside>
  );
}