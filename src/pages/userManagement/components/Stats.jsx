import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthContext } from "../../../context/AuthContext";
import { FaUsers, FaGraduationCap, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

function Stats({ rolesCount }) {
    const { user} = useContext(AuthContext);
    let stats = [];

    if (user?.role === "admin") {
        stats = [
            { label: "Total Users", value: rolesCount?.total || 0, icon: <FaUsers className="w-6 h-5" /> },
            { label: "Mentors", value: rolesCount?.mentor || 0, icon: <FaGraduationCap className="w-6 h-5" /> },
            { label: "Instructors", value: rolesCount?.instructor || 0, icon: <FaChalkboardTeacher className="w-6 h-5" /> },
            { label: "Students", value: rolesCount?.student || 0, icon: <FaUserGraduate className="w-6 h-5" /> },
        ];
    } else {
        stats = [
            { label: "Students", value: rolesCount?.student || 0, icon: <FaUserGraduate className="w-6 h-5" /> },
        ];
    }
    return (
        // <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        //     {stats.map((s, i) => (
        //         <div
        //             key={i}
        //             className="bg-white rounded-2xl shadow-sm border border-activecolor flex flex-row items-center justify-between p-5 gap-2"
        //         >
        //             <div className="flex flex-col items-center gap-2">
        //                 <div className="text-secondary text-sm font-poppins">
        //                     {s.label}
        //                 </div>
        //                 <div className="text-2xl font-bold font-poppins text-primary">
        //                     {s.value}
        //                 </div>
        //             </div>
        //             <div className="text-primary text-sm flex items-center gap-2 bg-activecolor p-4 rounded-xl">
        //                 {s.icon}
        //             </div>
        //         </div>
        //     ))}
        // </div>
        <div className="grid grid-cols-2 gap-4 [@media(max-width:400px)]:grid-cols-1 lg:grid-cols-4">
  {stats.map((s, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl shadow-sm border border-activecolor flex items-center justify-between p-5 gap-2"
    >
      <div className="flex flex-col items-start gap-2">
        <div className="text-secondary text-sm font-poppins">
          {s.label}
        </div>
        <div className="text-2xl font-bold font-poppins text-primary">
          {s.value}
        </div>
      </div>
      <div className="text-primary text-sm flex items-center gap-2 bg-activecolor p-4 rounded-xl">
        {s.icon}
      </div>
    </div>
  ))}
</div>

    );
}

export default Stats;
