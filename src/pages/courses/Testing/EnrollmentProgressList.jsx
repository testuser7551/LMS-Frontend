// EnrollmentProgressList.jsx
import React, { useEffect, useState } from "react";
import {showToast} from "../../../components/toast";
import { fetchProgressAll, deleteProgress } from "../../../api/courses/progress";

const EnrollmentProgressList = () => {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all progress
  const fetchProgress = async () => {
    try {
      const response = await fetchProgressAll();
      setProgressList(response);
    } catch (error) {
      console.error("Error fetching course progress:", error);
      showToast("Failed to fetch course progress.","top-center",10000,"dark");
    } finally {
      setLoading(false);
    }
  };

  // Delete a particular progress
  const handleDelete = async (userId, courseId) => {
    if (!window.confirm("Are you sure you want to delete this progress?"))
      return;

    try {
      await deleteProgress(userId, courseId);
      showToast("Progress deleted successfully","top-center",10000,"dark");
      fetchProgress(); // Refresh the list
    } catch (error) {
      console.error("Error deleting progress:", error);
      showToast("Failed to delete progress.","top-center",10000,"dark");
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course Progress</h2>
      {progressList.length === 0 ? (
        <p>No progress records found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">
                Course Completed
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {progressList.map((progress) => (
              <tr key={`${progress.user._id}-${progress.course._id}`}>
                <td className="border border-gray-300 px-4 py-2">
                  {progress.user.name} ({progress.user.email})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {progress.course.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {progress.courseCompleted ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      handleDelete(progress.user._id, progress.course._id)
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

export default EnrollmentProgressList;
