import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // show spinner or skeleton
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
