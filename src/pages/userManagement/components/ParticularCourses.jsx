import React, { useEffect, useState, useMemo, useContext } from "react";
import { Play, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getAssignedCourses } from "../../../api/usermanagement/coursemanagement"; // new helper

const API_BASE = import.meta.env.VITE_API_BASE;

const ParticularCourses = ({ selecteduser,refresh }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!selecteduser?._id || !selecteduser?.schoolId) return;

      try {
        setLoading(true);
        // Fetch assigned courses for the selected user
        const coursesData = await getAssignedCourses(
          selecteduser._id,
          selecteduser.schoolId
        );

        // Filter only assigned courses
        const assignedCourses = (coursesData.data || []).filter(
          (course) => course.assigned === true
        );

        setAllCourses(assignedCourses);
      } catch (error) {
        console.error("Failed to fetch assigned courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selecteduser,refresh]);

  // Compute lessons + duration
  const processedCourses = useMemo(() => {
    return allCourses.map((course) => {
      const totalLessons = course.chapters?.reduce(
        (sum, chapter) =>
          sum +
          chapter.lessons.filter((lesson) => lesson.published === "Published")
            .length,
        0
      );

      const totalMinutes = course.chapters?.reduce(
        (sum, ch) =>
          sum +
          ch.lessons.reduce((lessonSum, lesson) => {
            const value = Number(lesson.duration?.value || 0);
            return (
              lessonSum + (lesson.duration?.unit === "hrs" ? value * 60 : value)
            );
          }, 0),
        0
      );

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return { ...course, totalLessons, hours, minutes };
    });
  }, [allCourses]);

  return (
    <>
      {loading ? (
        <p className="col-span-full text-center text-gray-500">
          Loading courses...
        </p>
      ) : processedCourses.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No assigned courses available<br></br>
          Click <b>+ Assign Course</b> to assign courses to this user.
        </p>
      ) : (
        processedCourses.map((course) => (
          <div
            key={course._id}
            className="bg-[#e9e9e9] relative rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition duration-300 overflow-hidden"
          >
            {/* Badge Row */}
            <div className="absolute top-3 left-0 right-0 flex justify-between px-3 z-10">
              <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                {course.category}
              </span>
              <span className="bg-white text-black border px-3 py-1 rounded-full text-xs font-semibold">
                {course.level}
              </span>
            </div>

            {/* Image */}
            <img
              src={
                course?.image
                  ? `${API_BASE}/uploads/courses/${course.image}`
                  : `/assets/images/courses/no-image.png`
              }
              alt={course?.title || "No Title"}
              className="w-full h-40 object-cover"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-4 space-y-3">
              <h2 className="text-lg font-bold line-clamp-2 break-words">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2 break-words">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {course.enrolledCount || 0} Enrolled
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600 items-center">
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {course.hours} hrs {course.minutes} mins
                  </span>
                </div>
              </div>

              {/* View Button */}
              <button
                onClick={() =>
                  navigate("/courses/viewdetails", {
                    state: { courseId: course._id },
                  })
                }
                className="w-full bg-primary text-white hover:bg-white hover:text-black cursor-pointer py-2 rounded-lg border-2 border-primary transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ParticularCourses;
