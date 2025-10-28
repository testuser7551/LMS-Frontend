import React, { useState, useContext, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { registerUser,updateUser } from "../../api/auth";
import { getSingleUser } from "../../api/usermanagement/usermanagement";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../../components/toast.js";
import CustomDropdown from "../../components/CustomDropDown";
import { fetchMentorsAndInstructorsAPI } from "../../api/usermanagement/usermanagement";


const AddUser = ({ setShowRegisterModal, onUserAdded, schoolId, editMode = false, userId }) => {
  console.log("User ID SIVA:", userId);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log("Current User Role:", user?.role);
  const [formData, setFormData] = useState({
    schoolId,
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "student",
    designation: "",
  });

  const [profileImage, setProfileImage] = useState(null); // NEW
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mentorInstructorList, setMentorInstructorList] = useState([]);
  const [selectedMentorInstructor, setSelectedMentorInstructor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);


  useEffect(() => {
    const fetchMentorsAndInstructors = async () => {
      try {
        const data = await fetchMentorsAndInstructorsAPI();
        let filteredData = [];
        if (formData.role === "student") {
          filteredData = data.filter((u) => u.role === "mentor" || u.role === "instructor");
        } else if (formData.role === "mentor" || formData.role === "instructor") {
          filteredData = data.filter((u) => u.role === "student");
        }
        setMentorInstructorList(data);
        setFilteredList(data);

      } catch (error) {
        console.error("Error loading mentors/instructors:", error);
      }
    };
    fetchMentorsAndInstructors();
  }, [formData.role]);

  useEffect(() => {
    if (editMode && userId) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const res = await getSingleUser(userId); // res = { message, data }

          const userData = res.data; // ✅ extract the user object

          setFormData({
            schoolId: userData.schoolId || schoolId,
            fname: userData.fname || "",
            lname: userData.lname || "",
            email: userData.email || "",
            password: "", // leave blank for edit
            role: userData.role || "student",
            designation: userData.designation || "",
          });

          if (userData.avatar) setProfileImage(userData.avatar); // avatar preview
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [editMode, userId, schoolId]);


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   if (!formData.schoolId || !schoolId) {
  //     showToast("Please Register via Correct Link.", "top-center", 10000, "dark");
  //     return;
  //   }
  //   if (formData.password !== confirmPassword) {
  //     showToast("Passwords do not match", "top-center", 10000, "dark");
  //     return;
  //   }
  //   if (!profileImage) {
  //     showToast("Please upload a profile image", "top-center", 10000, "dark");
  //     return;
  //   }
  //   try {
  //     setLoading(true);

  //     const data = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       data.append(key, value);
  //     });
  //     data.append("profileImage", profileImage);

  //     const newUser = await registerUser(data); // API should accept FormData
  //     if (onUserAdded) onUserAdded();
  //     setShowRegisterModal(false);
  //     showToast("Registration Successful", "top-center", 10000, "dark");
  //   } catch (err) {
  //     setError(err.message || "Registration failed");
  //     showToast("Registration failed", "top-center", 10000, "dark");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password confirmation check (only if creating new user or updating password)
    if (!editMode && formData.password !== confirmPassword) {
      showToast("Passwords do not match", "top-center", 10000, "dark");
      return;
    }

    try {
      setLoading(true);

      // ✅ Decide whether to create or update
      if (editMode) {
        // Call update helper
        const updatedUser = await updateUser({
          userId,
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          password: formData.password || null, // only update if entered
          role: formData.role,
          designation: formData.designation,
          avatarFile: profileImage instanceof File ? profileImage : null, // only if new file
        });

        showToast("User updated successfully", "top-center", 10000, "dark");
        if (onUserAdded) onUserAdded(); // refresh parent list
        setShowRegisterModal(false);
        return;
      }

      // Non-edit mode → register new user
      const data = new FormData();
      data.append("schoolId", schoolId);
      data.append("fname", formData.fname);
      data.append("lname", formData.lname);
      data.append("email", formData.email);
      data.append("role", formData.role);
      if (formData.designation) data.append("designation", formData.designation);
      if (formData.password) data.append("password", formData.password);
      if (profileImage instanceof File) data.append("profileImage", profileImage);
      // if (selectedMentorInstructor) {
      //   data.append("assignedMentorInstructorId", selectedMentorInstructor._id);
      //   data.append("assignedMentorInstructorName", `${selectedMentorInstructor.name}`);
      // }
      if (selectedMentorInstructor) {
        if (formData.role === "student") {
          data.append("assignedMentorInstructorId", selectedMentorInstructor._id);
          data.append("assignedMentorInstructorName", `${selectedMentorInstructor.name}`);
        } else if (formData.role === "mentor" || formData.role === "instructor") {
          data.append("assignedStudentId", selectedMentorInstructor._id);
          data.append("assignedStudentName", `${selectedMentorInstructor.name}`);
        }
      }      

      for (const [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      const newUser = await registerUser(data);
      showToast("User created successfully", "top-center", 10000, "dark");
      if (onUserAdded) onUserAdded();
      setShowRegisterModal(false);

    } catch (err) {
      setError(err.message || "Operation failed");
      showToast(err.message || "Operation failed", "top-center", 10000, "dark");
    } finally {
      setLoading(false);
    }
  };





  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const roles = [
    {
      value: "student",
      label: "Student",
      description: "Learn and take courses",
    },
    {
      value: "instructor",
      label: "Instructor",
      description: "Create and teach courses",
    },
    {
      value: "mentor",
      label: "Mentor",
      description: "Guide and support students",
    },
     { value: "admin", label: "Admin", description: "Manage school operations" },
  ];

  const getRoleOptions = (userRole) => {
  if (userRole === "superAdmin") {
    return roles; // Superadmin → can create all
  }
  if (userRole === "admin") {
    return roles.filter(
      (r) => r.value !== "admin" && r.value !== "superAdmin"
    ); // Admin → can't create another admin/superadmin
  }
  if (userRole === "instructor" || userRole === "mentor") {
    return roles.filter((r) => r.value === "student"); // Instructor/Mentor → can create only students
  }
  return [];
};

// ✅ Compute role options
const roleOptions = getRoleOptions(user?.role);

  return (
    <div className="min-h-screen flex items-center justify-center" >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
        {/* Header */}

        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => setShowRegisterModal(false)}
            className="absolute sm:top-30 top-20  right-5 text-2xl text-gray-500 hover:text-gray-700 z-50"
          >
            ✕
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-outfit">
            Add Users
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">


          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 relative sm:col-span-2">
            <div className="relative">
              {/* <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage) // preview selected
                    : "/assets/images/sidebar/profile.png" // fallback avatar
                }
                alt={user?.name || "Profile"}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              /> */}
              <img
                src={
                  profileImage
                    ? profileImage instanceof File
                      ? URL.createObjectURL(profileImage) // local preview for upload
                      : `${API_BASE}${profileImage}`      // existing avatar from backend
                    : "/assets/images/sidebar/profile.png" // fallback
                }
                alt={user?.name || "Profile"}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />


              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                id="avatarUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                      showToast("Only PNG, JPG, or JPEG allowed", "top-center", 8000, "dark");
                      e.target.value = null;
                      return;
                    }
                    if (file.size > 2 * 1024 * 1024) {
                      showToast("File size must be less than 2MB", "top-center", 8000, "dark");
                      e.target.value = null;
                      return;
                    }
                    setProfileImage(file);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => document.getElementById("avatarUpload").click()}
                className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
              >
                <FiEdit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <label className="mt-2 text-sm font-medium text-subtext font-poppins">
              Profile Image
            </label>
          </div>


          {/* First Name */}
          <div >
            <label htmlFor="fname" className="block text-sm font-medium text-subtext mb-2 font-poppins">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext font-poppins rounded-lg 
                  focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="First Name"
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-subtext mb-2 font-poppins">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext font-poppins rounded-lg 
                  focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          {/* Email (full width) */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-subtext font-poppins mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-subtext rounded-lg focus:ring-2 
                  font-poppins focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="sm:col-span-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-subtext font-poppins mb-2"
            >
              Role
            </label>

           <CustomDropdown
  label="Role"
  options={roleOptions.map((option) => ({
    value: option.value,
    label: `${option.label} - ${option.description}`, // label + description for clarity
  }))}
  value={formData.role} // ✅ keep actual value, not capitalized text
  onChange={(val) =>
    setFormData((prev) => ({
      ...prev,
      role: val,
    }))
  }
  width="w-full"
  placeholder="Select Role"
/>
          </div>

          {/* Designation (only for Instructor/Mentor) */}
          {(formData.role === "instructor" || formData.role === "mentor") && (
            <div className="sm:col-span-2">
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-subtext font-poppins mb-2"
              >
                Designation
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-subtext font-poppins rounded-lg 
          focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter designation"
                  required
                />
              </div>
            </div>
          )}


          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-subtext font-poppins mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2.5 border border-subtext rounded-lg focus:ring-2 
                  focus:ring-primary focus:border-transparent transition-all"
                placeholder="Create a password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtext hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-subtext font-poppins mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 border border-subtext font-poppins rounded-lg 
                  focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtext hover:text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Mentor/Instructor Search + Dropdown */}
          { (formData.role === "student" || formData.role === "mentor" || formData.role === "instructor") && (

            <div className="sm:col-span-2 relative">
              <label
                htmlFor="mentorInstructorSearch"
                className="block text-sm font-medium text-subtext font-poppins mb-2"
              >
                  {formData.role === "student"
                    ? "Assign Mentor/Instructor"
                    : "Assign Student"
                  }
              </label>

              {/* 🔍 Search + Select in same box */}
              <input
                type="text"
                id="mentorInstructorSearch"
                placeholder="Search and select mentor/instructor"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => {
                  const term = e.target.value.toLowerCase();
                  setSearchTerm(term);

                  const filtered = mentorInstructorList.filter(
                    (person) =>
                      person.name.toLowerCase().includes(term) ||
                      person.role.toLowerCase().includes(term)
                  );
                  setFilteredList(filtered);
                }}
              />

              {/* 🩵 Suggestion Dropdown (same box) */}
              {searchTerm && filteredList.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                  {filteredList.map((person) => (
                    <li
                      key={person._id}
                      onClick={() => {
                        setSelectedMentorInstructor(person);
                        setSearchTerm(`${person.name} (${person.role})`);
                        setFilteredList([]); // hide after select
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100 transition"
                    >
                      {person.name} <span className="text-gray-500 text-sm">({person.role})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}


          {/* Submit (full width) */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-gray-500 text-white py-3 rounded-lg 
                font-medium hover:from-gray-500 hover:to-primary focus:ring-2 
                focus:ring-primary transition-all font-outfit"
            >
              {loading ? "Saving..." : editMode ? "Update User" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
