import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../lib/api.js";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // ✅ Basic validation
        if (!username.trim() || !email.trim() || !password.trim() || !role.trim()) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting registration with:', { 
                username: username.trim(), 
                email: email.trim(), 
                role 
            }); // Don't log password for security
            
            // ✅ Fixed: Send 'username' instead of 'name' to match backend schema
            const data = await apiRequest("/auth/register", "POST", { 
                username: username.trim(), 
                email: email.trim(), 
                password, 
                role 
            });
            
            // ✅ Fixed: Since apiRequest already handles errors, if we reach here, registration was successful
            console.log("Registration successful:", data);
            
            // ✅ Fixed: Use the returned data properly
            login(data.data);
            navigate("/login")

            // The backend returns user data and a token on successful registration.
            // Log the user in and redirect to the dashboard.
            // login(data.data);
            // navigate("/dashboard");
            
        } catch (error) {
            console.error("Registration error details:", error);
            console.error("Error message:", error.message);
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input 
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-green-200"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-green-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-green-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={6}
                    />
                    <select 
                        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-green-200"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        disabled={loading}
                    >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button 
                        type="submit"
                        className={`w-full py-3 rounded-lg transition ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}