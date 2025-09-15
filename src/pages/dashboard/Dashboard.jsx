// import React from "react";
// import Sidebar from "./Sidebar";
// import { useSearchParams } from "react-router-dom";

// // Pages
// import AdminDashboard from "./AdminDashboard";
// import StudentDashboard from "./StudentDashboard";
// import Courses from "../courses/Courses";
// import CardDesigner from "../cardDesigner/CardDesigner";
// import QrCode from "../qrCode/QrCode";
// import CourseForm from "../courses/CourseForm"

// // import AddCourse from "../../pages/Courses/AddCourse";
// // import CertificatesPage from "../../pages/CertificatesPage";
// // import DiscussionPage from "../../pages/Discussion/DiscussionPage";
// // import UserManagement from "../../pages/UserMangement";
// // import Analytics from "../../pages/Analytics";
// // import ContentManagement from "../../pages/ContentManagement";
// // import Profile from "../../pages/Profile";
// // import Settings from "../../pages/Settings";

// const Dashboard = () => {
//   const [searchParams] = useSearchParams();
//   const tab = searchParams.get("tab");
//   const view = searchParams.get("view");
//   const action = searchParams.get("action");

//   const renderContent = () => {
//     if (!tab) {
//       if (user?.role === "admin") return <AdminDashboard />;
//       if (user?.role === "student") return <StudentDashboard />;
//       if (user?.role === "mentor") return <div>Mentor Dashboard Coming Soon</div>;
//       if (user?.role === "instructor") return <div>Instructor Dashboard Coming Soon</div>;
//     }

//     switch (tab) {
//       case "courses":
//         return view === "add" ? <AddCourse /> : <Courses />;
//       case "certificates":
//         return <CertificatesPage user={user} action={action} />;
//       case "discussions":
//         return <DiscussionPage />;
//       case "mycard":
//         return <CardDesigner />;
//       case "users":
//         return <UserManagement />;
//       case "analytics":
//         return <Analytics />;
//       case "content":
//         return <ContentManagement />;
//       case "profile":
//         return <Profile />;
//       case "settings":
//         return <Settings />;
//       case "qrcode":
//         return <QrCode />;
//       case "courses/addcourse":
//         return <CourseForm />;
//       default:
//         return <div className="p-6">Page Not Found</div>;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 overflow-y-auto">{renderContent()}</main>
//     </div>
//   );
// };

// export default Dashboard;
