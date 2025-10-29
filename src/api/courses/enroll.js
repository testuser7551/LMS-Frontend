// enroll.js
import { getRequest, postRequest, deleteRequest } from "../api";

// ------------------ Enrollment API ------------------

// Fetch all enrollments
export const fetchEnrollments = async () => {
    try {
        const data = await getRequest("/api/courses/enrollment");
        return data; // returns array of enrollments
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw new Error("Failed to fetch enrollments");
    }
};

// Delete an enrollment by userId and courseId
export const deleteEnrollment = async (userId, courseId) => {
    try {
        await deleteRequest(`/api/courses/enrollment/${userId}/${courseId}`);
        return true; // Successfully deleted
    } catch (error) {
        console.error("Error deleting enrollment:", error);
        throw new Error("Failed to delete enrollment");
    }
};

// Enroll a user in a course
export const enrollUser = async (enrollData) => {
    try {
        const data = await postRequest("/api/courses/enrollment/enroll", enrollData);
        return data;
    } catch (error) {
        console.error("Error enrolling user:", error);
        throw new Error("Failed to enroll user");
    }
};

// Get enrollment by user ID
export const getEnrollment = async (userId) => {
    try {
        const data = await getRequest(`/api/courses/enrollment/${userId}`);
        return data;
    } catch (error) {
        console.error("Error fetching enrollment:", error);
        throw new Error("Failed to fetch enrollment");
    }
};
