import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------ Request Interceptor ------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------ Response Interceptor ------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.error("API Error:", error.response?.data || error.message);

    // Auto logout on 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // clear token
     
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ------------------ Request Helpers ------------------

// GET request
export const getRequest = async (url, customHeaders = {}) => {
  const response = await api.get(url, { headers: { ...customHeaders } });
  return response.data;
};

// POST request
export const postRequest = async (url, data, customHeaders = {}) => {
  const response = await api.post(url, data, {
    headers: { ...customHeaders },
  });
  return response.data;
};

// PUT request
export const putRequest = async (url, data, customHeaders = {}) => {
  const response = await api.put(url, data, {
    headers: { ...customHeaders },
  });
  return response.data;
};

// DELETE request
export const deleteRequest = async (url, customHeaders = {}) => {
  const response = await api.delete(url, { headers: { ...customHeaders } });
  return response.data;
};

export default api;
