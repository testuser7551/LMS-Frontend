// ViewSchool.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSchools } from "../../api/superadmin/school";
import AddUser from "./AddUser";
import { getUsersBySchoolAPI } from "../../api/auth";
import { Pencil } from "lucide-react"; // 🆕 Icon for edit button

const ViewSchool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId } = location.state || {};

  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);

  // 🆕 For Edit Mode
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Load school details
  const loadSchool = async () => {
    try {
      const data = await fetchSchools(1, 1000);
      const found = data.schools.find((s) => s._id === schoolId);
      setSchool(found);
    } catch (error) {
      console.error("Error fetching school:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchool();
  }, [schoolId]);

  // Load users for the school
  useEffect(() => {
    const fetchUsers = async () => {
      if (!school) return;
      try {
        setUsersLoading(true);
        const data = await getUsersBySchoolAPI(school.uniqueId);
        setUsers(data.users || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, [school]);

  if (loading) return <p className="text-secondary p-6">Loading...</p>;
  if (!school) return <p className="text-secondary p-6">School not found.</p>;

  // 🆕 Handler for edit button click
  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setEditMode(true);
    setShowRegisterModal(true);
  };

  // 🆕 Handler for Add button click
  const handleAddUser = () => {
    setSelectedUserId(null);
    setEditMode(false);
    setShowRegisterModal(true);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Back & Add User Buttons */}
      <div className="w-full max-w-4xl flex justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          + Add User
        </button>
      </div>

      {/* School Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold text-primary mb-4">{school.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary">
          <p><span className="font-semibold">ID:</span> {school.uniqueId}</p>
          <p><span className="font-semibold">Address:</span> {school.address}</p>
          <p><span className="font-semibold">Email:</span> {school.contactEmail}</p>
          <p><span className="font-semibold">Phone:</span> {school.contactPhone}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full font-medium ${
                school.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {school.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Created By:</span>{" "}
            {school.createdBy?.name} ({school.createdBy?.role})
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <h3 className="text-xl font-bold text-primary mb-4">Users</h3>

        {usersLoading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found for this school.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2 text-center">Action</th> {/* 🆕 */}
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{idx + 1}</td>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEditUser(u._id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit User"
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Register / Update Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative">
            <AddUser
              setShowRegisterModal={setShowRegisterModal}
              schoolId={school.uniqueId}
              onUserAdded={loadSchool}
              editMode={editMode}           // 🆕 tells form to update
               userId={selectedUserId}// 🆕 user to edit
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSchool;

