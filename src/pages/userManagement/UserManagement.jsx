import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import Stats from "./components/Stats.jsx";
import { getUsersData } from "../../api/usermanagement/usermanagement";
import { AuthContext } from "../../context/AuthContext.jsx";
import AddUser from "./components/AddUser";

const API_BASE = import.meta.env.VITE_API_BASE;

function UserManagement() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Filters
  const [activeTab, setActiveTab] = useState("All");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);

  // Data
  const [rolesCount, setRolesCount] = useState();
  const [users, setUsers] = useState([]);

  // Pagination
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const tabs = ["All", "Mentor", "Instructor", "Student"];

  // ⏳ Debounce search (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // 📦 Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsersData({
        page: pagination.page,
        limit: pagination.limit,
        search: debouncedSearch,
        role: activeTab !== "All" ? activeTab.toLowerCase() : "",
        status,
        sort,
      });

      setUsers(res.data || []);
      setRolesCount(res.roles);
      setPagination((prev) => ({
        ...prev,
        total: res.pagination.total,
        totalPages: res.pagination.totalPages,
      }));
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Refetch whenever filters/pagination/search change
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, activeTab, status, sort, debouncedSearch]);

  // 🔹 Handle page change safely
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div>
      {/* <div className="p-4 sm:p-6 lg:p-8 gap-6 flex flex-col bg-gray-50 h-screen">
       
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center p-5">
            <h1 className="text-2xl font-bold font-outfit text-primary">Users</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-primary w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-100 text-sm w-72 font-poppins"
                />
              </div>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-[var(--color-btn-primary-hover)] transition font-poppins"
                onClick={() => setShowAddUser(true)}
              >
                <UserPlus className="w-4 h-4" />
                Add New User
              </button>
            </div>
          </div>
        </div>

        <Stats rolesCount={rolesCount} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
          <div className="flex gap-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition font-outfit ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-primary hover:bg-activecolor"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value.toLowerCase());
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-poppins"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value.toLowerCase())}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-poppins"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-secondary">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center p-6 text-center"
              >
                <img
                  src={
                    u?.avatar
                      ? `${API_BASE}${u?.avatar}`
                      : "/assets/images/sidebar/profile.png"
                  }
                  alt={u.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h2 className="font-bold text-lg font-poppins text-primary">
                  {u.name}
                </h2>
                <span className="text-xs px-3 py-1 bg-activecolor text-primary rounded-full mt-1 font-poppins capitalize">
                  {u.role}
                </span>
                <p className="text-xs mt-1 font-poppins text-headcolor">
                  {u.email}
                </p>

                <button
                  onClick={() => navigate(`/courses/single-user/${u._id}`)}
                  className="mt-3 px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-[var(--color-btn-primary-hover)] transition font-poppins"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}


        {pagination.totalPages > 1 && (
          <div className="flex justify-end items-center gap-6 mt-6">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <span className="text-sm text-secondary">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        )}
      </div> */}
<div className="p-4 sm:p-6 lg:p-8 gap-6 flex flex-col bg-gray-50 min-h-screen overflow-x-hidden">
  {/* Header */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 gap-4 w-full">
      <h1 className="text-xl sm:text-2xl font-bold font-outfit text-primary">
        Users
      </h1>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-primary w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-100 text-sm w-full font-poppins"
          />
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--color-btn-primary-hover)] transition font-poppins w-full sm:w-auto"
          onClick={() => setShowAddUser(true)}
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>
    </div>
  </div>
  {/* Stats */}
  <Stats rolesCount={rolesCount} />
  {/* Tabs + Filters */}
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
    {/* Tabs */}
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            setPagination((prev) => ({ ...prev, page: 1 }));
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition font-outfit ${
            activeTab === tab
              ? "bg-primary text-white"
              : "bg-gray-100 text-primary hover:bg-activecolor"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    {/* Filters */}
    <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value.toLowerCase());
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-poppins w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value.toLowerCase())}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-poppins w-full sm:w-auto"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  </div>
  {/* Users Grid */}
  {loading ? (
    <p className="text-center text-secondary">Loading...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center p-6 text-center"
        >
          <img
            src={
              u?.avatar
                ? `${API_BASE}${u?.avatar}`
                : "/assets/images/sidebar/profile.png"
            }
            alt={u.name}
            className="w-20 h-20 rounded-full object-cover mb-4"
          />
          <h2 className="font-bold text-lg font-poppins text-primary break-words">
            {u.name}
          </h2>
          <span className="text-xs px-3 py-1 bg-activecolor text-primary rounded-full mt-1 font-poppins capitalize">
            {u.role}
          </span>
          <p className="text-xs mt-1 font-poppins text-headcolor break-all">
            {u.email}
          </p>
          <button
            onClick={() => navigate(`/courses/single-user/${u._id}`)}
            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--color-btn-primary-hover)] transition font-poppins w-full sm:w-auto"
          >
            View
          </button>
        </div>
      ))}
    </div>
  )}
  {/* Pagination */}
{pagination.totalPages > 1 && (
  <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6 mt-6 w-full flex-wrap">
    <button
      onClick={() => handlePageChange(pagination.page - 1)}
      disabled={pagination.page === 1}
      className="p-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer flex-shrink-0"
    >
      <ChevronLeft size={20} className="text-white" />
    </button>
    <span className="text-sm text-secondary text-center whitespace-nowrap">
      Page {pagination.page} of {pagination.totalPages}
    </span>
    <button
      onClick={() => handlePageChange(pagination.page + 1)}
      disabled={pagination.page === pagination.totalPages}
      className="p-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer flex-shrink-0"
    >
      <ChevronRight size={20} className="text-white" />
    </button>
  </div>
)}
</div>

      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative">
            <AddUser
              setShowRegisterModal={setShowAddUser}
              schoolId={user.schoolId}
              onUserAdded={fetchUsers}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
