// api/usermanagement/usermanagement.js

import { getRequest, postRequest } from "../api"; // adjust your path if needed



export const getCourseByAdmin = async (search = "", schoolId = "", userId = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (schoolId) queryParams.append("schoolId", schoolId);
    if (userId) queryParams.append("userId", userId);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

    const response = await getRequest(`/api/schoolcourses${queryString}`);

    const coursesList = (response.data || []).map((course) => ({
      ...course,
      assigned: !!course.assigned,
    }));

    return {
      data: coursesList,
      total: coursesList.length,
      message: response.message || "",
    };
  } catch (err) {
    console.error("Error fetching courses:", err);
    return { data: [], total: 0, message: "Failed to fetch courses" };
  }
};



export const assignCourses = async (userAssign) => {
  try {
    if(!userAssign){
      console.error("Error Assigin courses:", err);
    }
    // Make API request
    const data = await postRequest("/api/assigncourses", {
      userAssign // include schoolId
    });

    return {
      data: data.data || []
    };
  } catch (err) {
    console.error("Error fetching courses:", err);
    return { data: [], total: 0, message: "Failed to fetch courses" };
  }
};


// api/usermanagement/assign.js
export const unassignCourse = async (userAssign) => {
  try {
    const data = await postRequest("/api/unassigncourses", {
      userAssign,
    });

    return {
      data: data.data || [],
      message: data.message || "Unassigned",
    };
  } catch (err) {
    console.error("Error unassigning course:", err);
    return { data: [], message: "Failed to unassign course" };
  }
};



export const getAssignedCourses = async (userId, schoolId) => {
  try {
    if (!userId || !schoolId) {
      console.error("userId and schoolId are required");
      return { data: [], total: 0, message: "Missing parameters" };
    }

    const queryParams = new URLSearchParams({ userId, schoolId }).toString();
    const response = await getRequest(`/api/assignedcourses?${queryParams}`);

    // Ensure `assigned` is boolean for frontend toggle
    const coursesList = (response.data || []).map((course) => ({
      ...course,
      assigned: !!course.assigned,
    }));

    return {
      data: coursesList,
      total: coursesList.length,
      message: response.message || "",
    };
  } catch (err) {
    console.error("Error fetching assigned courses:", err);
    return { data: [], total: 0, message: "Failed to fetch assigned courses" };
  }
};