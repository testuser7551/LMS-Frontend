import api from "./api";

// Get settings
export const getCardDesign = async () => {
  try {
    const response = await api.get(`/api/card-design`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching Card Design:", error);
    throw error;
  }
};

export const getAllCardDesign = async () => {
  try {
    const response = await api.get(`/api/all-card-design`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching Card Design:", error);
    throw error;
  }
};


