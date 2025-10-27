import React, { useState,useContext } from "react";
import { Search } from "lucide-react";
import ParticularCourses from "../components/ParticularCourses";
import AddCourseModal from "../components/AddCourseModal"; // ✅ Import the modal
import { AuthContext } from "../../../context/AuthContext";

export const CoursesTab = ({ selecteduser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const [refreshCourses, setRefreshCourses] = useState(false);

  const handleCourseChange = () => {
    // toggle refresh flag
    setRefreshCourses((prev) => !prev);
  };
  

  // Assume schoolId comes from logged-in user (context / redux / props)
  //const schoolId = schoolId; // 🔹 Replace with actual schoolId from auth/user context

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3 w-full">
        <h2 className="text-lg md:text-xl text-primary font-semibold whitespace-nowrap self-start">
          Courses
        </h2>

        {/* Right - Search and Button (always aligned right) */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Search Field with Icon */}
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by Courses"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Add Courses Button */}
          
          <button
            onClick={() => setIsModalOpen(true)} // ✅ Open modal
            className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm whitespace-nowrap cursor-pointer"
          >
            + Assign Course
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        <ParticularCourses selecteduser={selecteduser}
         refresh={refreshCourses} 
        />
      </div>

      {/* AddCourseModal */}
      {/* <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schoolId={selecteduser?.schoolId}
      /> */}
      <AddCourseModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  schoolId={selecteduser?.schoolId}
  userId={selecteduser?._id}
  role={selecteduser?.role}
  fullName={selecteduser?.fullName}
  createdById={user?._id}
  onCourseChange={handleCourseChange} 
/>

    </>
  );
};
