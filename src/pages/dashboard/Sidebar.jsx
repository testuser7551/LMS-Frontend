// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Home,
//   BookOpen,
//   Users,
//   Award,
//   MessageCircle,
//   CreditCard,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   BarChart3,
//   FileText,
//   User,
//   Menu,
//   X,
//   QrCode,
// } from "lucide-react";

// // Sidebar items with role-based access

// // Optional role-based header titles
// const sidebarTitles = {
//   admin: "Admin Panel",
//   student: "Student Portal",
//   instructor: "Instructor Hub",
//   mentor: "Mentor Space",
// };

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const sidebarItems = [
//   { icon: Home, label: "Home", tab: "dashboard", roles: ["student", "admin", "instructor", "mentor"] },
//   { icon: BookOpen, label: "Courses", tab: "courses", roles: ["student", "admin", "instructor"] },
//   //   { icon: Award, label: "Certificates", tab: "certificates", roles: ["student", "admin"] },
//   //   { icon: MessageCircle, label: "Discussion", tab: "discussions", roles: ["student", "admin", "instructor", "mentor"] },
//   { icon: QrCode, label: "QR Codes", tab: "qrcode", roles: ["student", "admin"] },
//   // { icon: CreditCard, label: "Card Designer", tab: "mycard", roles: ["student", "admin"] },
//   { icon: CreditCard, label: "Card Designer", tab: `${user.role==="admin"?"admincard":"mycard"}`, roles: ["student", "admin"] },
//   { icon: CreditCard, label: "New Card", tab: "editcard", roles: ["admin"] },

//   //   { icon: Users, label: "User Management", tab: "users", roles: ["admin"] },
//   //   { icon: BarChart3, label: "Analytics", tab: "analytics", roles: ["instructor",""] },
//   //   { icon: FileText, label: "Content Management", tab: "content", roles: ["admin", "instructor"] },
//   //   { icon: User, label: "Profile", tab: "profile", roles: ["student", "admin", "instructor", "mentor"] },
//   //   { icon: Settings, label: "Settings", tab: "settings", roles: ["student", "admin", "instructor", "mentor"] },
// ];

//   const query = new URLSearchParams(location.search);

//   // Get path like /dashboard/courses/category/1
//   const path = location.pathname;

//   // Extract the first segment after /dashboard
//   const activeTab = path.startsWith("/dashboard")
//     ? path.split("/")[2] || "dashboard" // e.g., "courses", "mycard"
//     : null;

//   // console.log("activeTab:", activeTab);
//   const filteredItems = sidebarItems.filter(
//     (item) => user && item.roles.includes(user?.role)
//   );

//   const SidebarContent = () => (
//     <div className="">
//       {/* Header (hidden if no title for this role) */}
//       {sidebarTitles[user?.role] && (
//         <div className="p-3 sm:p-4 border-b border-headcolor flex items-center justify-between">
//           {(!isCollapsed || isMobileOpen) && (
//             <div className="flex items-center space-x-2 sm:space-x-3">
//               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
//                 <BookOpen className="text-white" size={18} />
//               </div>
//               <h1 className="text-lg sm:text-xl font-bold text-headcolor font-poppins">
//                 {sidebarTitles[user.role]}
//               </h1>
//             </div>
//           )}
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="hidden lg:flex p-1.5 rounded-lg hover:bg-headcolor transition-colors hover:text-white text-headcolor font-poppins"
//             >
//               {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//             </button>
//             <button
//               onClick={() => setIsMobileOpen(false)}
//               className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* User Profile */}
//       <div className="p-3 sm:p-4 border-b border-gray-200">
//         <div className="flex items-center space-x-2 sm:space-x-3">
//           <img
//             src={
//               user?.avatar ||
//               `/assets/images/sidebar/profile.png`
//             }
//             alt={user?.name}
//             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//           />
//           {(!isCollapsed || isMobileOpen) && (
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-headcolor truncate font-poppins">
//                 {user?.name}
//               </p>
//               <p className="text-xs text-subtext capitalize font-poppins">{user?.role}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
//         {filteredItems.map((item) => {
//           const IconComponent = item.icon;
//           const isActive = activeTab === item.tab;

//           return (
//             <button
//               key={item.label}
//               onClick={() => {
//                 if (item.tab === "dashboard") {
//                   navigate("/dashboard");
//                 } else if (item.tab) {
//                   navigate(`/dashboard/${item.tab}`);
//                 } else if (item.path) {
//                   navigate(item.path);
//                 }
//                 setIsMobileOpen(false);
//               }}
//               title={isCollapsed ? item.label : ""}
//               className={`w-full flex items-center font-bold ${isCollapsed ? "justify-center" : "justify-start"
//                 } space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-left transition-all duration-200 group ${isActive
//                   ? "bg-activecolor text-headcolor border border-headcolor "
//                   : "text-primary hover:bg-activecolor hover:text-headcolor"
//                 }`}
//             >
//               <IconComponent size={isCollapsed ? 24 : 20} className="flex-shrink-0" />
//               {(!isCollapsed || isMobileOpen) && (
//                 <span className="font-bold text-sm sm:text-base truncate font-poppins">
//                   {item.label}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-3 sm:p-4 border-t border-gray-200">
//         <button
//           onClick={() => {
//             logout();
//             setIsMobileOpen(false);
//             navigate("/");
//           }}
//           className="w-full group flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:bg-red-50  transition-all duration-200"
//         >
//           <LogOut size={20} className="group text-subtext group-hover:text-red-700 transition-colors flex-shrink-0" />
//           {(!isCollapsed || isMobileOpen) && (
//             <span className="font-medium text-sm sm:text-base text-subtext group-hover:text-red-500 font-extrabold font-poppins">Logout</span>
//           )}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
//       >
//         <Menu size={20} />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-opacity-50 z-40"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Desktop Sidebar */}
//       <div
//         className={`hidden lg:flex ${isCollapsed ? "w-16" : "w-64"
//           } bg-white border-r border-gray-200 transition-all duration-300 flex-col h-screen shadow-sm`}
//       >
//         <SidebarContent />
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
//       >
//         <SidebarContent />
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Home,
  BookOpen,
  Users,
  Award,
  MessageCircle,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  User,
  Menu,
  X,
  QrCode,
} from "lucide-react";
import { logoutUser } from "../../api/auth";
import { ToolTip } from "../../components/ToolTip"

