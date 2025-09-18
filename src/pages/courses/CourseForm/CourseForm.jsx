import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { fetchCategories } from "../../../api/courses/category";
import { useNavigate } from "react-router-dom";
import { Play, FileText, File, HelpCircle } from "lucide-react";
import {
  saveCourseDetailsAPI,
  saveChapterAPI,
  saveLessonAPI,
  updateCourseDetailsAPI,
  updateChapterAPI,
  deleteChapterAPI,
  deleteLessonAPI,
  updateLessonAPI,
  fetchCourseByIdAPI,
  publishFullCourse,
  getEnrolledCourseCountAPI,
} from "../../../api/courses/courses";
import FileDropzone from "../Components/FileDropzone";
import ChapterSection from "./ChapterSection";
import LessonModal from "./LessonModal";
import CustomDropdown from "../Components/CustomDropdown";
import SuccessModal from "../Components/SuccessModal";
import ErrorModal from "../Components/ErrorModal";

import Testing from "../Testing/Testing";
import { useLocation } from "react-router-dom";
import ViewLessonModal from "./ViewLessonModal";
import ConfirmModal from "../Components/ConfrimModal";
const API_BASE = import.meta.env.VITE_API_BASE;

const CourseForm = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    level: "",
    instructor: "",
    tags: [],
    tagsInput: "",
    image: null,
    category: "",
    chapters: [],
  });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});

  const [savedCourse, setSavedCourse] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [currentChapterTitle, setCurrentChapterTitle] = useState("");
  const [backendcoursedata, setbackendcoursedata] = useState(null);
  const navigate = useNavigate();
  const [viewLesson, setViewLesson] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    const getCourse = async () => {
      if (!courseId) return; // If no courseId, do nothing

      try {
        const data2 = await getEnrolledCourseCountAPI(courseId);
        if (data2.success) {
          setEnrolledCount(data2.enrolledCount);
        }

        const data = await fetchCourseByIdAPI(courseId);

        // Set the fetched data to state
        setCourse({
          title: data.title || "",
          description: data.description || "",
          level: data.level || "",
          instructor: data.instructor || "",
          tags: data.tags || [],
          tagsInput: (data.tags || []).map((tag) => `#${tag}`).join(" "),
          image: data.image || null,
          category: data.category || "",
          chapters: data.chapters || [],
        });
        setbackendcoursedata(data); // optionally store full backend data
      } catch (error) {
        console.error("Error fetching course:", error);
        // optionally show an error message to user
      }
    };

    getCourse();
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      setSavedCourse(true);
    }
  }, [courseId]);

  const handleTagsInput = (input) => {
    setCourse((prev) => ({
      ...prev,
      tagsInput: input,
      tags: input
        .split(/[\s,]+/) // split by space or comma
        .map((tag) => tag.replace(/^#/, "").trim()) // remove # if any
        .filter((tag) => tag.length > 0),
    }));
  };

  const openConfirmModal = (message, action) => {
    setConfirmMessage(message);
    setOnConfirmAction(() => action);
    setConfirmModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showSuccess = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!course.category) newErrors.category = "Category is required";
    if (!course.title.trim()) newErrors.title = "Title is required";
    if (!course.description.trim())
      newErrors.description = "Description is required";
    if (!course.level) newErrors.level = "Level is required";
    if (!course.instructor.trim())
      newErrors.instructor = "Instructor is required";
    if (!course.tags || course.tags.length === 0) {
      newErrors.tags = "Tags are required";
    }

    // if (!course.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // General function to handle input changes and clear errors
  const handleFieldChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Save Course Details
  const saveCourseDetails = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", course.category);
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("level", course.level);
    formData.append("instructor", course.instructor);
    formData.append("tags", JSON.stringify(course.tags));
    formData.append("image", course.image);
    formData.append("chapters", JSON.stringify(course.chapters));

    try {
      if (validate()) {
        let result;
        if (courseId) {
          // Edit mode
          if (enrolledCount > 0) {
            showError(
              "This course cannot be updated because students are already enrolled."
            );
          } else {
            result = await updateCourseDetailsAPI(courseId, formData);
            showSuccess("Course updated successfully!");
          }
        } else {
          // Create mode
          result = await saveCourseDetailsAPI(formData);
          showSuccess("Course saved successfully!");
        }

        setbackendcoursedata(result.course);
        setSavedCourse(true);
        setTab(1);
      }
    } catch (error) {
      console.error("Failed to save/update course:", error);
      showError("Error saving or updating course");
    }
  };

  // Add Chapter
  const addChapter = async (title) => {
    if (!title.trim()) return showError("Chapter title required");
    let chapterTitle = title;

    // Get the saved course data
    if (!backendcoursedata?._id) return showError("Course not saved yet");
    const courseId = backendcoursedata._id;

    try {
      if (enrolledCount > 0) {
        showError(
          "This course cannot be updated because students are already enrolled."
        );
      } else {
        const saved = await saveChapterAPI(courseId, chapterTitle); // assuming course._id is available
        if (saved.success) {
          // Update local course state
          // setCourse((prevCourse) => ({
          //   ...prevCourse,
          //   chapters: [...prevCourse.chapters, saved.chapter], // Use saved.chapter from API response
          // }));

          setCourse((prevCourse) => {
            const updatedChapters = [...prevCourse.chapters, saved.chapter];
            setOpenIndex(updatedChapters.length - 1);
            return {
              ...prevCourse,
              chapters: updatedChapters,
            };
          });

          // Also update backendcoursedata state
          setbackendcoursedata((prevBackendCourse) => ({
            ...prevBackendCourse,
            chapters: [...prevBackendCourse.chapters, saved.chapter], // Add to backend data
          }));
        }
        showSuccess("Chapter added successfully!");
      }
    } catch (error) {
      showError("Failed to add chapter");
    }
  };
  const updateChapter = async (index, newTitle) => {
    if (!newTitle.trim()) return showError("Chapter title required");

    if (!backendcoursedata?._id) return showError("Course not saved yet");
    const courseId = backendcoursedata._id;
    const chapterId = backendcoursedata.chapters[index]._id;

    try {
      if (enrolledCount > 0) {
        showError(
          "This course cannot be updated because students are already enrolled."
        );
      } else {
        const response = await updateChapterAPI(courseId, chapterId, newTitle); // call API
        if (response.success) {
          // Update course state
          setCourse((prevCourse) => {
            const updatedChapters = [...prevCourse.chapters];
            updatedChapters[index].chapterTitle = newTitle;
            return { ...prevCourse, chapters: updatedChapters };
          });

          // Update backend course state
          setbackendcoursedata((prevBackendCourse) => {
            const updatedChapters = [...prevBackendCourse.chapters];
            updatedChapters[index].chapterTitle = newTitle;
            return { ...prevBackendCourse, chapters: updatedChapters };
          });

          showSuccess("Chapter updated successfully!");
        }
      }
    } catch (error) {
      showError("Failed to update chapter");
    }
  };
  const deleteChapter = async (chapterId) => {
    if (!backendcoursedata?._id) return showError("Course not saved yet");
    const courseId = backendcoursedata._id;

    const course = backendcoursedata;
    // 1. Only proceed with confirmation if course is Published
    // if (course.coursepublished === "Published") {
    //   // 2. Get all lessons across the course
    //   const allLessons = course.chapters.flatMap((ch) => ch.lessons);

    //   // 3. Get all published lessons in the course
    //   const publishedLessons = allLessons.filter(
    //     (lesson) => lesson.published === "Published"
    //   );

    //   // 4. Find the chapter to be deleted
    //   const chapterToDelete = course.chapters.find(
    //     (ch) => ch._id === chapterId
    //   );
    //   if (!chapterToDelete) return showError("Chapter not found");

    //   // 5. Get published lessons in this chapter
    //   const publishedInChapter = chapterToDelete.lessons.filter(
    //     (lesson) => lesson.published === "Published"
    //   );

    // 6. If all published lessons are in this chapter → show confirmation
    // if (
    //   publishedLessons.length > 0 &&
    //   publishedLessons.length === publishedInChapter.length
    // ) {
    //   const confirmDelete = window.confirm(
    //     "Deleting this chapter will set the course to Draft. Do you want to proceed?"
    //   );
    //   if (!confirmDelete) return;
    // }
    // }
    try {
      if (enrolledCount > 0) {
        showError(
          "This course cannot be updated because students are already enrolled."
        );
      } else if (course.coursepublished === "Published") {
        // 2. Get all lessons across the course
        const allLessons = course.chapters.flatMap((ch) => ch.lessons);

        // 3. Get all published lessons in the course
        const publishedLessons = allLessons.filter(
          (lesson) => lesson.published === "Published"
        );

        // 4. Find the chapter to be deleted
        const chapterToDelete = course.chapters.find(
          (ch) => ch._id === chapterId
        );
        if (!chapterToDelete) return showError("Chapter not found");

        // 5. Get published lessons in this chapter
        const publishedInChapter = chapterToDelete.lessons.filter(
          (lesson) => lesson.published === "Published"
        );
        if (
          publishedLessons.length > 0 &&
          publishedLessons.length === publishedInChapter.length
        ) {
          openConfirmModal(
            "Deleting this chapter will set the course to Draft. Do you want to proceed?",
            async () => {
              const response = await deleteChapterAPI(courseId, chapterId);
              if (response.success) {
                // Remove the chapter from backendcoursedata state
                setbackendcoursedata((prevBackendCourse) => ({
                  ...prevBackendCourse,
                  chapters: prevBackendCourse.chapters.filter(
                    (chapter) => chapter._id !== chapterId
                  ),
                }));

                // Also update main course state if needed
                setCourse((prevCourse) => ({
                  ...prevCourse,
                  chapters: prevCourse.chapters.filter(
                    (chapter) => chapter._id !== chapterId
                  ),
                }));

                showSuccess("Chapter deleted successfully!");
              } else {
                showError("Failed to delete chapter.");
              }
            }
          );
          return;
        }
      } else {
        const response = await deleteChapterAPI(courseId, chapterId);
        if (response.success) {
          // Remove the chapter from backendcoursedata state
          setbackendcoursedata((prevBackendCourse) => ({
            ...prevBackendCourse,
            chapters: prevBackendCourse.chapters.filter(
              (chapter) => chapter._id !== chapterId
            ),
          }));

          // Also update main course state if needed
          setCourse((prevCourse) => ({
            ...prevCourse,
            chapters: prevCourse.chapters.filter(
              (chapter) => chapter._id !== chapterId
            ),
          }));

          showSuccess("Chapter deleted successfully!");
        } else {
          showError("Failed to delete chapter.");
        }
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
      showError("An error occurred while deleting the chapter.");
    }
  };

  // Add Lesson
  const addLessonToChapter = async (lesson) => {
    try {
      const chapter = course.chapters.find(
        (ch) => ch.chapterTitle === currentChapterTitle
      );
      if (!chapter) return showError("Chapter not found");

      if (!backendcoursedata?._id) return showError("Course not saved yet");
      const courseId = backendcoursedata._id;

      const backendChapter = backendcoursedata.chapters.find(
        (ch) => ch.chapterTitle === currentChapterTitle
      );
      if (!backendChapter) return showError("Backend chapter not found");
      const chapterId = backendChapter._id;

      if (enrolledCount > 0) {
        showError(
          "This course cannot be updated because students are already enrolled."
        );
      } else {
        // Save the lesson via API
        const saved = await saveLessonAPI(courseId, chapterId, lesson);

        if (!saved || !saved.lesson) {
          return showError("Invalid response from server");
        }

        const newLesson = saved.lesson;

        const updated = course.chapters.map((ch) =>
          ch._id === chapter._id
            ? { ...ch, lessons: [...(ch.lessons || []), newLesson] }
            : ch
        );

        setCourse({ ...course, chapters: updated });

        showSuccess("Lesson added successfully!");
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
      showError("Failed to add lesson");
    }
  };

  const updateLessonInChapter = async (lesson) => {
    try {
      const allLessons = course.chapters.flatMap((ch) => ch.lessons);

      // Find how many are published
      const publishedLessons = allLessons.filter(
        (l) => l.published === "Published"
      );

      // Decide if confirm modal is needed
      const requiresConfirm =
        publishedLessons.length === 1 &&
        lesson.published === "Draft" &&
        publishedLessons[0]._id === lesson._id;

      const proceedUpdate = async () => {
        const chapter = course.chapters.find(
          (ch) => ch.chapterTitle === currentChapterTitle
        );
        if (!chapter) return showError("Chapter not found");

        if (!backendcoursedata?._id) return showError("Course not saved yet");
        const courseId = backendcoursedata._id;

        const backendChapter = backendcoursedata.chapters.find(
          (ch) => ch.chapterTitle === currentChapterTitle
        );
        if (!backendChapter) return showError("Backend chapter not found");
        const chapterId = backendChapter._id;

        if (lesson._id) {
          if (enrolledCount > 0) {
            showError(
              "This course cannot be updated because students are already enrolled."
            );
            return;
          }

          // Existing lesson → update
          const updated = await updateLessonAPI(
            courseId,
            chapterId,
            lesson._id,
            lesson
          );

          if (updated.success) {
            const updatedLesson = updated.lesson;

            // Update lessons in state
            const updatedChapters = course.chapters.map((ch) =>
              ch._id === chapter._id
                ? {
                    ...ch,
                    lessons: ch.lessons.map((l) =>
                      l._id === updatedLesson._id ? updatedLesson : l
                    ),
                  }
                : ch
            );

            setCourse({ ...course, chapters: updatedChapters });
            showSuccess("Lesson updated successfully!");
          } else {
            showError("Failed to update lesson.");
          }
        } else {
          // New lesson → add
          await addLessonToChapter(lesson);
        }
      };

      if (requiresConfirm) {
        openConfirmModal(
          "This is the only published lesson. Unpublishing it will set the course to Draft. Do you want to proceed?",
          proceedUpdate
        );
      } else {
        await proceedUpdate(); // ✅ run normally
      }
    } catch (err) {
      showError("Failed to save lesson");
    }
  };

  const deleteLesson = async (chapter, lesson) => {
    try {
      const allLessons = course.chapters.flatMap((ch) => ch.lessons);

      // Find how many are published
      const publishedLessons = allLessons.filter(
        (l) => l.published === "Published"
      );

      // Decide confirmation message
      let confirmMessage = "Are you sure you want to delete this lesson?";
      if (
        publishedLessons.length === 1 &&
        publishedLessons[0]._id === lesson._id
      ) {
        confirmMessage =
          "This is the only published lesson. Unpublishing/deleting it will set the course to Draft. Do you want to proceed?";
      }

      // Open modal and handle delete if confirmed
      openConfirmModal(confirmMessage, async () => {
        if (enrolledCount > 0) {
          showError(
            "This course cannot be deleted because students are already enrolled."
          );
          return;
        }

        const resp = await deleteLessonAPI(
          backendcoursedata._id,
          chapter._id,
          lesson._id
        );

        if (resp.success) {
          // Update frontend state
          const updatedChapters = course.chapters.map((ch) =>
            ch._id === chapter._id
              ? {
                  ...ch,
                  lessons: ch.lessons.filter((l) => l._id !== lesson._id),
                }
              : ch
          );

          setCourse({ ...course, chapters: updatedChapters });
          showSuccess("Lesson deleted successfully!");
        } else {
          showError("Failed to delete lesson.");
        }
      });
    } catch (error) {
      showError("Failed to delete lesson.");
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      setMessage("");
      if (!backendcoursedata?._id)
        return showError("Create Course and then Publish!");
      const courseId = backendcoursedata._id;

      const data = await publishFullCourse(courseId);
      if (data.success) {
        showSuccess(data.message || "Course published successfully!");
      } else {
        showError(data.message || "Failed to publish course.");
      }
    } catch (error) {
      setMessage("An error occurred while publishing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Header */}
      <div className="flex items-center justify-between sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-30 shadow-sm">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          title="Back to Courses"
        >
          <ArrowLeft className="w-6 h-6 text-red-700" />
          <span className="font-medium text-red-700 hover:underline">
            Back to All Courses
          </span>
        </button>
      </div>
      <div className="bg-gray-100 min-h-screen pt-6 md:pt-10 xl:px-10 ">
        <div className="max-w-8xl mx-auto px-4 md:px-5 lg:px-10 border-b border-gray-100">
          <div className="w-full bg-white p-6 md:p-8 rounded-t-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">Add Course</h1>
            <div>
              <button
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-primary cursor-pointer transition-colors duration-200"
                onClick={handlePublish}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Full Course"}
              </button>
              {message && (
                <p className="mt-2 text-sm text-green-600">{message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 px-4 md:px-5 lg:px-10">
          {/* Left - Tabs and Form */}
          <div className="md:col-span-2 bg-white rounded-b-2xl shadow-sm overflow-hidden ">
            <div className="flex space-x-2  p-4">
              {["1. Course Details", "2. Chapters & Lessons"].map(
                (label, idx) => (
                  <button
                    key={idx}
                    className={`px-5 py-3 font-medium  transition-all duration-200 border-b border-gray-200 cursor-pointer ${
                      tab === idx
                        ? " text-primary border-b border-primary "
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      idx === 1 && !savedCourse && !courseId
                        ? null
                        : setTab(idx)
                    }
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            <div className="p-6">
              {tab === 0 && (
                <div className="space-y-6 xl:px-9 lg:px-5 md:px-2">
                  <div>
                    <CustomDropdown
                      label="Category"
                      options={categories} // [{_id, categoryName}]
                      value={course.category}
                      onChange={(val) => handleFieldChange("category", val)}
                      width="w-full"
                      getOptionLabel={(opt) => opt.categoryName}
                      getOptionValue={(opt) => opt.categoryName}
                      placeholder="Select Category"
                    />
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      value={course.title}
                      onChange={(e) =>
                        handleFieldChange("title", e.target.value)
                      }
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Description *
                    </label>
                    <textarea
                      className="border border-gray-300 p-3 rounded-lg w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      value={course.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <CustomDropdown
                      label="Level"
                      value={course.level}
                      onChange={(val) => handleFieldChange("level", val)}
                      options={[
                        { _id: "1", categoryName: "Beginner" },
                        { _id: "2", categoryName: "Intermediate" },
                        { _id: "3", categoryName: "Advanced" },
                      ]}
                      width="w-full"
                    />
                    {errors.level && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.level}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Instructor
                    </label>
                    <input
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      value={course.instructor}
                      onChange={(e) =>
                        handleFieldChange("instructor", e.target.value)
                      }
                    />
                    {errors.instructor && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.instructor}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      value={course.tagsInput} // temporary input field value
                      onChange={(e) => handleTagsInput(e.target.value)}
                      placeholder="Type tags separated by # or ,"
                    />
                    {errors.tags && (
                      <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <FileDropzone
                      file={course.image}
                      setFile={(file) => handleFieldChange("image", file)}
                      accept="image/*"
                    />
                    {/* {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )} */}
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondarybgcolor hover:text-primary cursor-pointer transition-colors duration-200"
                      onClick={saveCourseDetails}
                    >
                      Save & Next
                    </button>
                  </div>
                </div>
              )}

              {tab === 1 && (
                <div className="space-y-4 lg:px-9 ">
                  <ChapterSection
                    chapters={course.chapters}
                    setCurrentChapterTitle={setCurrentChapterTitle}
                    setShowLessonModal={setShowLessonModal}
                    addChapter={addChapter}
                    updateChapter={updateChapter}
                    deleteChapter={deleteChapter}
                    setViewLesson={setViewLesson}
                    onDeleteLesson={deleteLesson}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                    editingLesson={editingLesson} // <-- pass it down
                    setEditingLesson={setEditingLesson} // <-- also pass the setter
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right - Preview Panel */}
          <div className="bg-white lg:px-9 md:px-9 xl:px-5 px-9 py-4 overflow-y-auto max-h-[100vh] sticky top-16">
            <h2 className="font-semibold text-xl text-primary mb-4">
              Course Preview
            </h2>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                {course.image ? (
                  <img
                    src={
                      course.image
                        ? typeof course.image === "object"
                          ? URL.createObjectURL(course.image) // File object
                          : `${API_BASE}/uploads/courses/${course.image}` // URL string from backend
                        : "fallback-image-url.jpg" // optional fallback
                    }
                    alt={course.title}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
                {course.category && (
                  <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs shadow">
                    {course.category}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-primary truncate">
                  {course.title || "Untitled Course"}
                </h3>
                <p className="text-sm text-primary line-clamp-3 break-words">
                  {course.description || "No description provided."}
                </p>

                <div className="grid grid-cols-1 gap-2 text-sm text-primary mt-3">
                  <p className="truncate">
                    <strong>Instructor:</strong> {course.instructor || "-"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {course.tags && course.tags.length > 0 ? (
                      course.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                        >
                          #{tag} {/* Add # before each tag */}
                        </span>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </div>

                  <p>
                    <strong>Level:</strong> {course.level || "-"}
                  </p>
                  <p>
                    <strong>Chapters:</strong> {course.chapters.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Modal */}
      {/* {showLessonModal && (
        <LessonModal
          open={showLessonModal}
          onClose={() => setShowLessonModal(false)}
          onSave={addLessonToChapter}
          chapterTitle={currentChapterTitle}
        />
      )} */}
      {showLessonModal && (
        <LessonModal
          open={showLessonModal}
          onClose={() => {
            setShowLessonModal(false);
            setEditingLesson(null); // reset after closing
          }}
          onSave={addLessonToChapter} // your save function
          onUpdate={updateLessonInChapter}
          chapterTitle={currentChapterTitle}
          editingLesson={editingLesson} // pass the lesson to edit
        />
      )}

      <ViewLessonModal
        open={!!viewLesson}
        onClose={() => setViewLesson(null)}
        lesson={viewLesson}
        chapterTitle={currentChapterTitle}
      />

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
      {/* <Testing /> */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Confirm Action"
        message={confirmMessage}
        buttons={[
          {
            text: "Cancel",
            onClick: () => setConfirmModalOpen(false),
            color: "bg-gray-200",
            textColor: "text-gray-700",
          },
          {
            text: "Confirm",
            onClick: () => {
              onConfirmAction(); // run the passed function
              setConfirmModalOpen(false);
            },
            color: "bg-red-600",
          },
        ]}
        onClose={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};

export default CourseForm;
