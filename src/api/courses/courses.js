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
        console.log("Courses fetched:", response.data);
        return response.data.courses || [];
    } catch (error) {
        console.error("Error fetching courses:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch course by ID
export const fetchCourseByIdAPI = async (courseId) => {
    try {
        const response = await api.get(`${BASE_URL}/${courseId}`);
        console.log("Course fetched:", response.data);
        return response.data.course;
    } catch (error) {
        console.error("Error fetching course:", error.response?.data || error.message);
        throw error;
    }
};

// Save new course
export const saveCourseDetailsAPI = async (formData) => {
    try {
        console.log("Saving course:");
        for (let pair of formData.entries()) console.log(pair[0], pair[1]);

        const response = await api.post(BASE_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Course saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error saving course:", error.response?.data || error.message);
        throw error;
    }
};

// Update existing course
export const updateCourseDetailsAPI = async (courseId, formData) => {
    try {
        console.log("Updating course:");
        for (let pair of formData.entries()) console.log(pair[0], pair[1]);

        const response = await api.put(`${BASE_URL}/${courseId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Course updated:", response.data);
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
        console.log("Course deleted:", response.data);
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
        console.log("Chapter saved:", response.data);
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

        console.log("Saving lesson:");
        for (let pair of formData.entries()) console.log(pair[0], pair[1]);

        const response = await api.post(`${BASE_URL}/${courseId}/chapter/${chapterId}/lesson`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Lesson saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error saving lesson:", error.response?.data || error.message);
        throw error;
    }
};

// Update lesson
export const updateLessonAPI = async (courseId, chapterId, lessonId, updatedData) => {
    try {
        console.log("Updating lesson:", { courseId, chapterId, lessonId, updatedData });
        const response = await api.put(`${BASE_URL}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`, updatedData);
        console.log("Lesson updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating lesson:", error.response?.data || error.message);
        throw error;
    }
};

// Delete lesson
export const deleteLessonAPI = async (courseId, chapterId, lessonId) => {
    try {
        console.log(`Deleting lesson: ${courseId}, ${chapterId}, ${lessonId}`);
        const response = await api.delete(`${BASE_URL}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`);
        console.log("Lesson deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting lesson:", error.response?.data || error.message);
        throw error;
    }
};
