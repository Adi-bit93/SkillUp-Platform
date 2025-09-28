import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated, render the child routes
    return <Outlet />;
}
