// EnrollmentList.jsx
import React, { useEffect, useState } from "react";

import { fetchEnrollments, deleteEnrollment } from "../../../api/courses/enroll";

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all enrollments
  const loadEnrollments = async () => {
    try {
      const response = await fetchEnrollments();
      setEnrollments(response);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      alert("Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  // Delete an enrollment
  const handleDelete = async (userId, courseId) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?"))
      return;

    try {
      await deleteEnrollment(userId, courseId);
      alert("Enrollment deleted successfully");
      fetchEnrollments(); // Refresh the list
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment");
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  if (loading) {
    return <div>Loading enrollments...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Enrollments</h2>
      {enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Enrolled At</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={`${enrollment.user._id}-${enrollment.course._id}`}>
                <td className="border border-gray-300 px-4 py-2">
                  {enrollment.user.name} ({enrollment.user.email})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {enrollment.course.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      handleDelete(enrollment.user._id, enrollment.course._id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnrollmentList;
