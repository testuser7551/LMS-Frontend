import { getRequest, putRequest } from "../api";
import api from "../api";

export const saveProfileSection = async (formData) => {
  return api.put("/api/profileSection", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data);
};

// ---------------- PUT Header Section ----------------
export const saveHeaderSection = async (data) => {
  return await putRequest(`/api/header`, data);
};

// ---------------- PUT Font Section ----------------
export const saveFontSection = async (data) => {
  return await putRequest(`/api/font`, data);
};


export const saveBannerImgSection = async (formData) => {
  return api.put("/api/bannerSection", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then((res) => res.data);
};

// Save / update Themes Section
export const saveThemesSection = async (data) => {
  // themeData must include cardId inside it, e.g. { cardId, themeName, primaryColor, ... }
  return await putRequest(`/api/themesSection`, data);
};

// ✅ Fetch all themes
export const fetchAllThemes = async () => {
  return await getRequest(`/api/themes`);
};