// src/api/category.js
import { getRequest, postRequest, putRequest, deleteRequest } from "../api";

// Fetch all categories
export const fetchCategories = async () => {
    return await getRequest("/api/courses/categories");
};

// Create category
export const createCategory = async (categoryData) => {
    return await postRequest("/api/courses/categories", categoryData);
};

// Update category
export const updateCategory = async (id, categoryData) => {
    return await putRequest(`/api/courses/categories/${id}`, categoryData);
};

// Delete category
export const deleteCategory = async (id) => {
    return await deleteRequest(`/api/courses/categories/${id}`);
};
