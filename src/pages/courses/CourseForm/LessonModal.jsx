import React, { useState, useEffect , useRef} from "react";
import FileDropzone from "../Components/FileDropzone";
import {
  X,
  Video,
  FileText,
  File,
  Music,
  HelpCircle,
} from "lucide-react";
import CustomDropdown from "../Components/CustomDropdown";
import TextSections from "./TextSection";
import QuizSection from "./QuizSection";


const lectureTypes = [
  { type: "Video", icon: <Video className="w-5 h-5" /> },
  { type: "Audio", icon: <Music className="w-5 h-5" /> },
  { type: "PDF", icon: <File className="w-5 h-5" /> },
  { type: "Text", icon: <FileText className="w-5 h-5" /> },
  { type: "Quiz", icon: <HelpCircle className="w-5 h-5" /> },
];

const LessonModal = ({
  open,
  onClose,
  onSave,
  onUpdate,
  chapterTitle,
  editingLesson,
}) => {
  const [lesson, setLesson] = useState({
    lessonName: "",
    lessonDescription: "",
    lectureType: "Video",
    duration: { value: "", unit: "mins" },
    file: null,
    resourceURL: "",
    quiz: [],
    sections: [],
    published: "Draft", // Added published status
  });

  const quizQuestionTypes = [
    "Fill in the Blanks",
    "Multiple Choice",
    "True/False",
  ];

  const [quizQuestion, setQuizQuestion] = useState({
    type: "Fill in the Blanks",
    question: "",
    answer: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [textSection, setTextSection] = useState({
    type: "Normal",
    title: "",
    description: "",
    contents: [],
    contentTitle: "",
    contentDescription: "",
  });

  useEffect(() => {
    if (open && editingLesson) {
      setLesson({ ...editingLesson });
    } else if (!open) {
      setLesson({
        lessonName: "",
        lessonDescription: "",
        lectureType: "Video",
        duration: { value: "", unit: "mins" },
        file: null,
        resourceURL: "",
        quiz: [],
        sections: [],
        published: "Draft",
      });
      setQuizQuestion({
        type: "Fill in the Blanks",
        question: "",
        answer: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      setTextSection({
        title: "",
        description: "",
        contents: [],
        contentTitle: "",
        contentDescription: "",
      });
    }
  }, [open]);

  const [error, setError] = useState("");

  const quizSectionRef = useRef();
  if (!open) return null;

  const saveLesson = () => {
    if (!lesson.lessonName.trim()) return alert("Lesson name required");
    if (!lesson.lessonDescription.trim()) return alert("Lesson  Description name required");
    if (!lesson.lectureType) return alert("Lecture type required");
    if (lesson.lectureType === "Video") {
      if (!lesson.file && !lesson.resourceURL.trim()) {
        return alert("Either file or resource URL is required for Video");
      }
    } else if (lesson.lectureType === "PDF") {
      if (!lesson.file) {
        return alert("File is required for PDF");
      }
    } else if (lesson.lectureType === "Audio") {
      if (!lesson.file) {
        return alert("File is required for Audio");
      }
    }    
    if (lesson.lectureType === "Quiz") {
      const error = quizSectionRef.current.validateQuestions();
      if (error) {
        alert(error);
        return;
      }
    }
    if (lesson.lectureType === "Text" && lesson.sections.length === 0)
      return alert("Add at least one text section");
    // onSave(lesson);
    if (editingLesson?._id) {
      // Existing lesson → update
      onUpdate({ ...lesson, _id: editingLesson._id });
    } else {
      // New lesson → add
      onSave(lesson);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl  z-50 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 top-0 sticky z-10 bg-white">
          <h3 className="text-2xl font-bold text-primary p-6">Add Lesson</h3>
          <button
            className="text-gray-600 hover:text-gray-800 p-4 transition cursor-pointer"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div className="px-6 pb-10">
          {/* Chapter Info */}

          <div>
            <label className="block text-sm font-popins mb-1">Chapter</label>
            <input
              className="border-1 border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2"
              value={chapterTitle}
              disabled
            />
          </div>
          {/* Lesson Title */}
          <div>
            <label className="block text-sm font-popins mb-1">
              Lesson Title <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={lesson.lessonName}
              placeholder="Lesson Title"
              onChange={(e) =>
                setLesson({ ...lesson, lessonName: e.target.value })
              }
            />
          </div>
          {/* Lesson Description */}
          <div>
            <label className="block text-sm font-popins mb-1">
              Lesson Description <span className="text-red-500 text-xl">*</span>
            </label>
            <textarea
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={lesson.lessonDescription}
              placeholder="Lesson Description"
              onChange={(e) =>
                setLesson({ ...lesson, lessonDescription: e.target.value })
              }
            />
          </div>
          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-popins mb-2">
              Duration <span className="text-red-500 text-xl">*</span>
            </label>
            <div className="flex gap-4 items-start">
              {/* Duration Value Input */}
              <div className="w-2/3">
                <input
                  value={lesson.duration.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*$/.test(val)) {
                      let max = lesson.duration.unit === "mins" ? 60 : 24;
                      if (val === "" || parseInt(val) <= max) {
                        setLesson({
                          ...lesson,
                          duration: { ...lesson.duration, value: val },
                        });
                        setError("");
                      } else {
                        setError(
                          `Maximum allowed  ${max} ${lesson.duration.unit}`
                        );
                      }
                    }
                  }}
                  placeholder="Enter duration"
                  className="border border-gray-300 p-2 h-11 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {/* Duration Unit Dropdown */}
              <div className="w-1/3 -mt-8">
                <CustomDropdown
                  label="Unit"
                  value={lesson.duration.unit}
                  onChange={(val) =>
                    setLesson({
                      ...lesson,
                      duration: { ...lesson.duration, unit: val },
                    })
                  }
                  options={[
                    { _id: "1", categoryName: "mins" },
                    { _id: "2", categoryName: "hrs" },
                  ]}
                  width="w-full"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Lecture Type */}
          <div>
            <label className="block text-sm font-popins mb-1">
              Lecture Type <span className="text-red-500 text-xl">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2 ">
              {lectureTypes.map((lt) => (
                <div
                  key={lt.type}
                  onClick={() =>
                    setLesson({
                      ...lesson,
                      lectureType: lt.type,
                      file: null,
                      resourceURL: "",
                      quiz: [],
                      sections: [],
                    })
                  }
                  className={`flex flex-col items-center justify-center cursor-pointer border rounded-2xl p-4 transition ${
                    lesson.lectureType === lt.type
                      ? "bg-primary text-white scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="text-3xl mb-2">{lt.icon}</div>
                  <span className="font-semibold">{lt.type}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Resource URL and File Upload for Video */}
          {lesson.lectureType === "Video" && (
            <div>
              <label className="block text-sm font-popins mt-2 mb-1">
                Resource URL (Optional)
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                value={lesson.resourceURL}
                onChange={(e) =>
                  setLesson({ ...lesson, resourceURL: e.target.value })
                }
              />
              <label className="block text-sm font-popins mt-2 mb-1">
                Upload File (Optional)
              </label>
              <FileDropzone
                file={lesson.file}
                setFile={(f) => setLesson({ ...lesson, file: f })}
                accept="video/*"
              />
              <p className="text-xs text-gray-500 mt-1">
                At least one of Resource URL or File is required.
              </p>
            </div>
          )}
          {/* File Upload for PDF or Audio */}
          {["PDF", "Audio"].includes(lesson.lectureType) && (
            <div>
              <label className="block text-sm font-popins mt-2 mb-1">
                Upload File *
              </label>
              <FileDropzone
                file={lesson.file}
                setFile={(f) => setLesson({ ...lesson, file: f })}
                accept={lesson.lectureType === "PDF" ? ".pdf" : "audio/*"}
              />
            </div>
          )}

          {lesson.lectureType === "Quiz" && (
            <QuizSection
              ref={quizSectionRef}
              lesson={lesson}
              setLesson={setLesson}
            />
          )}

          {/* Text Sections */}
          {lesson.lectureType === "Text" && (
            <TextSections lesson={lesson} setLesson={setLesson} />
          )}

          {/* Published Status */}
          <div className="flex justify-between items-center mt-4">
            <label className="text-gray-600 font-medium">
              Published Status
            </label>

            <div className="flex items-center gap-3">
              {/* Status Text */}
              <span
                className={`font-medium ${
                  lesson.published === "Published"
                    ? "text-primary"
                    : "text-gray-700"
                }`}
              >
                {lesson.published}
              </span>
              {/* Toggle Switch */}
              <button
                onClick={() =>
                  setLesson({
                    ...lesson,
                    published:
                      lesson.published === "Draft" ? "Published" : "Draft",
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
                  lesson.published === "Published"
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    lesson.published === "Published"
                      ? "translate-x-7"
                      : "translate-x-0"
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white px-4 py-1 rounded hover:bg-secondary transition cursor-pointer"
              onClick={saveLesson}
            >
              Save Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;