import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentUser, updateUserProfile } from "../../api/auth";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import {showToast} from "../../components/toast";
const DashboardLayout = ({ allowedRoles }) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const { user, loading, setUserContext, setLoadingFront } = useContext(AuthContext);
  const [authError, setAuthError] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Profile state
  //const [profileImage, setProfileImage] = useState(user?.avatar);
  const [profileImage, setProfileImage] = useState(
    user?.avatar ? `${API_BASE}${user.avatar}` : "/assets/images/sidebar/profile.png"
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  // Password states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);


  // Initialize name and role when user loads
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserRole(user.role);
      setUserEmail(user.email);
    }
  }, [user]);
  useEffect(() => {
    if (user?.avatar) {
      setProfileImage(`${API_BASE}${user.avatar}`);
    } else {
      setProfileImage("/assets/images/sidebar/profile.png");
    }
  }, [user]);


  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError(true);
      setLoadingFront(false);
      return;
    } 

    const fetchUser = async () => {
      try {
        const loggedUser = await getCurrentUser();
        setUserContext(loggedUser);
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthError(true);
      } finally {
        setLoadingFront(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (authError || !user || !allowedRoles.includes(user?.role)) return <Navigate to="/login" replace />;

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); // live preview
    }
  };

  const handleUpdate = async () => {
    // Validate passwords
    if (newPassword && newPassword !== confirmPassword) {
      showToast("Passwords do not match!","top-center",10000,"dark");
      return;
    }

    try {
      // Prepare form data
      const updatedUser = await updateUserProfile({
        name: userName,
        email: userEmail,
        oldPassword,  // required for validation
        password: newPassword || undefined,
        avatarFile: selectedFile, // selected from file input
      });

      // Update local context with new user info
      setUserContext(updatedUser);

      console.log("Profile updated:", updatedUser);
      showToast("Profile updated successfully!","top-center",10000,"dark");

      // Clear password fields after update
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating profile:", err);
      showToast(err.message || "Failed to update profile","top-center",10000,"dark");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar setIsProfileModalOpen={setIsProfileModalOpen} />
      <main className="flex-1 ">
        <Outlet />
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="relative bg-white rounded-2xl p-6 w-96 shadow-2xl">
              {/* Close Icon */}
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6 relative">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="avatarUpload"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.getElementById("avatarUpload").click()}
                    className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                  >
                    <FiEdit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* User Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* User Role (read-only) */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Role</label>
                <input
                  type="text"
                  value={userRole}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* User Mail */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Mail</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Confirm Old Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>


              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-4">
                <button
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => console.log("Remove clicked")}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
