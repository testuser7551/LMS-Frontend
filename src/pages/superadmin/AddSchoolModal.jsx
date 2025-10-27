import React, { useState, useEffect } from "react";

const AddSchoolModal = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  handleSubmit,
  handleChange,
  errors,
  editingSchool,
  user,
  setEditingSchool,
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-primary mb-4">
          {editingSchool ? "Edit School" : "Add School"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary">
              School Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter school name"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-primary/40"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter school address"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-primary/40"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Contact Email
            </label>
            <input
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Enter contact email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-primary/40"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">
              Contact Phone
            </label>
            <input
              type="number"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="Enter contact phone"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-primary/40"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingSchool(null);
              }}
              className="px-4 py-2 border rounded-lg text-secondary hover:bg-secondary/30 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 cursor-pointer"
            >
              {editingSchool ? "Update School" : "Save School"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
