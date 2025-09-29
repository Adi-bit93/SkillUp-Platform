import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../lib/api.js";
import { AuthContext } from "../context/AuthContext";

export default function EcoTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await apiRequest("/challenge", "GET");
        setTasks(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    loadTasks();
  }, []);

  const handleSubmitProof = async (e) => {
    e.preventDefault();
    const proof = e.target.proof.value;

    try {
      await apiRequest(
        "/submission",
        "POST",
        { challengeId: activeTask._id, proof },
        user.token
      );
      alert("Proof submitted!");
      setActiveTask(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-6">Eco-Tasks</h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="flex justify-between items-center p-4 bg-green-50 rounded-lg shadow">
            <div>
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-500">+{task.points} pts</p>
            </div>
            <button
              onClick={() => setActiveTask(task)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Submit Proof
            </button>
          </div>
        ))}
      </div>

      {activeTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Submit Proof for "{activeTask.title}"
            </h3>
            <form onSubmit={handleSubmitProof} className="space-y-3">
              {activeTask.proofType === "text" && (
                <textarea
                  name="proof"
                  placeholder="Describe your proof..."
                  className="w-full border px-4 py-2 rounded"
                  required
                ></textarea>
              )}
              {activeTask.proofType === "photo" && (
                <input
                  type="text"
                  name="proof"
                  placeholder="Paste image URL"
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTask(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}