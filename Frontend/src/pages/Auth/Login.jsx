import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext }  from "../../context/AuthContext.jsx";
import { apiRequest } from "../../lib/api.js";
import { use } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await apiRequest("/auth/login", "POST", { email, password });
            login(data.data)
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Login</h2>
                {error && <p className="text-red-500 text-center ">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border rouded-lg focus:ring focus:ring-green-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-green-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-green-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>

        </div>
    )
}

