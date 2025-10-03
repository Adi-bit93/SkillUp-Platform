import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Used to delay route checks until restored

  useEffect(() => {
    // Restore user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        localStorage.removeItem("user"); // corrupt data reset
      }
    }
    setLoading(false);
  }, []);

  // Login -> save user with token + role
  const login = (userData) => {
    // Ensure role exists
    if (!userData.role) userData.role = "student";

    // Save whole user including token
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout -> clear everything
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};