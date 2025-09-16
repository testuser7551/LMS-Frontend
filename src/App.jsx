
// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DiscussionPage from "./pages/discussions/DiscussionPage";
import { AuthContext } from "./context/AuthContext";
import React, {useContext} from "react";
import MyCard from "./pages/cardDesigner/MyCard";
// Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import Courses from "./pages/courses/Courses";
import CourseForm from "./pages/courses/CourseForm/CourseForm";
// import CourseCategory from "./pages/courses/CourseCategory";
import { CardDesigner } from "./pages/cardDesigner/CardDesigner";
import { AdminCard } from "./pages/cardDesigner/AdminCard"
import { SingleCardView } from "./pages/cardDesigner/SingleCardView";
import Details from "./pages/courses/viewDetails/details";
import QrCode from "./pages/QRCodes/QRCode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cert1 from "./components/Cert1";
import Cert2 from "./components/Cert2";

function App() {
  return (
    <>
      {/* ✅ Global Toast Container (needed for toast to show) */}
      <ToastContainer />
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cardview/*" element={<SingleCardView />} />
        {/* Protected Dashboard */}
        <Route
          path="/courses"
          element={
            <DashboardLayout
              allowedRoles={["admin", "student", "mentor", "instructor"]}
            />
          }
        >
          {/* Role-specific dashboards */}
          <Route index element={<DefaultDashboard />} />

          {/* Common child routes */}
          {/* <Route path="courses"> */}
            <Route index element={<Courses />} />
            <Route path="addcourse" element={<CourseForm />} />
            <Route path="viewdetails" element={<Details />} />
            <Route path="certificate" element={<Cert2 />} />
          {/* </Route> */}

          <Route path="mycard" element={<CardDesigner />} />
          <Route path="editcard" element={<CardDesigner />} />
          <Route path="admincard" element={<AdminCard />} />
          <Route path="qrcode" element={<QrCode />} />
          <Route path="studentcard" element ={<MyCard  />} />
          <Route path="discussions" element={<DiscussionPage />} />

          {/* Catch-all */}
          <Route path="*" element={<div className="p-6">Page Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

// Dynamically render based on role
const DefaultDashboard = () => {
  const { user, token, setUserContext} = useContext(AuthContext);
  if (user?.role === "admin") return <Courses />;
  if (user?.role === "student") return <Courses />;
  if (user?.role === "mentor") return <div>Mentor Dashboard Coming Soon</div>;
  if (user?.role === "instructor") return <div>Instructor Dashboard Coming Soon</div>;
  return null;
};

export default App;
