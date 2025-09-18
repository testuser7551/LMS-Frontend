// src/components/CategoryForm.jsx
import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/courses/category";
import ConfirmModal from "./Components/ConfrimModal";

const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest",
    role: "other",
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data.categories || []);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setError("");

    if (!category.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        const data = await updateCategory(editId, {
          categoryName: category.trim(),
          updatedByName: user.name,
          updatedByRole: user.role,
        });
        setCategories((prev) =>
          prev.map((cat) => (cat._id === editId ? data.category : cat))
        );
        setEditId(null);
      } else {
        const data = await createCategory({
          categoryName: category.trim(),
          createdByName: user.name,
          createdByRole: user.role,
        });
        setCategories((prev) => [data.category, ...prev]);
      }

      setCategory("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (cat) => {
    setCategory(cat.categoryName);
    setEditId(cat._id);
  };

  // Open modal with selected category
  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setConfirmModalOpen(true);
  };

  // Cancel / Close modal
  const handleCancel = () => {
    setCategoryToDelete(null);
    setConfirmModalOpen(false);
  };

  // Confirm delete
  const handleDeleteConfirmed = async () => {
    if (!categoryToDelete) return;

    try {
      setLoading(true);
      await deleteCategory(categoryToDelete); // call your API
      // Update local state
      setCategories((prev) =>
        prev.filter((cat) => cat._id !== categoryToDelete)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to delete"
      );
    } finally {
      setLoading(false);
      setCategoryToDelete(null);
      setConfirmModalOpen(false);
    }
  };

  return (
    <div className=" p-6 max-w-lg mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        {editId ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSaveCategory} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Football"
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Saving..." : editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setCategory("");
                setEditId(null);
              }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Available Categories</h3>
        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {!loading && categories.length === 0 && (
          <p className="text-gray-500">No categories yet</p>
        )}
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className={`flex justify-between items-center border p-2 rounded-lg transition duration-200 cursor-pointer
              ${hoveredId === cat._id ? "bg-gray-100" : "bg-white"}
              ${editId === cat._id ? "border-gray-500" : "border-gray-300"}`}
              onMouseEnter={() => setHoveredId(cat._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div>
                <strong className="text-primary">{cat.categoryName}</strong>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCategory(cat)}
                  className="px-3 py-1  hover:bg-secondary text-black hover:text-white border-secondary border-2 text-sm rounded-lg transition duration-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="px-3 py-1  hover:bg-secondary text-black hover:text-white border-secondary border-2 text-sm rounded-lg transition duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        buttons={[
          {
            text: "Cancel",
            onClick: handleCancel,
            color: "bg-gray-200",
            textColor: "text-gray-700",
          },
          {
            text: "Delete",
            onClick: handleDeleteConfirmed,
            color: "bg-red-600",
          },
        ]}
        onClose={handleCancel}
      />
    </div>
  );
};

export default CategoryForm;
