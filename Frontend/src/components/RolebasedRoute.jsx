import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // normalize both for safe comparison
  const userRole = user.role?.toLowerCase();
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  if (!normalizedAllowed.includes(userRole)) {
    // redirect to home (or error page), NOT to dashboard again
    return <Navigate to="/" replace />;
  }

  return children;
}
