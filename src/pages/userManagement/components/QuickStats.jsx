import React, { useState, useContext, useEffect } from "react";
import { fetchMentorDashboard } from "../../../api/usermanagement/usermanagement";

function QuickStats({ selecteduser }) {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    lastCourse: "-",
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!selecteduser?._id) return;
  
        const res = await fetchMentorDashboard(selecteduser._id);
        console.log("Mentor Dashboard Data:", res);
  
        if (res.success) {
          // Format backend date (like "2025/10") → "Oct 2025"
          let formattedDate = "-";
          if (res.lastCourse) {
            const [year, month] = res.lastCourse.split("/");
            const date = new Date(`${year}-${month}-01`);
            formattedDate = date.toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            }); // 👉 "Oct 2025"
          }
  
          setStats({
            totalCourses: res.totalCourses,
            totalStudents: res.studentCount,
            lastCourse: formattedDate,
          });
        }
      } catch (error) {
        console.error("Error loading mentor dashboard:", error);
      }
    };
  
    loadDashboardData();
  }, [selecteduser]);
  
  return (
    <div className="w-full xl:w-64 bg-white p-5 rounded-lg shadow-sm ">
      <h3 className="text-md font-semibold text-gray-800 mb-6">Quick Stats</h3>

      <div className="flex flex-col space-y-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Total Courses</span>
          <span className="font-medium text-black">{stats.totalCourses}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Students</span>
          <span className="font-medium text-black">{stats.totalStudents}</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Average Rating</span>
          <span className="font-medium text-black">⭐ {stats.averageRating}</span>
        </div> */}
        <div className="flex justify-between">
          <span>Last Course</span>
          <span className="font-medium text-black">{stats.lastCourse}</span>
        </div>
      </div>
    </div>
  );
}

export default QuickStats;
