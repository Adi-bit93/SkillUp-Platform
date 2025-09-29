import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api.js";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const res = await apiRequest("/leaderboard/global", "GET");
         console.log("Leaderboard API response:", res.data);
        setData(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-6">Leaderboard</h2>
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Rank</th>
              <th className="px-4">Name</th>
              <th className="px-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={student._id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="px-4">{student.username}</td>
                <td className="px-4">{student.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}