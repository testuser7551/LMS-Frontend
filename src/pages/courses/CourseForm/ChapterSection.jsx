import React, { useState, useEffect } from "react";
import {
  Video,
  Music,
  File,
  FileText,
  HelpCircle,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";

const lectureIcons = {
  Video: <Video className="w-5 h-5 text-primary" />,
  Audio: <Music className="w-5 h-5 text-primary" />,
  PDF: <File className="w-5 h-5 text-primary" />,
  Text: <FileText className="w-5 h-5 text-primary" />,
  Quiz: <HelpCircle className="w-5 h-5 text-primary" />,
};
import { ChevronDown, ChevronUp } from "lucide-react";
import ErrorModal from "../Components/ErrorModal";
import ConfirmModal from "../Components/ConfrimModal";

const ChapterSection = ({
  chapters,
  setCurrentChapterTitle,
  setShowLessonModal,
  addChapter,
  updateChapter,
  deleteChapter,
  setViewLesson,
  onDeleteLesson,
  editingLesson,
  setEditingLesson,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [savedOnce, setSavedOnce] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editChapterIndex, setEditChapterIndex] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorOpen(true);
  };

  const onEditLesson = (chapter, lesson) => {
    setCurrentChapterTitle(chapter.chapterTitle); // pass current chapter
    setEditingLesson(lesson); // set the lesson to edit
    setShowLessonModal(true); // open modal
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewChapterTitle("");
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setIsEditMode(true);
    setEditChapterIndex(index);
    setNewChapterTitle(chapters[index].chapterTitle);
    setIsModalOpen(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewChapterTitle("");
  };

  const handleCancel = () => {
    setChapterToDelete(null);
    setConfirmModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (!chapterToDelete) return;

    try {
      await deleteChapter(chapterToDelete);
    } catch (err) {
      console.error(err);
    } finally {
      setChapterToDelete(null);
      setConfirmModalOpen(false);
    }
  };

  const saveChapter = () => {
    if (!newChapterTitle.trim()) return showError("Chapter title required");

    if (isEditMode) {
      const index = editChapterIndex;
      updateChapter(index, newChapterTitle.trim());
    } else {
      addChapter(newChapterTitle.trim());
      // Don't set openIndex here because state updates asynchronously
    }

    setNewChapterTitle("");
    setIsModalOpen(false);
  };

  // Toggle open/close dropdown
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Open the first chapter when the page loads and chapters are present
  useEffect(() => {
    if (chapters.length > 0 && openIndex === null) {
      setOpenIndex(0);
    }
  }, [chapters]);

  // Open the last chapter when a new chapter is added
  useEffect(() => {
    if (!isEditMode && chapters.length > 0) {
      setOpenIndex(chapters.length - 1);
    }
  }, [chapters.length]);

  return (
    <div>
      <div className="w-full bg-white flex items-center justify-between">
        <h1 className="text-2xl font-outfit text-secondary ">Add Chapters</h1>
        <button
          onClick={openAddModal}
          className="bg-primary  hover:bg-secondary text-white px-6 py-2 rounded-lg  transition-colors cursor-pointer"
        >
          Add Chapter
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          {/* Light semi-transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-60 "></div>

          {/* Modal content */}
          <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 h-80 flex flex-col justify-between ">
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              &#x2715; {/* X icon */}
            </button>

            {/* Modal Body */}
            <div className="mt-6 space-y-2">
              <h2 className="text-2xl font-bold text-primary text-center mb-4">
                Add Chapter
              </h2>
              <label className="block mb-1 font-popins">Chapter Title *</label>

              {/* Input Field */}
              <input
                type="text"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter chapter title"
                value={newChapterTitle}
                onChange={(e) => {
                  setNewChapterTitle(e.target.value);
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-white transition bg-secondary hover:bg-primary cursor-pointer `}
                onClick={() => {
                  if (!newChapterTitle.trim())
                    return showError("Enter a chapter title");
                  saveChapter();
                  setSavedOnce(true);
                  closeModal();
                }}
              >
                Save Chapter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pb-10">
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="bg-gray-100 mt-4 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Chapter Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleDropdown(index)}
              >
                <div className="flex items-center gap-3">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">
                    ({chapter.lessons.length} lessons)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Edit Chapter"
                    >
                      <Edit className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        setChapterToDelete(chapters[index]._id);
                        setConfirmModalOpen(true);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dropdown Content */}
              {openIndex === index && (
                <div className="border-t border-gray-400 bg-gray-100 p-4 space-y-3">
                  {chapter.lessons.length > 0 ? (
                    <div className="space-y-2">
                      {chapter.lessons.map((lesson, li) => (
                        <div
                          key={li}
                          className="flex items-center justify-between bg-white rounded-lg p-3 cursor-pointer  transition-colors duration-200"
                        >
                          {/* Left: Icon, Title, Duration */}
                          <div className="flex items-center gap-3">
                            <div>
                              {lectureIcons[lesson.lectureType] || (
                                <FileText className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 truncate lg:w-60 md:w-50 w-20 whitespace-nowrap overflow-hidden">
                                {lesson.lessonName || "Untitled Lesson"}
                              </p>

                              {lesson.duration && lesson.duration.value && (
                                <p className="text-sm text-gray-600">
                                  {lesson.duration.value} {lesson.duration.unit}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right: Badge & Actions */}
                          <div className="flex items-center gap-4 ">
                            <span
                              className={`text-xs px-2 py-1 rounded-full hidden sm:block md:block lg:block xl:block ${
                                lesson.published
                                  ? "bg-green-100 text-primary"
                                  : "bg-gray-100 text-gray-500"
                              } `}
                            >
                              {lesson.published}
                            </span>
                            <div className="flex gap-2 text-gray-600">
                              <button
                                onClick={() => onEditLesson(chapter, lesson)}
                                className="hover:text-primary"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setViewLesson(lesson)}
                                className="hover:text-primary"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => onDeleteLesson(chapter, lesson)}
                                className="hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      No lessons added yet.
                    </p>
                  )}

                  {/* Add Lesson Button */}
                  <button
                    className="w-full cursor-pointer border border-primary border-dashed text-black hover:text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors duration-500 mt-3"
                    // className="w-full cursor-pointer border border-primary border-dashed text-black hover:text-white px-4 py-2 rounded-lg hover:bg-secondary transition mt-3"
                    onClick={() => {
                      setCurrentChapterTitle(chapter.chapterTitle);
                      setShowLessonModal(true);
                    }}
                  >
                    + Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No chapters added yet.</p>
        )}
      </div>
      <ErrorModal
        isOpen={isErrorOpen}
        message={errorMessage}
        onClose={() => setIsErrorOpen(false)}
      />
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter?"
        buttons={[
          {
            text: "Cancel",
            onClick: handleCancel,
            color: "bg-gray-200",
            textColor: "text-gray-700",
          },
          {
            text: "Delete",
            onClick: handleDeleteConfirmed,
            color: "bg-red-600",
          },
        ]}
        onClose={handleCancel}
      />
    </div>
  );
};

export default ChapterSection;
