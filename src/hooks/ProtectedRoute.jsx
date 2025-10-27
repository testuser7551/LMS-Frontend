// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   // ⏳ Wait until token validation finishes
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   // 🚫 No user after loading → redirect
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ User exists → show page
//   return children;
// };

// export default ProtectedRoute;

import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../api/auth";

const ProtectedRoute = ({ children }) => {
  const { user, setUserContext, loading, setLoadingFront } = useContext(AuthContext);
  const [authError, setAuthError] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAuthError(true);
      setLoadingFront(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoadingFront(true); // 🚀 always enter loading before fetching
        const loggedUser = await getCurrentUser();
        setUserContext(loggedUser);
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthError(true);
        localStorage.removeItem("token");
      } finally {
        setLoadingFront(false);
      }
    };

    fetchUser(); // 🚀 always fetch if token exists
  }, [token, setUserContext, setLoadingFront]);

  // Wait while checking
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // No token or failed check
  if (authError || !token) {
    return <Navigate to="/login" replace />;
  }

  // User validated → render children
  return children;
};

export default ProtectedRoute;
