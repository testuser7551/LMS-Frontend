import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { getStudentsByAdmin } from "../../../api/usermanagement/usermanagement";
import { assignStudent, unassignStudent } from "../../../api/usermanagement/usermanagement";


const AddStudentModal = ({
  isOpen,
  onClose,
  assignedStudents,
  onAssignChange,
  mentorId,
  schoolId,
  onRefresh,
}) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    studentId: "",
    studentName: "",
    action: "",
  });

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudentsByAdmin(searchTerm, schoolId);
      const studentsList = res?.data || [];
      setStudents(studentsList);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchStudents();
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter students based on searchTerm and status
  const filteredStudents = students
    .filter((student) => {
      const fullName = `${student.fname || ""} ${student.lname || ""}`.trim();
      return (
        fullName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        (student.email || "").toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    })
    .filter((student) => {
      if (statusFilter === "All") return true;
      if (statusFilter === "Assigned") return assignedStudents.includes(student._id.toString());
      if (statusFilter === "Not Assigned") return !assignedStudents.includes(student._id.toString());
      return true;
    });

  const handleToggle = (student) => {
    const isAssigned = assignedStudents.includes(student._id.toString());
    const action = isAssigned ? "Unassign" : "Assign";
    const studentName = `${student.fname || ""} ${student.lname || ""}`.trim() || student.email;

    setConfirmModal({
      isOpen: true,
      studentId: student._id.toString(),
      studentName,
      action,
    });
  };

  const handleConfirm = async () => {
    try {
      if (confirmModal.action === "Assign") {
        const res = await assignStudent(confirmModal.studentId, mentorId, schoolId);
        onAssignChange(confirmModal.studentId, true);
      } else {
        const res = await unassignStudent(confirmModal.studentId, schoolId);
        onAssignChange(confirmModal.studentId, false);
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Error in assign/unassign:", err);
    } finally {
      setConfirmModal({ isOpen: false, studentId: "", studentName: "", action: "" });
    }
  };

  const handleCancel = () => {
    setConfirmModal({ isOpen: false, studentId: "", studentName: "", action: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8 relative flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl text-primary font-semibold">Add Student</h2>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by Student Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-300 rounded-md text-base w-full focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-3 px-4 text-base focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="All">All</option>
              <option value="Assigned">Assigned</option>
              <option value="Not Assigned">Not Assigned</option>
            </select>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading students...</p>
          ) : (
            <table className="min-w-full bg-white rounded-md">
              <thead>
                <tr className="text-left text-base text-gray-700 bg-gray-200">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student._id || index}
                      className="hover:bg-gray-50 border-b border-gray-100"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              student?.avatar
                                ? `${API_BASE.replace(/\/$/, "")}${student.avatar}`
                                : "/assets/images/sidebar/profile.png"
                            }
                            alt={`${student.fname || ""} ${student.lname || ""}`.trim() || student.email}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 truncate text-lg">
                              {`${student.fname || ""} ${student.lname || ""}`.trim() || student.email}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {student.email || student.role}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggle(student)}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                            assignedStudents.includes(student._id.toString())
                              ? "bg-black"
                              : "bg-gray-400"
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                              assignedStudents.includes(student._id.toString())
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-6 px-4 text-center text-gray-500 text-lg">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{confirmModal.action} Student</h3>
            <p className="mb-6">
              Do you want to {confirmModal.action.toLowerCase()}{" "}
              <span className="font-medium">{confirmModal.studentName}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudentModal;
