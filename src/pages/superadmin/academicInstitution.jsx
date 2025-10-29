import React, { useState, useEffect, useContext } from "react";
import {showToast} from "../../components/toast";
import {
  fetchSchools,
  createSchool,
  updateSchool,
  hardDeleteSchool,
} from "../../api/superadmin/school";
import { Home, User, GraduationCap, UserCheck, Building, Eye , BookOpen } from "lucide-react";
import { FaUsers, FaGraduationCap, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { getPlatformStatsAPI } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { Edit2, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddSchoolModal from "./AddSchoolModal";
const AcademicInstitution = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    createdBy: { role: user.role, name: user.name },
  });

  const resetFormState = () => {
  setFormData({
    name: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    createdBy: { role: user.role, name: user.name },
  });
  setEditingSchool(null);
  setErrors({});
};

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 3,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getPlatformStatsAPI();
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    loadSchools(pagination.page, pagination.limit);
    loadAllSchools();
  }, [pagination.page, pagination.limit]);

  const loadSchools = async (page = 1, limit = 3) => {
    try {
      setLoading(true);
      const data = await fetchSchools(page, limit);
      setSchools(data.schools);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllSchools = async () => {
    try {
      const data = await fetchSchools(1, 1000);
      setAllSchools(data.schools);
    } catch (error) {
      console.error("Error fetching all schools:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactPhone") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "School name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Email is required.";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contactEmail)
    )
      newErrors.contactEmail = "Invalid email address.";

    if (!formData.contactPhone.trim())
      newErrors.contactPhone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.contactPhone))
      newErrors.contactPhone = "Phone number must be 10 digits.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingSchool) {
        const updated = await updateSchool(editingSchool._id, formData);
        setSchools(
          schools.map((s) => (s._id === editingSchool._id ? updated.school : s))
        );
        setEditingSchool(null);
      } else {
        await createSchool(formData);
        loadSchools();
        loadAllSchools();
      }

      setFormData({
        name: "",
        address: "",
        contactEmail: "",
        contactPhone: "",
        createdBy: { role: user.role, name: user.name },
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving school:", error);
      showToast("Failed to save school","top-center",10000,"dark");
    }
  };

  const handleToggleStatus = async (id) => {
    const school = schools.find((s) => s._id === id);
    if (!school) return;

    const confirmMsg = `Are you sure you want to ${
      school.status === "Active" ? "deactivate" : "activate"
    } this school?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const updated = await updateSchool(id, {
        status: school.status === "Active" ? "Inactive" : "Active",
      });
      setSchools(schools.map((s) => (s._id === id ? updated.school : s)));
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update status","top-center",10000,"dark");
    }
  };

  const handleDelete = async (id) => {
    const school = schools.find((s) => s._id === id);
    if (!school) return;

    if (!window.confirm("Are you sure you want to delete this school?")) return;

    try {
      const data = await hardDeleteSchool(id);
      if (data) {
        setSchools(schools.filter((s) => s._id !== id));
        showToast(data.message || "School deleted successfully");
        loadSchools();
        loadAllSchools();
      }
    } catch (error) {
      console.error("Error deleting school:", error);
      showToast("Failed to delete school","top-center",10000,"dark");
    }
  };

  const handleEditSchool = (school) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      address: school.address,
      contactEmail: school.contactEmail,
      contactPhone: school.contactPhone,
      createdBy: school.createdBy,
    });
    setShowForm(true);
    setErrors({});
  };

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.uniqueId?.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSuggestions = allSchools.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col  p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-primary">
          Academic Institution
        </h1>
        <button
            onClick={() => {
              resetFormState(); 
              setShowForm(true); 
            }}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:opacity-90 cursor-pointer"
        >
          + Add School
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by ID, Name, or Address"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full focus:outline-none"
          />
        </div>
        {showDropdown && search && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow">
            {filteredSuggestions.map((s) => (
              <li
                key={s._id}
                onClick={() => {
                  setSearch(s.name);
                  setShowDropdown(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Platform Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          {/* Total Schools */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Schools</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalSchools}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <Building className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalUsers}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>

             {/* Total Courses */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Courses</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalCourses}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Total Admins */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Admins</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalAdmins}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Total Mentors */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Mentors</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalMentors}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <FaGraduationCap className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Total Instructors */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Instructors</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalInstructors}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <FaChalkboardTeacher className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Total Students */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:scale-105 transform transition-all">
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-sm">Total Students</h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalStudents}
              </p>
            </div>
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <FaUserGraduate className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Schools Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-primary mb-4">Schools</h2>

        {loading ? (
          <p className="text-secondary">Loading...</p>
        ) : filteredSchools.length === 0 ? (
          <p className="text-secondary">No schools found.</p>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse min-w-[600px] overflow-x-auto">
                <thead>
                  <tr className="bg-primary/10 text-left">
                    <th className="px-4 py-2 text-primary">ID</th>
                    <th className="px-4 py-2 text-primary">Name</th>
                    <th className="px-4 py-2 text-primary">Address</th>
                    <th className="px-4 py-2 text-primary">Contact</th>
                    <th className="px-4 py-2 text-primary">Status</th>
                    <th className="px-4 py-2 text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map((school) => (
                    <tr
                      key={school._id}
                      className="border-b hover:bg-secondary/10 cursor-pointer"
                    >
                      <td className="px-2 py-2 text-primary font-medium">
                        {school.uniqueId}
                      </td>
                      <td className="px-2 py-2 text-primary font-medium">
                        {school.name}
                      </td>
                      <td className="px-2 py-2 text-secondary">
                        {school.address}
                      </td>
                      <td className="px-2 py-2 text-secondary">
                        {school.contactPhone}
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleToggleStatus(school._id)}
                          className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                            school.status === "Active"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                              school.status === "Active"
                                ? "translate-x-6"
                                : "translate-x-0"
                            }`}
                          ></span>
                        </button>
                      </td>
                      <td className="px-4 py-2 flex gap-3">
                        <Edit2
                          className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer "
                          onClick={() => handleEditSchool(school)}
                          title="Edit"
                        />
                        <Eye
                          className="w-5 h-5 text-black cursor-pointer "
                          onClick={() =>
                            navigate(`/superadmin/viewschool`, {
                              state: { schoolId: school._id },
                            })
                          }
                          title="View"
                        />
                        {/* <Trash2
                          className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                          onClick={() => handleDelete(school._id)}
                          title="Delete"
                        /> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination.totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                <span className="text-sm text-secondary">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit School Modal */}
      <AddSchoolModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        editingSchool={editingSchool}
        setEditingSchool={setEditingSchool}
        user={user}
      />
    </div>
  );
};

export default AcademicInstitution;
