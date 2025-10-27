import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import {
  getCourseByAdmin,
  assignCourses,
  unassignCourse,
} from "../../../api/usermanagement/coursemanagement";
 import ConformationModel from "./ConformationModel";// make sure path correct

const AddCourseModal = ({ isOpen, onClose, schoolId, userId, role, createdById,onCourseChange }) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Confirmation modal state
  const [modelOpen, setModelOpen] = useState(false);
  const [pendingCourse, setPendingCourse] = useState(null);

  // Fetch courses with assigned status
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourseByAdmin(searchTerm, schoolId, userId);
      const coursesList =
        res?.data?.map((c) => ({
          ...c,
          assigned: !!c.assigned,
        })) || [];
      setCourses(coursesList);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCourses();
  }, [isOpen, searchTerm]);

  if (!isOpen) return null;

  // Open confirm modal
  const handleToggleAssign = (course) => {
    setPendingCourse(course);
    setModelOpen(true);
  };

  // Confirm yes
  const handleConfirm = async () => {
    if (!pendingCourse) return;
    try {
      const payload = {
        courseId: pendingCourse._id,
        userId,
        role,
        schoolUniqueId: schoolId,
        createdById,
      };

      if (pendingCourse.assigned) {
        await unassignCourse(payload);
        setCourses((prev) =>
          prev.map((c) =>
            c._id === pendingCourse._id ? { ...c, assigned: false } : c
          )
        );
      } else {
        await assignCourses(payload);
        setCourses((prev) =>
          prev.map((c) =>
            c._id === pendingCourse._id ? { ...c, assigned: true } : c
          )
        );
      }
    if (onCourseChange) onCourseChange();
    } catch (err) {
      console.error("Toggle assign error:", err);
    } finally {
      setModelOpen(false);
      setPendingCourse(null);
    }
  };

  // Modal title/content dynamic
  const modalTitle = pendingCourse?.assigned
    ? "Unassign Course"
    : "Assign Course";

  const modalContent = pendingCourse?.assigned
    ? "Do you want to unassign this course from this mentor?"
    : "Do you want to assign this course to this mentor?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8 relative flex flex-col max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-xl md:text-2xl text-primary font-semibold">
            Add Course
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Course Title / Category / Creator"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-300 rounded-md text-base w-full focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Course List */}
        <div className="overflow-y-auto flex-1">
          {loading ? (
            <p className="text-center text-gray-500 py-6">
              Loading courses...
            </p>
          ) : (
            <table className="min-w-full bg-white rounded-md">
              <thead>
                <tr className="text-left text-base text-gray-700 bg-gray-200">
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Created By</th>
                  <th className="py-3 px-4 text-right">Assigned</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr
                      key={course._id || index}
                      className="hover:bg-gray-50 border-b border-gray-100"
                    >
                      {/* Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              course?.image
                                ? `${API_BASE.replace(/\/$/, "")}/uploads/courses/${course.image}`
                                : "/assets/images/course-placeholder.png"
                            }
                            alt={course.title}
                            className="w-40 h-40 object-cover rounded-md"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-4 text-gray-700">
                        {course.title}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {course.category}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {course?.createdBy
                          ? `${course.createdBy.fname || ""} ${course.createdBy.lname || ""}`.trim()
                          : "N/A"}
                      </td>

                      {/* Assigned toggle */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleAssign(course)}
                          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                            course.assigned ? "bg-black" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                              course.assigned
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
                    <td
                      colSpan="5"
                      className="py-6 px-4 text-center text-gray-500 text-lg"
                    >
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {modelOpen && (
        <ConformationModel
          onClose={() => setModelOpen(false)}
          onConfirm={handleConfirm}
          title={modalTitle}
          content={modalContent}
        />
      )}
    </div>
  );
};

export default AddCourseModal;
