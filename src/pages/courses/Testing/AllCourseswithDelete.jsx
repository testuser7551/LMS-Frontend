import React, { useState, useEffect } from "react";
import { fetchCoursesAPI, deleteCourseAPI } from "../../../api/courses/courses";
import {showToast} from "../../../components/toast";
const API_BASE = import.meta.env.VITE_API_BASE;

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses when component mounts
  const fetchCourses = async () => {
    try {
      const coursesData = await fetchCoursesAPI();
      setCourses(coursesData);
    } catch (error) {
      showToast("Failed to fetch courses.","top-center",10000,"dark");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle deleting a course
  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourseAPI(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
      showToast("Course deleted!","top-center",10000,"dark");
    } catch (error) {
      showToast("Failed to delete course.","top-center",10000,"dark");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{course.title}</h2>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <p>
                <strong>Description:</strong> {course.description}
              </p>
              <p>
                <strong>Level:</strong> {course.level}
              </p>
              <p>
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p>
                <strong>Category:</strong> {course.category}
              </p>

              {course.image && (
                <img
                  src={`${API_BASE}/uploads/courses/${course.image}`}
                  alt={course.title}
                  className="w-48 h-48 object-cover rounded mt-4"
                />
              )}

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Chapters</h3>
                {course.chapters.length === 0 ? (
                  <p>No chapters available.</p>
                ) : (
                  <div className="space-y-4">
                    {course.chapters.map((chapter, chIndex) => (
                      <div
                        key={chapter._id}
                        className="border p-3 rounded bg-gray-50"
                      >
                        <h4 className="text-lg font-semibold">
                          {chIndex + 1}. {chapter.chapterTitle}
                        </h4>

                        <div className="mt-2">
                          <h5 className="font-medium">Lessons:</h5>
                          {chapter.lessons.length === 0 ? (
                            <p>No lessons available.</p>
                          ) : (
                            <ul className="space-y-2">
                              {chapter.lessons.map((lesson, lIndex) => (
                                <li
                                  key={lesson._id}
                                  className="p-2 border rounded bg-white"
                                >
                                  <p>
                                    <strong>
                                      {lIndex + 1}. {lesson.lessonName}
                                    </strong>
                                  </p>
                                  <p>
                                    <strong>Type:</strong> {lesson.lectureType}
                                  </p>
                                  <p>
                                    <strong>Description:</strong>{" "}
                                    {lesson.lessonDescription}
                                  </p>
                                  <p>
                                    <strong>Published:</strong>{" "}
                                    {lesson.published}
                                  </p>

                                  {lesson.duration && (
                                    <p>
                                      <strong>Duration:</strong>{" "}
                                      {lesson.duration.value}{" "}
                                      {lesson.duration.unit}
                                    </p>
                                  )}

                                  {lesson.resourceURL && (
                                    <p>
                                      <strong>Resource URL:</strong>{" "}
                                      <a
                                        href={lesson.resourceURL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline"
                                      >
                                        {lesson.resourceURL}
                                      </a>
                                    </p>
                                  )}

                                  {lesson.sections &&
                                    lesson.sections.length > 0 && (
                                      <div className="mt-2">
                                        <h6 className="font-medium">
                                          Sections:
                                        </h6>
                                        <ul className="ml-4 list-disc">
                                          {lesson.sections.map(
                                            (section, sIndex) =>
                                              section ? (
                                                <li key={sIndex}>
                                                  <p>
                                                    <strong>Title:</strong>{" "}
                                                    {section.title || "N/A"}
                                                  </p>
                                                  <p>
                                                    <strong>Content:</strong>{" "}
                                                    {section.content || "N/A"}
                                                  </p>
                                                </li>
                                              ) : null
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                  {lesson.quiz && lesson.quiz.length > 0 && (
                                    <div className="mt-2">
                                      <h6 className="font-medium">Quiz:</h6>
                                      <ul className="ml-4 list-disc">
                                        {lesson.quiz.map((quizItem, qIndex) => (
                                          <li key={qIndex}>
                                            <p>
                                              <strong>Question:</strong>{" "}
                                              {quizItem.question || "N/A"}
                                            </p>
                                            <p>
                                              <strong>Type:</strong>{" "}
                                              {quizItem.type || "N/A"}
                                            </p>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
