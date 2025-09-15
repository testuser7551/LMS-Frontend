// progress.js
import { getRequest, postRequest, deleteRequest } from "../api";

// Base path for course progress
const BASE_PATH = "/api/courses/progress";

// ------------------ Progress APIs ------------------

// Initialize course progress for a user
export const initCourseProgressAPI = async (data) => {
    try {
        const res = await postRequest(`${BASE_PATH}/init`, data);
        return res;
    } catch (error) {
        console.error("Error initializing course progress:", error);
        throw error;
    }
};

// Mark a lesson as complete
export const markLessonCompleteAPI = async (userId, courseId, chapterId, lessonId) => {
    try {
        const res = await postRequest(`${BASE_PATH}/lesson-complete`, {
            userId,
            courseId,
            chapterId,
            lessonId,
        });
        return res;
    } catch (error) {
        console.error("Error marking lesson complete:", error);
        throw error;
    }
};

// Submit quiz answers
export const submitQuizAPI = async (userId, courseId, chapterId, lessonId, answers) => {
    try {
        const res = await postRequest(`${BASE_PATH}/quiz-submit`, {
            userId,
            courseId,
            chapterId,
            lessonId,
            answers,
        });
        return res;
    } catch (error) {
        console.error("Error submitting quiz:", error);
        throw error;
    }
};

// Check if course is complete
export const checkCourseCompleteAPI = async (userId, courseId) => {
    try {
        const res = await postRequest(`${BASE_PATH}/check-complete`, {
            userId,
            courseId,
        });
        return res;
    } catch (error) {
        console.error("Error checking course completion:", error);
        throw error;
    }
};

// Frontend API call
export const getLessonProgressAPI = async (userId, courseId, chapterId, lessonId) => {
    try {
        // Construct query string
        const query = `?userId=${userId}&courseId=${courseId}&chapterId=${chapterId}&lessonId=${lessonId}`;
        const res = await getRequest(`${BASE_PATH}/lesson-progress${query}`);
        return res; // Assuming backend returns JSON object with completed/quizAnswers
    } catch (error) {
        console.error("Error fetching lesson progress:", error);
        throw error;
    }
};


// Fetch all progress records
export const fetchProgressAll = async () => {
    try {
        const res = await getRequest(`${BASE_PATH}`);
        return res; // List of all progress
    } catch (error) {
        console.error("Error fetching all progress:", error);
        throw error;
    }
};

// Delete a user's progress for a course
export const deleteProgress = async (userId, courseId) => {
    try {
        await deleteRequest(`${BASE_PATH}/${userId}/${courseId}`);
        return true;
    } catch (error) {
        console.error("Error deleting progress:", error);
        throw error;
    }
};
