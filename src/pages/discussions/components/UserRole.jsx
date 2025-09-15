// src/pages/Discussion/components/UserRole.jsx
import React from "react";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

const UserRole = ({ role, size = "sm" }) => {
  const getRoleConfig = () => {
    switch (role) {
      case "instructor":
        return {
          icon: GraduationCap,
          label: "Instructor",
          color: "bg-activecolor text-primary border-none",
        };
      case "admin":
        return {
          icon: Shield,
          label: "Admin",
          color: "bg-activecolor text-primary border-none",
        };
      default:
        return {
          icon: BookOpen,
          label: "Student",
          color: "bg-activecolor text-primary border-none",
        };
    }
  };

  const config = getRoleConfig();
  const IconComponent = config.icon;

  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center space-x-1 font-poppins rounded-full border font-medium ${config.color} ${sizeClasses}`}
    >
      <IconComponent
        className={`${size === "sm" ? "h-3 w-3" : "h-4 w-4"}`}
      />
      <span>{config.label}</span>
    </span>
  );
};

export default UserRole;
