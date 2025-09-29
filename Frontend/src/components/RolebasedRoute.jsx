import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";


export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    // redirect students trying to open teacher/admin route
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
