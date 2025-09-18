import React, { useState, useEffect, useContext } from "react";
import { Clock, BarChart3, Play, X, User } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { getEnrollment, enrollUser } from "../../../api/courses/enroll";
import { initCourseProgressAPI } from "../../../api/courses/progress";
import { deleteCourseAPI } from "../../../api/courses/courses";
import { getEnrolledCourseCountAPI } from "../../../api/courses/courses";
import ErrorModal from "../Components/ErrorModal";
import SuccessModal from "../Components/SuccessModal";

const API_BASE = import.meta.env.VITE_API_BASE;
import { useNavigate } from "react-router-dom";

// Header Component
const Header = ({ course, setIsEnrolled, isEnrolled }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorOpen(true);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showSuccess = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };


  const handleClose = () => {
    setIsModalOpen(false);
  };

  
  const [enrolledCount, setEnrolledCount] = useState(0);
  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        const data = await getEnrolledCourseCountAPI(course._id);
        if (data.success) {
          setEnrolledCount(data.enrolledCount);
        }
      } catch (error) {
        console.error("Failed to get enrolled count:", error);
      }
    };

    if (course && course._id) {
      fetchEnrollmentCount();
    }
  }, [course]);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const data = await getEnrollment(user._id);

        const enrollment = data.enrollments.find(
          (e) => e.course._id === course._id
        );

        if (enrollment) {
          setIsEnrolled(true);
        }
      } catch (error) {
        console.error("Failed to check enrollment", error);
      }
    };

    if (user && user._id && course && course._id) {
      checkEnrollment();
    }
  }, [user, course]);

  const totalLessons = course.chapters.reduce(
    (sum, chapter) =>
      sum +
      chapter.lessons.filter((lesson) => lesson.published === "Published")
        .length,
    0
  );

  const totalMinutes = course.chapters.reduce((sum, chapter) => {
    return (
      sum +
      chapter.lessons.reduce((lessonSum, lesson) => {
        const value = Number(lesson.duration?.value || 0);
        const unit = lesson.duration?.unit || "mins";
        return lessonSum + (unit === "hrs" ? value * 60 : value);
      }, 0)
    );
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleStartCourse = async () => {
    try {
      // 1️⃣ Enroll the user
      const enrollData = {
        userId: user._id,
        courseId: course._id,
      };
      const enrollResponse = await enrollUser(enrollData);

      showSuccess(enrollResponse.message || "Enrolled successfully!");
      setIsEnrolled(true); // Update UI

      // 2️⃣ Initialize progress
      const progressData = {
        userId: user._id,
        course,
      };
      const progressResponse = await initCourseProgressAPI(progressData);
    } catch (error) {
      //console.error("Enrollment or progress failed:", error);
      showError(error.message || "Failed to start course");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourseAPI(course._id);
      showSuccess("Course deleted!");
      navigate("/courses"); // Redirect to courses list or another page after deletion
    } catch (error) {
      showError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete course."
      );
    }
  };

  return (
    <div className="w-full flex ">
      <div className="w-full xl:px-30 lg:px-20 md:px-10 px-5 py-8 shadow-lg bg-white">
        <div className="flex items-center gap-2 text-sm mb-4 text-secondary">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white">
            Course
          </span>
          <span>• {totalLessons} Lessons</span>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 text-primary">
              {course.title}
            </h1>
            <p className="mb-6 text-secondary line-clamp-3 min-h-[0.0rem] md:min-h-[4.5rem] max-w-full md:max-w-lg">
              {course.description || " "}
            </p>

            <div className="flex flex-col xl:flex-row xl:items-center gap-6">
              {/* Info Section */}
              <div className="flex flex-wrap gap-4 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {hours} hrs {minutes} mins
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-secondary" />
                  <span>{course.instructor}</span>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex gap-3">
                {user.role === "admin" ? (
                  <>
                    {enrolledCount === 0 && (
                      <button
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg text-sm bg-secondary text-white hover:bg-secondary/80 transition"
                        onClick={() =>
                          navigate("/courses/addcourse", {
                            state: { courseId: course._id },
                          })
                        }
                      >
                        Edit Course
                      </button>
                    )}

                    <button
                      className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg text-sm bg-secondary text-white hover:bg-secondary/80 transition"
                      onClick={handleDelete}
                    >
                      Delete Course
                    </button>
                  </>
                ) : (
                  <>
                    {!isEnrolled && (
                      <button
                        onClick={handleStartCourse}
                        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary/80 transition"
                      >
                        <Play className="w-4 h-4" />
                        Start Course
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <img
              src={`${API_BASE}/uploads/courses/${course.image}`}
              alt={course.title}
              className="w-48 h-48 md:w-56 md:h-56 xl:w-[360px] rounded-xl object-cover shadow"
            />
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleClose}
      />
      <ErrorModal
        isOpen={isErrorOpen}
        message={errorMessage}
        onClose={() => setIsErrorOpen(false)}
      />
    </div>
  );
};

export default Header;
