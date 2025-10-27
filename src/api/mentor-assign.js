import {getRequest, postRequest, putRequest } from "./api";

export const getMentorAndStudent = async () => {
  try {
    const response = getRequest(`/api/mentors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};