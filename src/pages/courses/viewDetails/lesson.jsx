import { useState, useContext, useEffect } from "react";
import {
  Clock,
  Video,
  Music,
  File,
  FileText,
  HelpCircle,
  Download,
  BookOpen,
  Play,
  Eye,
} from "lucide-react";
import {
  checkCourseCompleteAPI,
  getLessonProgressAPI,
  markLessonCompleteAPI,
  submitQuizAPI,
  fullProgress,
} from "../../../api/courses/progress";
const API_BASE = import.meta.env.VITE_API_BASE;
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import QuizPopup from "./quiz";
import ErrorModal from "../Components/ErrorModal";
import SuccessModal from "../Components/SuccessModal";

const lectureIcons = {
  Video: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Audio: <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  PDF: <File className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Text: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Quiz: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
};

const Lesson = ({ lesson, number, setPercentage , isEnrolled }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [quizPopupData, setQuizPopupData] = useState(null);

  const [activeTabs, setActiveTabs] = useState(() => {
    const tabs = {};
    lesson.sections?.forEach((sec) => {
      if (
        sec &&
        sec.type === "Tab" &&
        sec.contents &&
        sec.contents.length > 0
      ) {
        tabs[sec._id] = 0; // default first tab
      }
    });

    return tabs;
  });


  
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
  


  const handleTabClick = (secId, index) => {
    setActiveTabs((prev) => ({ ...prev, [secId]: index }));
  };



  useEffect(() => {
    const checkQuizStatus = async () => {
      try {
        const result = await getLessonProgressAPI(
          user._id,
          lesson.courseId,
          lesson.chapterId,
          lesson._id
        );

        if (result.completed) {
          setQuizCompleted(true);
          setIsCompleted(true);
        }
        const response = await fullProgress(user._id, lesson.courseId);
        const progressPercent = response.percentage;

        setPercentage(progressPercent);
      } catch (error) {
        console.error("Failed to check quiz status", error);
      }
    };
    if (user && user._id && lesson) {
      checkQuizStatus();
    }
  }, [user]);
  


  const handleStartQuiz = async () => {
    if (lesson.quiz && lesson.quiz.length > 0) {
      try {
        const result = await getLessonProgressAPI(
          user._id,
          lesson.courseId,
          lesson.chapterId,
          lesson._id
        );
        if (result.completed) {
          setQuizCompleted(true);
        }
        setQuizPopupData(lesson.quiz);
      } catch (error) {
        console.error("Error checking quiz status", error);
        showError("Failed to check quiz status.");
      }
    } else {
      showError("No quiz available for this lesson.");
    }
  };

  const handleDownload = async () => {
    if (!lesson.file) return;
    const confirmDownload = window.confirm(
      "Do you want to download this lesson?"
    );
    if (!confirmDownload) return;
    try {
      const response = await fetch(`${API_BASE}/uploads/courses/${lesson.file}`);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = lesson.file;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      ////console.error("Download failed:", error);
      showError("Failed to download the file.");
    }
  };

  const handleMarkComplete = async () => {
    try {
      const userId = lesson.userId;
      const courseId = lesson.courseId;
      const chapterId = lesson.chapterId;
      const lessonId = lesson._id;

      const response = await markLessonCompleteAPI(
        userId,
        courseId,
        chapterId,
        lessonId
      );
      const progress = response.progress;
      // Get all lessons from all chapters
      const allLessons = progress.chapters.flatMap(
        (chapter) => chapter.lessons
      );
      const totalLessons = allLessons.length;

      // Filter completed lessons
      const completedLessons = allLessons.filter(
        (lesson) => lesson.completed === true
      );
      const completedCount = completedLessons.length;

      // Calculate progress percentage
      const progressPercent =
        totalLessons === 0 ? 0 : (completedCount / totalLessons) * 100;

      const percentage = progressPercent;

      setPercentage(progressPercent);

      setIsCompleted(true);

      showSuccess("Lesson completed!");

      const completionResult = await checkCourseCompleteAPI(userId, courseId);
      const details = {
        userId,
        courseId,
        name: user.name, // from context or props
        course: lesson.course.title, // from props
        director: lesson.course.instructor || "Unknown Instructor",
        organizer: "Mr. Singh",
        organization: "LMS Academy",
        day: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        year: new Date().getFullYear(),
      };
      if (completionResult.courseCompleted) {
        showSuccess("Congratulations! You have completed the course.");

        navigate("/courses/certificate", {
          state: { details },
        });
      }
    } catch (error) {
      ////console.error("Failed to mark lesson complete:", error);
      showError(error.message || "Failed to mark lesson complete");
    }
  };

  const handleQuizSubmit = async (answers) => {
    try {
      const userId = lesson.userId;
      const courseId = lesson.courseId;
      const chapterId = lesson.chapterId;
      const lessonId = lesson._id;

      const response = await submitQuizAPI(
        userId,
        courseId,
        chapterId,
        lessonId,
        answers
      );
      const progress = response.progress;
      // Get all lessons from all chapters
      const allLessons = progress.chapters.flatMap(
        (chapter) => chapter.lessons
      );
      const totalLessons = allLessons.length;

      // Filter completed lessons
      const completedLessons = allLessons.filter(
        (lesson) => lesson.completed === true
      );
      const completedCount = completedLessons.length;

      // Calculate progress percentage
      const progressPercent =
        totalLessons === 0 ? 0 : (completedCount / totalLessons) * 100;
      const percentage = progressPercent;

      setPercentage(progressPercent);

      // Mark lesson as completed locally
      setIsCompleted(true);
      setQuizCompleted(true); // ensures Mark Complete button appears for non-quiz logic if needed
      showSuccess("Quiz submitted and lesson marked complete!");

      const completionResult = await checkCourseCompleteAPI(userId, courseId);
      const details = {
        userId,
        courseId,
        name: user.name, // from context or props
        course: lesson.course.title, // from props
        director: lesson.course.instructor || "Unknown Instructor",
        organizer: "Mr. Singh",
        organization: "LMS Academy",
        day: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        year: new Date().getFullYear(),
      };
      if (completionResult.courseCompleted) {
        showSuccess("Congratulations! You have completed the course.");

        navigate("/courses/certificate", {
          state: { details },
        });
      }
    } catch (error) {
      ////console.error("Failed to submit quiz:", error);
      showError(error.message || "Failed to submit quiz");
    }
  };

  return (
    // <div className="p-3 sm:p-4 md:p-6 rounded-lg bg-white mb-4 shadow-xl">
    <div className="p-3 sm:p-4 md:p-6 rounded-lg bg-white mb-4 border border-[#EAEAEA]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
        {/* Left side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-15 sm:h-15 flex items-center justify-center rounded-lg bg-[#E5E7EB]">
            {lectureIcons[lesson.lectureType] || (
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
            )}
          </div>
          <div>
            <span className="text-xs sm:text-sm font-medium block text-secondary">
              Lesson {number}
            </span>
            <h2 className="font-semibold mb-1 text-primary text-base md:w-40 lg:w-80 w-20 truncate sm:text-lg md:text-xl">
              {lesson.lessonName}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-secondary">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>
                {lesson.duration.value} {lesson.duration.unit}
              </span>
              <span>• {lesson.lectureType}</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Audio */}
          {lesson.lectureType === "Audio" && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="hover:opacity-80 transition text-secondary"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setShowAudioPlayer((prev) => !prev)}
                className="hover:opacity-80 transition text-secondary"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}

          {/* PDF */}
          {lesson.lectureType === "PDF" && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="hover:opacity-80 transition text-secondary"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() =>
                  window.open(
                    `${API_BASE}/uploads/courses/${lesson.file}`,
                    "_blank"
                  )
                }
                className="hover:opacity-80 transition text-secondary"
              >
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}

          {/* Quiz */}
          {lesson.lectureType === "Quiz" && user.role !== "admin" && (
            <button
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-lg cursor-pointer text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2 hover:bg-primary/80 transition"
              onClick={handleStartQuiz}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Quiz
            </button>
          )}

          {/* Mark Complete */}
          {user.role !== "admin" &&
            isEnrolled &&
            (lesson.lectureType === "Quiz" ? (
              quizCompleted && (
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleted}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base ${
                    isCompleted
                      ? "bg-secondary text-white cursor-not-allowed opacity-60"
                      : "bg-secondary text-white hover:bg-secondary/80"
                  } transition`}
                >
                  {isCompleted ? "Completed" : "Mark Complete"}
                </button>
              )
            ) : (
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base ${
                  isCompleted
                    ? "bg-secondary text-white cursor-not-allowed opacity-60"
                    : "bg-secondary text-white hover:bg-secondary/80"
                } transition`}
              >
                {isCompleted ? "Completed" : "Mark Complete"}
              </button>
            ))}
        </div>
      </div>

      {/* Video */}
      {lesson.lectureType === "Video" && lesson.file && (
        <video controls className="w-full aspect-video rounded-lg shadow-md">
          <source
            src={`${API_BASE}/uploads/courses/${lesson.file}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Audio */}
      {lesson.lectureType === "Audio" && showAudioPlayer && lesson.file && (
        <audio
          controls
          autoPlay
          className="w-full mt-3 rounded-lg shadow-md"
          src={`${API_BASE}/uploads/courses/${lesson.file}`}
        />
      )}
      {/* Text Sections */}
      {lesson.lectureType === "Text" && lesson.sections && (
        <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-100">
          {lesson.sections.map((sec) =>
            sec ? (
              <div
                key={sec._id}
                className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4"
              >
                {sec.type === "Normal" ? (
                  <div className="p-3 sm:p-4 rounded-lg bg-white shadow-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2 text-primary text-base sm:text-lg md:text-xl">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      {sec.description}
                    </p>
                  </div>
                ) : sec.type === "Tab" ? (
                  <div className="border border-gray-500 bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-200 bg-gray-100">
                      {sec.contents &&
                        sec.contents.map((tab, i) => (
                          <button
                            key={tab._id}
                            onClick={() => handleTabClick(sec._id, i)}
                            className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer ${
                              activeTabs[sec._id] === i
                                ? "bg-secondary text-white border-b-2 border-primary"
                                : "bg-gray-100 text-gray-500 hover:text-primary"
                            }`}
                          >
                            {i + 1}. {tab.contentTitle}
                          </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-2 sm:p-4 text-xs sm:text-sm md:text-base text-gray-700">
                      {sec.contents &&
                        sec.contents.map(
                          (tab, i) =>
                            activeTabs[sec._id] === i && (
                              <p key={tab._id}>{tab.contentDescription}</p>
                            )
                        )}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Quiz Popup */}
      {quizPopupData && (
        <QuizPopup
          quiz={quizPopupData}
          onClose={() => setQuizPopupData(null)}
          onQuizCompletestatus={() => setQuizCompleted(true)}
          onQuizComplete={handleQuizSubmit}
          quizCompleted={isCompleted}
        />
      )}
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

export default Lesson;
