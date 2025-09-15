// DashboardLayout.jsx
import React,{ useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = ({ allowedRoles }) => {
  const { user,loading} = useContext(AuthContext);

  if (loading) {
    // Show loading indicator while auth state is initializing
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100"> 
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet /> {/* child routes go here */}
      </main>
    </div>
  );
};

export default DashboardLayout;
    