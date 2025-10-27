import React, { useState } from "react";

const LinkForm = ({ content, setContent, onContinue, onBack,isEditMode }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // QR Name required
    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    // URL required and valid
    if (!content.url || content.url.trim() === "") {
      newErrors.url = "Website URL is required";
    } else {
      // simple URL regex
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/;
      if (!urlRegex.test(content.url.trim())) {
        newErrors.url = "Invalid URL";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add Link QR Details</h2>

      {/* QR Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
        <input
          type="text"
          value={content.qrName || ""}
          onChange={(e) => setContent({ ...content, qrName: e.target.value })}
          placeholder="Enter QR name"
          className={`w-full border rounded-md px-4 py-2 ${
            errors.qrName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.qrName && <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>}
      </div>

      {/* Website URL */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
        <input
          type="url"
          value={content.url || ""}
          onChange={(e) => setContent({ ...content, url: e.target.value })}
          placeholder="https://example.com"
          className={`w-full border rounded-md px-4 py-2 ${
            errors.url ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        {!isEditMode && (
        <button
          onClick={onBack}
          className="w-40 border border-black py-2 rounded-md hover:bg-gray-100"
        >
          Go Back
        </button>
        )}
        <button
          onClick={handleContinue}
          className="w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LinkForm;
