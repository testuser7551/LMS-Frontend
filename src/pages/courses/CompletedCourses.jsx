import React, { useEffect, useState } from "react";
import { getCompletedCoursesAPI } from "../../api/courses/courses";
const API_BASE = import.meta.env.VITE_API_BASE;

const CompletedCourses = ({ userId }) => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const data = await getCompletedCoursesAPI(userId);
        if (data.success) {
          setCompletedCourses(data.completedCourses);
        } else {
          setError(data.message || "Failed to fetch completed courses.");
        }
      } catch (err) {
        console.error("Error fetching completed courses:", err);
        setError("An error occurred while fetching completed courses.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedCourses();
    }
  }, [userId]);

  if (loading) return <p>Loading completed courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (completedCourses.length === 0) return <p>No completed courses found.</p>;

  return (
    <div className="flex flex-col gap-4 mt-4">
      {completedCourses.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 className="text-lg font-bold">{item.course.title}</h2>
            <p className="text-sm text-gray-600">{item.course.description}</p>
            <p className="text-sm text-gray-500">
              Instructor: {item.course.instructor || "N/A"}
            </p>
          </div>

          {item.certificate ? (
            <a
              href={`${API_BASE}${item.certificate}`} // <-- use backticks and ${} properly
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
            >
              View Certificate
            </a>
          ) : (
            <span className="text-gray-500 italic">
              Certificate not available
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompletedCourses;
