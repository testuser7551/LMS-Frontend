import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ Wait until token validation finishes
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // 🚫 No user after loading → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ User exists → show page
  return children;
};

export default ProtectedRoute;