// Sidebar items with role-based access

// Optional role-based header titles
const sidebarTitles = {
  admin: "Admin Panel",
  student: "Student Portal",
  instructor: "Instructor Hub",
  mentor: "Mentor Space",
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    // {
    //   icon: Home,
    //   label: "Home",
    //   tab: "dashboard",
    //   roles: ["student", "admin", "instructor", "mentor"],
    // },
    {
      icon: BookOpen,
      label: "Courses",
      tab: "courses",
      roles: ["student", "admin", "instructor"],
    },
    {
      icon: QrCode,
      label: "QR Codes",
      tab: "qrcode",
      roles: ["student", "admin"],
    },
    {
      icon: CreditCard,
      label: "Card Designer",
      tab: `${user.role === "admin" ? "admincard" : "mycard"}`,
      roles: ["student", "admin"],
    },

    { icon: CreditCard, label: "New Card", tab: "editcard", roles: ["admin"] },
    {
      icon: MessageCircle,
      label: "Discussions",
      tab: "discussions",
      roles: ["student", "admin", "instructor", "mentor"],
    },
  ];

  const query = new URLSearchParams(location.search);

  // Get path like /dashboard/courses/category/1
  const path = location.pathname;

  // Extract the first segment after /dashboard
  const activeTab = path.startsWith("/courses")
    ? path.split("/")[2] || "courses" // e.g., "courses", "mycard"
    : null;

  const filteredItems = sidebarItems.filter(
    (item) => user && item.roles.includes(user?.role)
  );

  const SidebarContent = () => (
    <div className="">
      {/* Header (hidden if no title for this role) */}
      {sidebarTitles[user?.role] && (
        <div className="p-3 sm:p-4 border-b border-headcolor flex items-center justify-between">
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-gray-500 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={18} />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-headtext font-poppins">
                {sidebarTitles[user.role]}
              </h1>
            </div>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-headcolor transition-colors hover:text-white text-headcolor font-poppins"
            >
              {isCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="pl-3 pt-3 sm:pl-4 flex justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={user?.avatar || `/assets/images/sidebar/profile.png`}
            alt={user?.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-headtext truncate font-poppins">
                {user?.name}
              </p>
              <p className="text-xs text-headtext capitalize font-poppins">
                {user?.role}
              </p>
            </div>
          )}
        </div>
        <div className="p-3 sm:py-2 sm:px-2">
          <ToolTip id="logout" content="Logout">
            <button
              onClick={() => {
                logoutUser();
                setIsMobileOpen(false);
                navigate("/");
              }}
              className="cursor-pointer w-full group flex flex-col items-center px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:bg-red-200 bg-red-50  transition-all duration-200"
            >
              <LogOut
                size={20}
                className="group text-red-700 group-hover:text-red-700 transition-colors flex-shrink-0"
              />
              {/* <span className="text-[10px]">Logout</span> */}
            </button>
          </ToolTip>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.tab;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.tab === "courses") {
                  navigate("/courses");
                } else if (item.tab) {
                  navigate(`/courses/${item.tab}`);
                } else if (item.path) {
                  navigate(item.path);
                }
                setIsMobileOpen(false);
              }}
              title={isCollapsed ? item.label : ""}
              className={`w-full flex items-center font-bold ${isCollapsed ? "justify-center" : "justify-start"
                } space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-left transition-all duration-200 group ${isActive
                  ? "bg-activecolor text-headtext"
                  : "text-headtext hover:bg-activecolor hover:text-headcolor"
                }`}
            >
              <IconComponent
                size={isCollapsed ? 24 : 20}
                className="flex-shrink-0"
              />
              {(!isCollapsed || isMobileOpen) && (
                <span className="font-bold text-sm sm:text-base truncate font-poppins text-headtext">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex ${isCollapsed ? "w-16" : "w-64"
          } bg-white border-r border-gray-200 transition-all duration-300 flex-col h-screen shadow-sm`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
