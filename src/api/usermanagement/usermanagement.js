import { getRequest, postRequest, putRequest } from "../api";

export const getUsersData = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await getRequest(`/api/usermanagement?${query}`);
    return data;
};

export const fetchMentorsAndInstructorsAPI = async (search = "") => {
  try {
    const response = await getRequest(`/api/mentors-instructors?search=${search}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors/instructors:", error);
    throw error;
  }
};

export const getAllStudentAndMentorIds = async (search = "") => {
  try {
    const response = await getRequest(`/api/studentviews/ids`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors/instructors:", error);
    throw error;
  }
};


// Fetch all students
export const fetchAllStudents = async (params = {}) => {
    const query = new URLSearchParams({ ...params, role: "student" }).toString();
    return await getRequest(`/api/usermanagement?${query}`);
};

export const fetchMentorDashboard = async (mentorId) => {
  if (!mentorId) throw new Error("mentorId is required");
  return await getRequest(`/api/usermanagement/getstatedata?mentorId=${mentorId}`);
};


export const getStudentsByAdmin = async (search = "", schoolId = "") => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (schoolId) queryParams.append("schoolId", schoolId);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

    // Make API request
    const data = await getRequest(`/api/usermanagement/admin/students${queryString}`);

    return {
      data: data.data || [],
      total: data.total || 0,
      message: data.message || "",
    };
  } catch (err) {
    console.error("Error fetching students:", err);
    return { data: [], total: 0, message: "Failed to fetch students" };
  }
};

  
  


// Assign student to mentor
export const assignStudent = async (studentId, mentorId, schoolId) => {
    try {
      const data = await postRequest("/api/usermanagement/assign", {
        studentId,
        mentorId,
        schoolId, // include schoolId
      });
      return data;
    } catch (err) {
      console.error("Error assigning student:", err);
      return { message: "Failed to assign student" };
    }
  };
  
  // Unassign student from mentor
  export const unassignStudent = async (studentId, schoolId) => {
    try {
      const data = await postRequest("/api/usermanagement/unassign", {
        studentId,
        schoolId, // include schoolId
      });
      return data;
    } catch (err) {
      console.error("Error unassigning student:", err);
      return { message: "Failed to unassign student" };
    }
  };
  

// Get single user by ID
export const getSingleUser = async (id) => {
    console.log(`/api/usermanagement/getuserdata?id=${id}`);
    return await getRequest(`/api/usermanagement/getuserdata?id=${id}`);
};


export const getStudentsByMentor = async (mentorId, schoolId, page = 1, limit = 3) => {
  const query = [];
  if (schoolId) query.push(`schoolId=${encodeURIComponent(schoolId)}`);
  if (page) query.push(`page=${page}`);
  if (limit) query.push(`limit=${limit}`);
  const queryString = query.length ? `?${query.join("&")}` : "";
  return await getRequest(`/api/usermanagement/mentor/${mentorId}/students${queryString}`);
};

  
// Toggle User Status (activate/deactivate)
export const toggleUserStatus = async (id, active) => {
  return await postRequest(`/api/usermanagement/status/${id}`, { active });
};
