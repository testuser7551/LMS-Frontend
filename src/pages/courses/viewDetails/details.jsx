import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchCourseByIdAPI } from "../../../api/courses/courses";
import { ArrowLeft, ChevronRight, ChevronDown } from "lucide-react";
import Progress from "./progress";
import Header from "./header";
import Lesson from "./lesson";
import { AuthContext } from "../../../context/AuthContext";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = location.state || {};
  const [course, setCourse] = useState(null);
  const [openChapter, setOpenChapter] = useState(0);
  const { user } = useContext(AuthContext);
  const [percentage, setPercentage] = useState(0);
  if (!courseId) return <div>No course selected.</div>;
  const [isEnrolled, setIsEnrolled] = useState(false);

  const fetchCourse = async () => {
    try {
      const data = await fetchCourseByIdAPI(courseId);
      setCourse(data);
    } catch (error) {
      //console.error("Failed to fetch course:", error.message);
      alert("Failed to load course details.");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  // Skeleton Loader component
  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="sticky top-0 mb-5 bg-white shadow-sm z-30 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-secondary/10 transition"
          title="Back to Courses"
        >
          <ArrowLeft className="w-6 h-6 text-primary" />
          <span className="font-medium text-primary hover:underline">
            Back to All Courses
          </span>
        </button>
      </div>

      <div className="lg:px-10 lg:py-10 xl:px-20 xl:py-10 md:px-10 md:py-5 sm:px-5 sm:py-3 px-5">
        <div className="bg-white pb-10">
          {course ? (
            <>
              <Header
                course={course}
                setIsEnrolled={setIsEnrolled}
                isEnrolled={isEnrolled}
              />
              {user.role === "student" && <Progress percentage={percentage} />}
              <div className="w-full xl:px-30 lg:px-15 md:px-10 px-5 mx-auto mt-6 space-y-4">
                <h2 className="text-xl font-semibold text-primary">Chapters</h2>
                {course.chapters.length > 0 ? (
                  course.chapters.map((chapter, chIndex) => (
                    <div
                      key={chIndex}
                      className="bg-[#E5E7EB] rounded-lg shadow-sm mb-4 border border-[#6B7280]/30"
                    >
                      <div
                        className="p-4 cursor-pointer flex justify-between items-center transition"
                        onClick={() =>
                          setOpenChapter(
                            openChapter === chIndex ? null : chIndex
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          {openChapter === chIndex ? (
                            <ChevronDown className="w-5 h-5 text-primary" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-primary" />
                          )}
                          <h3 className="font-medium text-primary">
                            {chapter.chapterTitle}
                          </h3>
                        </div>
                        <span className="text-sm text-secondary">
                          {chapter.lessons.length} Lessons
                        </span>
                      </div>

                      {openChapter === chIndex && (
                        <div className="animate-fadeIn p-5 ">
                          {chapter.lessons.map((lesson, lIndex) => (
                            // <Lesson
                            //   key={lIndex}
                            //   lesson={lesson}
                            //   number={lIndex + 1}
                            // />
                            <Lesson
                              key={lIndex}
                              lesson={{
                                ...lesson,
                                userId: user._id,
                                courseId: course._id,
                                chapterId: chapter._id,
                                course,
                              }}
                              number={lIndex + 1}
                              setPercentage={setPercentage}
                              isEnrolled={isEnrolled}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-secondary">No chapters available.</p>
                )}
              </div>
            </>
          ) : (
            <div className="mt-10">
              <Skeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
