import { getRequest, postRequest, putRequest, deleteRequest } from "../api";

//  Fetch all schools
export const fetchSchools = async (page, limit) => {
    return await getRequest(`/api/superadmin/all?page=${page}&limit=${limit}`);
};

//  Create a new school
export const createSchool = async (schoolData) => {
    return await postRequest("/api/superadmin/create", schoolData);
};

//  Update a school
export const updateSchool = async (id, schoolData) => {
    return await putRequest(`/api/superadmin/${id}`, schoolData);
};

//  Delete (soft delete) a school
export const deleteSchool = async (id) => {
    return await deleteRequest(`/api/superadmin/${id}`);
};

//  Delete (soft delete) a school
export const hardDeleteSchool = async (id) => {
    return await deleteRequest(`/api/superadmin/harddelete/${id}`);
};
