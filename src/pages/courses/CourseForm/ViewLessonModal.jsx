import React, { useState } from "react";
import {
  Play,
  Eye,
  Download,
  HelpCircle,
  BookOpen,
  Video,
  Music,
  File,
  FileText,
  Clock,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const lectureIcons = {
  Video: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Audio: <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  PDF: <File className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Text: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Quiz: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
};

const ViewLessonModal = ({ open, onClose, lesson, chapterTitle }) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [activeTabs, setActiveTabs] = useState(() => {
    const tabs = {};
    lesson?.sections?.forEach((sec) => {
      if (sec.type === "Tab" && sec.contents.length > 0) {
        tabs[sec._id] = 0; // default first tab
      }
    });
    return tabs;
  });

  if (!open || !lesson) return null;

  const handleTabClick = (secId, index) => {
    setActiveTabs((prev) => ({ ...prev, [secId]: index }));
  };

  const handleDownload = async (file) => {
    if (!file) return;
    const confirmDownload = window.confirm(
      "Do you want to download this lesson?"
    );
    if (!confirmDownload) return;
    try {
      const response = await fetch(`${API_BASE}/uploads/courses/${file}`);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download the file.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lesson Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Lesson Basic Info */}
        <div className="mb-4">
          <p className="text-xl mb-2">
            <strong>Title:</strong> {lesson.lessonName}
          </p>
          <p className="text-xl mb-2">
            <strong>Description:</strong> {lesson.lessonDescription}
          </p>
          <p>
            <strong>Lecture Type:</strong> {lesson.lectureType}
          </p>
          <p>
            <strong>Duration:</strong> {lesson.duration?.value}{" "}
            {lesson.duration?.unit}
          </p>
          <p>
            <strong>Status:</strong> {lesson.published ? "Published" : "Draft"}
          </p>
        </div>

        {/* Lecture Type Sections */}
        {/* Video */}
        {lesson.lectureType === "Video" && lesson.file && (
          <video
            controls
            className="w-full aspect-video rounded-lg shadow-md mb-4"
          >
            <source
              src={`${API_BASE}/uploads/courses/${lesson.file}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Audio */}
        {lesson.lectureType === "Audio" && (
          <div className="mb-4">
            <button
              onClick={() => setShowAudioPlayer((prev) => !prev)}
              className="flex items-center gap-2 mb-2 text-secondary hover:opacity-80 transition"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              {showAudioPlayer ? "Hide Player" : "Play Audio"}
            </button>
            {showAudioPlayer && lesson.file && (
              <audio
                controls
                autoPlay
                className="w-full mt-2 rounded-lg shadow-md"
                src={`${API_BASE}/uploads/courses/${lesson.file}`}
              />
            )}
          </div>
        )}

        {/* PDF */}
        {lesson.lectureType === "PDF" && lesson.file && (
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => handleDownload(lesson.file)}
              className="flex items-center gap-2 text-secondary hover:opacity-80 transition"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" /> Download PDF
            </button>
            <button
              onClick={() =>
                window.open(`${API_BASE}/uploads/courses/${lesson.file}`, "_blank")
              }
              className="flex items-center gap-2 text-secondary hover:opacity-80 transition"
            >
              <Eye className="w-5 h-5 sm:w-6 sm:h-6" /> Preview PDF
            </button>
          </div>
        )}

        {/* Resource / URL */}
        {lesson.resourceURL && (
          <div className="mb-4">
            <strong>Resource URL:</strong>
            <p className="text-blue-600 break-words">{lesson.resourceURL}</p>
          </div>
        )}

        {/* Quiz */}
        {lesson.lectureType === "Quiz" && lesson.quiz?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Quiz Questions:</h3>
            {lesson.quiz.map((q, i) => (
              <div key={i} className="border p-3 rounded mb-2 bg-gray-50">
                <p>
                  <strong>Q{i + 1}:</strong> {q.question}
                </p>
                <p>
                  <strong>Type:</strong> {q.type}
                </p>
                {q.type === "Fill in the Blanks" && (
                  <p>
                    <strong>Answer:</strong> {q.answer}
                  </p>
                )}
                {q.type === "Multiple Choice" && (
                  <ul className="list-disc ml-5">
                    {q.options.map((opt, oi) => (
                      <li
                        key={oi}
                        className={
                          q.correctAnswer === opt
                            ? "text-green-600 font-semibold"
                            : ""
                        }
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {q.type === "True/False" && (
                  <p>
                    <strong>Correct Answer:</strong> {q.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text Sections */}
        {lesson.sections?.length > 0 && (
          <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-100">
            {lesson.sections.map((sec) => (
              <div
                key={sec._id}
                className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4"
              >
                {sec.type === "Normal" ? (
                  <div className="p-3 sm:p-4 rounded-lg bg-white shadow-lg hover:shadow-md transition-shadow mb-2">
                    <h3 className="font-semibold mb-2 text-primary text-base sm:text-lg md:text-xl">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      {sec.description}
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-500 bg-white shadow-sm hover:shadow-md transition-shadow mb-2">
                    {/* Tabs */}
                    <div className="flex flex-wrap border-b border-gray-200 bg-gray-100">
                      {sec.contents.map((tab, i) => (
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
                      {sec.contents.map(
                        (tab, i) =>
                          activeTabs[sec._id] === i && (
                            <p key={tab._id}>{tab.contentDescription}</p>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLessonModal;
