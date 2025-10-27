// src/api/settings.js
import api from "../api";


// Update settings
export const updateSettingsDetails = async (settingsData) => {
  try {
    const response = await api.put(`/api/settings`, settingsData );
    return response.data;
  } catch (error) {
    //console.error("Error updating settings:", error);
    throw error;
  }
};


// Delete (reset) settings
export const deleteSettings = async () => {
  try {
    const response = await api.delete(`/api/settings`);
    return response.data;
  } catch (error) {
    //console.error("Error deleting settings:", error);
    throw error;
  }
};
