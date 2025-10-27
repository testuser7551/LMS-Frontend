// course.js

import api from "../api";

const API_BASE = import.meta.env.VITE_API_BASE;
const BASE_URL = `${API_BASE}/api/courses`;

// ----------------------
// Courses
// ----------------------
// Fetch all courses
export const fetchCoursesAPI = async () => {
    try {
        const response = await api.get(BASE_URL);
        return response.data.courses || [];
    } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message);
        throw error;
    }
};


export const fetchAssignedCoursesAPI = async (instructorId) => {
  try {
    const response = await api.get(`${BASE_URL}/assigned/usercourses`, {
      params: { instructorId },
    });
    console.log(response.data);
    return response.data.fullCourses || [];
  } catch (error) {
    console.error("Error fetching assigned courses:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch course by ID
export const fetchCourseByIdAPI = async (courseId) => {
    try {
        const response = await api.get(`${BASE_URL}/${courseId}`);
        return response.data.course;
    } catch (error) {
        console.error("Error fetching course:", error.response?.data || error.message);
        throw error;
    }
};

// Save new course
export const saveCourseDetailsAPI = async (formData) => {
    try {

        const response = await api.post(BASE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error saving course:", error.response?.data || error.message);
        throw error;
    }
};

// Update existing course
export const updateCourseDetailsAPI = async (courseId, formData) => {
    try {

        const response = await api.put(`${BASE_URL}/${courseId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating course:", error.response?.data || error.message);
        throw error;
    }
};

// Delete course
export const deleteCourseAPI = async (courseId) => {
    try {
        const response = await api.delete(`${BASE_URL}/${courseId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error.response?.data || error.message);
        throw error;
    }
};

// ----------------------
// Chapters
// ----------------------

// Save new chapter
export const saveChapterAPI = async (courseId, chapterTitle) => {
    try {
        const response = await api.post(`${BASE_URL}/${courseId}/chapter`, { chapterTitle });
        return response.data;
    } catch (error) {
        console.error("Error saving chapter:", error.response?.data || error.message);
        throw error;
    }
};

// Update chapter
export const updateChapterAPI = async (courseId, chapterId, newTitle) => {
    try {
        const response = await api.put(`${BASE_URL}/${courseId}/chapter/${chapterId}`, { chapterTitle: newTitle });
        return response.data;
    } catch (error) {
        console.error("Error updating chapter:", error.response?.data || error.message);
        throw error;
    }
};

// Delete chapter
export const deleteChapterAPI = async (courseId, chapterId) => {
    try {
        const response = await api.delete(`${BASE_URL}/${courseId}/chapters/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting chapter:", error.response?.data || error.message);
        throw error;
    }
};

// ----------------------
// Lessons
// ----------------------

// Save new lesson
export const saveLessonAPI = async (courseId, chapterId, lessonData) => {
    try {
        const formData = new FormData();

        // Prepare FormData
        Object.keys(lessonData).forEach((key) => {
            const value = lessonData[key];

            if (key === "file" && value) formData.append("file", value);
            else if (Array.isArray(value) || key === "duration") formData.append(key, JSON.stringify(value));
            else if (value !== undefined) formData.append(key, value);
        });

        const response = await api.post(`${BASE_URL}/${courseId}/chapter/${chapterId}/lesson`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Error saving lesson:", error.response?.data || error.message);
        throw error;
    }
};

// Update lesson
export const updateLessonAPI = async (courseId, chapterId, lessonId, updatedData) => {
    try {
        const response = await api.put(`${BASE_URL}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating lesson:", error.response?.data || error.message);
        throw error;
    }
};

// Delete lesson
export const deleteLessonAPI = async (courseId, chapterId, lessonId) => {
    try {
        const response = await api.delete(`${BASE_URL}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting lesson:", error.response?.data || error.message);
        throw error;
    }
};



// Publish the entire course by ID
export const publishFullCourse = async (courseId) => {
    try {
        const response = await api.put(`${BASE_URL}/${courseId}/publish`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Backend sent a structured error message
            return error.response.data;
        } else {
            // Network or other error
            return { success: false, message: error.message || "Something went wrong" };
        }
    }
};


// Get enrolled count for a specific course
export const getEnrolledCourseCountAPI = async (courseId) => {
    try {
        const response = await api.get(`${BASE_URL}/enrollcoursescount/${courseId}`);
        return response.data; // { success: true, enrolledCount: ... }
    } catch (error) {
        console.error("Error fetching enrolled count:", error.response?.data || error.message);
        throw error;
    }
};



// Mark course as completed
export const markCourseCompletedAPI = async (formData) => {
    try {
        const response = await api.post(`${BASE_URL}/completed`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching enrolled count:", error.response?.data || error.message);
        throw error;
    }
};


// Fetch completed courses for a specific user
export const getCompletedCoursesAPI = async (userId) => {
    try {
        const response = await api.get(`${BASE_URL}/completed/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching completed courses:", error.response?.data || error.message);
        throw error;
    }
};