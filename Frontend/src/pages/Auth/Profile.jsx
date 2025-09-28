import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../lib/api.js";

export default function Profile() {
    const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !user.token) {
                navigate("/login"); // Redirect to login if not authenticated
                return;
            }
            try {
                const data = await apiRequest("/auth/profile", "GET", null, user.token);
                setProfile(data.data);
            } catch (err) {
                setError(err.message || "Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user, navigate]); // Depend on user and navigate

    if (loading) return <div className="text-center mt-10">Loading profile...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    if (!profile) return <div className="text-center mt-10">No profile data available.</div>;

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">User Profile</h2>
                <div className="space-y-4">
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    {/* Add more profile details as needed */}
                </div>
                <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mt-6"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}