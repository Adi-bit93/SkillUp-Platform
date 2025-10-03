import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { apiRequest } from "../lib/api.js";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (activeTab === "submission") {
      apiRequest("/submission", "GET") // teacher can view all submissions
        .then((res) => setSubmissions(res.data))
        .catch(console.error);
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} teacher />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          {activeTab === "overview" && <h2 className="text-2xl font-bold">Teacher Overview</h2>}

          {activeTab === "create" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Create New Challenge</h2>
              {/* Form to create challenge */}
              <form className="space-y-4">
                <input className="border w-full px-3 py-2 rounded" placeholder="Title" />
                <textarea className="border w-full px-3 py-2 rounded" placeholder="Description" />
                <input type="number" className="border w-full px-3 py-2 rounded" placeholder="Points" />
                <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
              </form>
            </div>
          )}

          {activeTab === "submissions" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Student Submissions</h2>
              <div className="space-y-4">
                {submissions.map((s) => (
                  <div key={s._id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                    <div>
                      <p><b>Student:</b> {s.student?.username}</p>
                      <p><b>Challenge:</b> {s.challenge?.title}</p>
                      <p><b>Status:</b> {s.status}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}