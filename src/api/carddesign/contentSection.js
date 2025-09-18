import { getRequest, postRequest, putRequest, deleteRequest } from "../api";
import api from "../api"; // ✅ must use this

const API_BASE = import.meta.env.VITE_API_BASE;


// Update existing Link Section (partial update)
export const updateLinkSection = async (data) => {
  return await putRequest(`/api/linkSection`, data);
};

// Update existing Text Section (partial update)
export const updateTextSection = async (data) => {
  return await putRequest(`/api/textSection`, data);
};

// Update existing youtube Section (partial update)
export const updateYouTubeSection = async (data) => {
  return await putRequest(`/api/youTubeSection`, data);
};



//gallery section
export const saveGalleryImageAPI = async (formData) => {
  try {
    const response = await api.post(`/api/gallerySection`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving gallery image:", error.response?.data || error.message);
    throw error;
  }
};


// ------------------ Photo Section API ------------------

// Save multiple photos
export const savePhotoSectionAPI = async (formData) => {
  try {
    const response = await api.put(`/api/photoSection`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving photo section:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a single photo by index or id
// export const deletePhotoAPI = async (photoId) => {
//   try {
//     const response = await api.delete(`/api/deletephoto/${photoId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting photo:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const deletePhotoAPI = async (filename) => {
  try {
    const response = await api.delete(`/api/deletephoto`, {
      data: { filename }, // axios allows sending body with DELETE
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting photo:", error.response?.data || error.message);
    throw error;
  }
};


// content About Page Sections API

export const updateContentAbout = async (data) => {
  return await putRequest(`/api/content/about`, data);
};

export const isEnabledContent = async (data) => {
  return await putRequest(`/api/content/isenabled`, data);
};

//Experience api logics

// Update experienceSection (title, isEnabled)
export const updateExperienceMeta = async (data) => {
  return await putRequest(`/api/content/experience-title`, data);
};

//save Experience Section modal Array
export const saveExperienceSection = async (data) => {
  return await postRequest(`/api/content/experience`, data);
};

// Update a single experience by its ID
export const updateExperienceById = async (experienceId, data) => {
  return await putRequest(`/api/content/experience/${experienceId}`, data);
};

// Delete an experience by its ID
export const deleteExperience = async (experienceId) => {
  return await deleteRequest(`/api/content/experience/${experienceId}`);
};


export const getAllCertificates = async () => {
  return await getRequest('/api/content/certificates');
};

