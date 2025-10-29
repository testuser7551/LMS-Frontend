
// course.js

import api from "../api";
import { getRequest, postRequest, putRequest, deleteRequest } from "../api";
import {showToast} from "../../components/toast";
const API_BASE = import.meta.env.VITE_API_BASE;


export const saveQrCodeAPI = async (formData) => {
  try {
    for (let pair of formData.entries()) console.log(pair[0], pair[1]);

    const response = await api.post(`${API_BASE}/api/qrcode/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      // If your backend requires auth token, uncomment and add:
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   "Authorization": `Bearer ${yourToken}`
      // }
    });
    return response.data; // contains success, message, etc.
  } catch (error) {
    console.error("Error saving QR Code:", error.response?.data || error.message);
    throw error;
  }
};
// Function to toggle QR status
export const handleToggleStatus = async (qrId) => {
  try {
    const response = await api.patch(
      `${API_BASE}/api/qrcode/toggle-status/${qrId}`
    );
    return response;
  } catch (error) {
    console.error("Error toggling QR status:", error);
    showToast("Failed to update QR status.","top-center",10000,"dark");
  }
};


/* ----------------------------------------
   ✅ GET ALL QRs
---------------------------------------- */

// api/QrCode/QrCode.js
export const getAllQrCodes = async (page = 1, limit = 10, userId = '') => {
  let url = `/api/qrcode/getall-qr?page=${page}&limit=${limit}`;
  
  // Add userId parameter if provided
  if (userId) {
    url += `&userId=${userId}`;
  }
  
  return await getRequest(url);
};

/* ----------------------------------------
   ✅ GET SINGLE QR BY ID
---------------------------------------- */
export const getQrCodeById = async (id) => {
  return await getRequest(`/api/qrcode/getqr/${id}`);
};

/* ----------------------------------------
   ✅ UPDATE QR BY ID


/* ----------------------------------------
   ✅ DELETE QR BY ID
---------------------------------------- */
export const deleteQrCode = async (id) => {
  return await deleteRequest(`/api/qrcode/deleteqr/${id}`);
};


export const updateQrCode = async (id, formData) => {
  try {
    // Use putRequest but override Content-Type for FormData
    const data = await putRequest(`/api/qrcode/updateqr/${id}`, formData, {
      'Content-Type': 'multipart/form-data', // Override the default JSON header
    });
    return data;
  } catch (error) {
    console.error("❌ Update failed:", error);
    
    // Check if it's a 401 error
    if (error.response?.status === 401) {
      console.error("Authentication failed - token may be invalid");
    }
    
    throw error;
  }
};