import React, { useState, useEffect, useContext, useMemo } from "react";
import { Search, Play, Clock, X } from "lucide-react";
import CategoryForm from "./CategoryForm";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import { AuthContext } from "../../context/AuthContext";

import { fetchCoursesAPI } from "../../api/courses/courses";
import { getEnrollment } from "../../api/courses/enroll";
import { fetchCategories } from "../../api/courses/category";

const API_BASE = import.meta.env.VITE_API_BASE;

const Courses = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]); // array of enrollments
  const [selectedTab, setSelectedTab] = useState("all");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);

  // Separate state for each tab's filters
  const [allSearch, setAllSearch] = useState("");
  const [allCategory, setAllCategory] = useState("All Sports");

  const [mySearch, setMySearch] = useState("");
  const [myCategory, setMyCategory] = useState("All Sports");

  const [certificatesSearch, setCertificatesSearch] = useState("");
  const [certificatesCategory, setCertificatesCategory] =
    useState("All Sports");

  const [pendingSearch, setPendingSearch] = useState("");
  const [pendingCategory, setPendingCategory] = useState("All Sports");

  // Fetch courses once
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await fetchCoursesAPI();
        setAllCourses(coursesData);
      } catch {
        alert("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  // Load categories once
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const dbCategories = data.categories || [];
        const allCategories = [
          { categoryName: "All Sports", _id: "all" },
          ...dbCategories.map((cat) => ({
            categoryName: cat.categoryName,
            _id: cat._id,
          })),
        ];
        setCategories(allCategories);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  // Load enrollments once
  useEffect(() => {
    if (user && user._id) {
      const loadEnrollment = async () => {
        try {
          const data = await getEnrollment(user._id);
          setEnrollments(data.enrollments || []);
        } catch (err) {
          console.log(err);
        }
      };
      loadEnrollment();
    }
  }, [user]);

  // Precompute total lessons and duration for each course
  const processedCourses = useMemo(() => {
    return allCourses.map((course) => {
      const totalLessons = course.chapters.reduce(
        (sum, chapter) =>
          sum +
          chapter.lessons.filter((lesson) => lesson.published === "Published")
            .length,
        0
      );
      const totalMinutes = course.chapters.reduce(
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

  const enrolledCourseIds =
    Array.isArray(enrollments) && enrollments.length > 0
      ? enrollments.map((e) => e.course?._id).filter(Boolean)
      : [];

  // Filtering logic per tab
  const filteredCourses = useMemo(() => {
    return processedCourses.filter((course) => {
      let tabMatch = false;
      let categoryMatch = false;
      let searchMatch = false;

      if (selectedTab === "all") {
        // Show only published courses
        tabMatch =
          !enrolledCourseIds.includes(course._id) &&
          course.coursepublished === "Published";

        categoryMatch =
          allCategory === "All Sports" || course.category === allCategory;

        searchMatch =
          course.title.toLowerCase().includes(allSearch.toLowerCase()) ||
          course.description.toLowerCase().includes(allSearch.toLowerCase()) ||
          course.category.toLowerCase().includes(allSearch.toLowerCase());
      } else if (selectedTab === "pending") {
        // Show only draft courses for admin
        tabMatch = user?.role === "admin" && course.coursepublished === "Draft";

        categoryMatch =
          pendingCategory === "All Sports" ||
          course.category === pendingCategory;

        searchMatch =
          course.title.toLowerCase().includes(pendingSearch.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(pendingSearch.toLowerCase()) ||
          course.category.toLowerCase().includes(pendingSearch.toLowerCase());
      } else if (selectedTab === "my") {
        tabMatch =
          user?.role !== "admin" && enrolledCourseIds.includes(course._id);

        categoryMatch =
          myCategory === "All Sports" || course.category === myCategory;

        searchMatch =
          course.title.toLowerCase().includes(mySearch.toLowerCase()) ||
          course.description.toLowerCase().includes(mySearch.toLowerCase()) ||
          course.category.toLowerCase().includes(mySearch.toLowerCase());
      } else if (selectedTab === "certificates") {
        tabMatch =
          user?.role !== "admin" &&
          enrolledCourseIds.includes(course._id) &&
          course.hasCertificate;

        categoryMatch =
          certificatesCategory === "All Sports" ||
          course.category === certificatesCategory;

        searchMatch =
          course.title
            .toLowerCase()
            .includes(certificatesSearch.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(certificatesSearch.toLowerCase()) ||
          course.category
            .toLowerCase()
            .includes(certificatesSearch.toLowerCase());
      }

      return tabMatch && categoryMatch && searchMatch;
    });
  }, [
    processedCourses,
    enrolledCourseIds,
    selectedTab,
    allCategory,
    allSearch,
    myCategory,
    mySearch,
    certificatesCategory,
    certificatesSearch,
    pendingCategory,
    pendingSearch,
    user,
  ]);
  

  // Select filters based on tab
  const currentCategory =
    selectedTab === "all"
      ? allCategory
      : selectedTab === "my"
      ? myCategory
      : selectedTab === "certificates"
      ? certificatesCategory
      : pendingCategory;

  const setCurrentCategory =
    selectedTab === "all"
      ? setAllCategory
      : selectedTab === "my"
      ? setMyCategory
      : selectedTab === "certificates"
      ? setCertificatesCategory
      : setPendingCategory;

  const currentSearch =
    selectedTab === "all"
      ? allSearch
      : selectedTab === "my"
      ? mySearch
      : selectedTab === "certificates"
      ? certificatesSearch
      : pendingSearch;

  const setCurrentSearch =
    selectedTab === "all"
      ? setAllSearch
      : selectedTab === "my"
      ? setMySearch
      : selectedTab === "certificates"
      ? setCertificatesSearch
      : setPendingSearch;

  return (
    <div className="flex flex-col h-screen text-black overflow-y-auto">
      {/* Sticky Header */}
      <div className="z-20 sticky top-0 p-6 bg-white shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-primary">Explore Courses</h1>
          {user?.role === "admin" && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="border sm:px-4 sm:py-2 p-2 rounded-lg bg-primary text-white hover:bg-secondary hover:text-white transition cursor-pointer"
              >
                + Add Category
              </button>
              <button
                onClick={() => navigate("/courses/addcourse")}
                className="border px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary hover:text-white transition cursor-pointer"
              >
                + Add Course
              </button>
            </div>
          )}
        </div>

        {/* Tabs + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6  mt-4">
          <div className="flex w-full md:w-auto">
            <button
              onClick={() => setSelectedTab("all")}
              className={`px-2 md:px-4 py-3 font-semibold transition cursor-pointer border-b-1 border-black ${
                selectedTab === "all"
                  ? "bg-primary text-white"
                  : "text-gray-700 bg-gray-200 hover:bg-primary hover:text-white"
              }`}
            >
              All Courses
            </button>
            {user?.role !== "admin" && (
              <>
                <button
                  onClick={() => setSelectedTab("my")}
                  className={`px-4 py-3 font-semibold transition cursor-pointer border-b-1 border-black ${
                    selectedTab === "my"
                      ? "bg-primary text-white"
                      : "text-gray-700 bg-gray-200 hover:bg-primary hover:text-white"
                  }`}
                >
                  My Courses
                </button>
                <button
                  onClick={() => setSelectedTab("certificates")}
                  className={`px-4 py-3 font-semibold transition cursor-pointer border-b-1 border-black ${
                    selectedTab === "certificates"
                      ? "bg-primary text-white"
                      : "text-gray-700 bg-gray-200 hover:bg-primary hover:text-white"
                  }`}
                >
                  My Certificates
                </button>
              </>
            )}
            {user?.role === "admin" && (
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-3 font-semibold transition cursor-pointer border-b-1 border-black ${
                  selectedTab === "pending"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-200 hover:bg-primary hover:text-white"
                }`}
              >
                Pending Courses
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex-1 flex flex-col md:flex-row gap-3 md:justify-end w-full">
            <div className="sm:flex items-center border border-gray-300 rounded-full w-full md:w-60 lg:w-64 xl:w-80 max-w-full hidden">
              <div className="p-3 bg-primary rounded-full">
                <Search className="w-5 h-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={currentSearch}
                onChange={(e) => setCurrentSearch(e.target.value)}
                className="flex-grow px-4 py-2 focus:outline-none"
              />
            </div>
            <CustomDropdown
              label=""
              options={categories}
              value={currentCategory}
              onChange={setCurrentCategory}
              getOptionLabel={(opt) => opt.categoryName}
              getOptionValue={(opt) => opt.categoryName}
              width="md:w-48 w-60 sm:w-90"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {filteredCourses.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No courses found
            </p>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out overflow-hidden relative"
              >
                <div className="absolute top-3 left-0 right-0 flex justify-between px-3 z-10">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="bg-white text-black border px-3 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </span>
                </div>

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

                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-bold truncate">{course.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2 break-words">
                    {course.description}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600 items-center bottom-0">
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

                  <button
                    onClick={() =>
                      navigate("viewdetails", {
                        state: { courseId: course._id },
                      })
                    }
                    className="w-full bottom-0 bg-primary text-white hover:bg-white hover:text-black cursor-pointer py-2 rounded-lg border-2 border-primary transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 flex justify-center items-start pt-20 z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute top-4 right-4 text-black hover:text-red-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <CategoryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
