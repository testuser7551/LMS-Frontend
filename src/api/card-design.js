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

export const getCardDesignWithId = async (id) => {
  try {
    const response = await api.get(`/api/card-design/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCardDesign = async ({ page = 1, limit = 9, searchTerm = '', batch = 'all' }) => {
  try {
    const response = await api.get(`/api/all-card-design`, {
      params: {
        page,
        limit,
        searchTerm,
        batch,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Card Design:", error);
    throw error;
  }
};

