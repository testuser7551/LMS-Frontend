import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ParticularCourses from "../components/ParticularCourses";
import AddStudentModal from "../components/AddStudentModal";
import { getStudentsByMentor } from "../../../api/usermanagement/usermanagement";




// export default Students;
const Students = ({ mentorId, schoolId }) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [assignedStudentIds, setAssignedStudentIds] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3; // backend limit
  const [totalPages, setTotalPages] = useState(1);

  const handleAssignChange = (studentId, status) => {
    setAssignedStudentIds((prev) => {
      if (status) return [...prev, studentId.toString()];
      return prev.filter((id) => id !== studentId.toString());
    });
  };

  const fetchStudents = async () => {
    if (!mentorId) return;

    try {
      setLoading(true);
      const res = await getStudentsByMentor(mentorId, schoolId, currentPage, studentsPerPage);
      console.log("Total courses:", res.totalCourses);
      const fetchedStudents = res.data || [];
      setTotalCourses(res.totalCourses || 0);
      setStudents(fetchedStudents);
      setTotalPages(res.totalPages || 1);

      const assignedIds = fetchedStudents.map((item) => item._id.toString());
      setAssignedStudentIds(assignedIds);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [mentorId, schoolId, currentPage]);

  // Filter students by search term
  const filteredStudents = students.filter((item) => {
    const fullName = `${item.fname || ""} ${item.lname || ""}`.trim();
    return (
      fullName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3 w-full">
            <h2 className="text-lg md:text-xl text-primary font-semibold whitespace-nowrap self-start">
              Students
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative w-full sm:w-48 md:w-56 lg:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by Student Name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <button
                onClick={() => setShowAddStudent(true)}
                className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm whitespace-nowrap cursor-pointer"
              >
                + Assign Student
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white overflow-hidden rounded-md">
              <thead>
                <tr className="text-left text-sm text-gray-600 bg-gray-200">
                  <th className="py-3 px-2 sm:px-3 md:px-4">Name</th>
                  <th className="py-3 px-2 sm:px-3 md:px-4 text-center sm:text-left">Total Courses</th>
                  <th className="py-3 px-2 sm:px-3 md:px-4 text-center sm:text-left">Completed Courses</th>
                  {/* <th className="py-3 px-2 sm:px-3 md:px-4">Action</th> */}
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-6 px-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredStudents.length > 0 ? (
                  filteredStudents.map((item, index) => {
                    const fullName = `${item.fname || ""} ${item.lname || ""}`.trim() || item.email;
                    return (
                      <tr key={item._id || index} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="py-3 px-2 sm:px-3 md:px-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={
                              item?.avatar
                                ? `${API_BASE.replace(/\/$/, "")}${item.avatar}`
                                : "/assets/images/sidebar/profile.png"
                            }
                              alt={fullName}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{fullName}</p>
                              <p className="text-xs text-gray-500 truncate">{item.role || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 sm:px-3 md:px-4 text-center sm:text-left">
                          <span className="inline-block w-full sm:w-auto text-center">{totalCourses}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-3 md:px-4 text-center sm:text-left">
                          <span className="inline-block w-full sm:w-auto text-center">{item.completedCourses || 0}</span>
                        </td>
                        {/* <td className="py-3 px-2 sm:px-3 md:px-4">
                          <button className="text-blue-600 hover:underline text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                            View Profile
                          </button>
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="py-6 px-4 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === num ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <AddStudentModal
        isOpen={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        assignedStudents={assignedStudentIds}
        onAssignChange={handleAssignChange}
        mentorId={mentorId}
        schoolId={schoolId}
        onRefresh={fetchStudents} 
      />

    </div>
  );
};

export default Students;