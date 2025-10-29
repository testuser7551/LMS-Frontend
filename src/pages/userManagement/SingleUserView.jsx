import React, { useState, useContext, useEffect } from "react";
import { Star, Edit, MessageSquare, Power, ArrowLeft } from "lucide-react";
import Students from "../userManagement/tabs/students.jsx";
import QuickStats from "./components/QuickStats";
import { useNavigate, useParams } from "react-router-dom";
import ParticularCourses from "./components/ParticularCourses";
import AddUser from "./components/AddUser"
import { AuthContext } from "../../context/AuthContext.jsx";
import { CoursesTab } from "../userManagement/tabs/coursesTab.jsx";
//import { StudentTab } from "../userManagement/tabs/studentTab.jsx";
import { getSingleUser,toggleUserStatus } from "../../api/usermanagement/usermanagement";

// ✅ JSON Data




function SingleUserView() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selecteduser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const navigate = useNavigate();
  //const [activeTab, setActiveTab] = useState("courses");

  //const tabs = ["courses", "students"];

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  
  useEffect(() => {
    if (selecteduser) {
      if (selecteduser.role === "student") {
        setTabs([]);
        setActiveTab("");
      } else {
        setTabs(["courses", "students"]);
        setActiveTab("courses");
      }
    }
  }, [selecteduser]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getSingleUser(id);
        setSelectedUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleToggleStatus = async () => {
    try {
      const newStatus = !selecteduser.active;
      const res = await toggleUserStatus(selecteduser._id, newStatus);
      setSelectedUser((prev) => ({ ...prev, active: res.user.active }));
    } catch (err) {
      console.error("Error toggling user status:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center ">
      {/* Scrollable Content */}
      <div className="overflow-auto px-4 sm:px-6 lg:px-0 py-4 sm:py-6 lg:py-8 space-y-6 w-[95%]">
      {(user?.role === "admin" || user?.role === "instructor") && (
  <div
    className="flex items-center text-lg sm:text-xl text-gray-500 mb-4 cursor-pointer"
    onClick={() =>
      user?.role === "admin"
        ? navigate("/courses/users")
        : navigate("/courses")
    }
  >
    <ArrowLeft className="w-5 h-5 mr-2" />  {user?.role === "admin" ? "User Management" : "Back to Courses"}
  </div>
)}


        {/* Header Section */}
        <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
          <img src={
              selecteduser?.avatar
              ? `${API_BASE}${selecteduser.avatar}`
              : "/assets/images/sidebar/profile.png"
            }
            alt={selecteduser?.fullName ?? ""}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <div className="min-w-[200px]">
              <h1 className="text-lg sm:text-xl font-semibold">{selecteduser?.fullName ?? ""}</h1>
              <span className={`text-xs font-medium px-2 py-1 rounded-md mt-1 inline-block ${selecteduser?.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{selecteduser?.active ? "Active" : "Deactivated"}</span>
              <p className="text-gray-600">{selecteduser?.role ?? ""}</p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {selecteduser?.email ?? ""}
              </p>
              {/* <span className="text-xs text-gray-500 px-1 py-0.5 rounded mt-1 inline-block">
                Role: {selecteduser?.designation ?? '' }
              </span> */}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          {(user?.role === "admin" || user?.role === "instructor") && (
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-xs sm:text-sm cursor-pointer" >
              <Edit size={16} /> {user?.role === "admin" ? "Edit User" : "Edit Profile"}
            </button>
          )}
            {user?.role === "admin" && (
                <button  onClick={handleToggleStatus} className="flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600 text-xs sm:text-sm cursor-pointer">
                  <Power size={16} />  {selecteduser?.active ? "Deactivate" : "Activate"}
                </button>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full flex flex-col-reverse xl:flex-row flex-wrap xl:flex-nowrap gap-6">
          <div className="flex-1 flex flex-col px-4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 bg-gray-100 rounded-lg p-1 w-full sm:flex-grow">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-t transition-none transform-none text-sm sm:text-base hover:cursor-pointer hover:text-gray-900
                      ${activeTab === tab
                        ? "border-b-2 border-black font-semibold"
                        : "text-gray-500"
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="w-full">
              {/* {activeTab === "courses" && (
                <div className="bg-white p-4 rounded-lg shadow-[0_10px_20px_0px_rgba(0,0,0,0.1)]">
                
                  < CoursesTab selecteduser={selecteduser} />
                </div>
              )} */}



              {/* {activeTab === "students" && (
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-gray-500 w-full">
                  <Students mentorId={selecteduser?._id} schoolId={selecteduser?.schoolId} />
                </div>
              )} */}

{activeTab === "courses" && tabs.includes("courses") && (
  <div className="bg-white p-4 rounded-lg shadow-[0_10px_20px_0px_rgba(0,0,0,0.1)]">
    <CoursesTab selecteduser={selecteduser} />
  </div>
)}

{activeTab === "students" && tabs.includes("students") && (
  <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-gray-500 w-full">
    <Students mentorId={selecteduser?._id} schoolId={selecteduser?.schoolId} />
  </div>
)}



              {/* {activeTab === "feedback" && (
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-gray-500">
                  Feedback section will go here...
                </div>
              )} */}
{/* 
              {activeTab === "contact" && (
                <div className="bg-white rounded-2xl shadow p-4 sm:p-6 text-gray-500">
                  Contact details will go here...
                </div>
              )} */}
            </div>
          </div>

          {/* QuickStats on the right */}
          {activeTab === "students" && tabs.includes("students") && (
          <div className="w-full xl:w-[320px] flex-shrink-0">
            <QuickStats  selecteduser={selecteduser} />
          </div>
          )}
        </div>
      </div>
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative">
            <AddUser
              setShowRegisterModal={setShowAddUser}
              schoolId={selecteduser.schoolId}
              editMode={true}
              userId={selecteduser?._id}

            // onUserAdded={fetchUsers}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleUserView;
