import { getRequest, postRequest, putRequest, deleteRequest } from "../api";

// ------------------ About Section ------------------

// Update Basic Details
export const updateBasicDetails = async ( data) => {
  return await putRequest(`/api/basic`, data);
};


// Create or Update Main Button
export const saveMainButton = async (data) => {
  return await postRequest(`/api/mainbutton`, data);
};

// Create or Update WhatsApp Button
export const saveWhatsappButton = async (data) => {
  return await postRequest(`/api/whatsappbutton`, data);
};

// Update existing WhatsApp Button (partial update)
export const updateWhatsappButton = async ( data) => {
  return await putRequest(`/api/whatsappbutton`, data);
};

