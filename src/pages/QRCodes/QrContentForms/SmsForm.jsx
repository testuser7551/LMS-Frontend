import React, { useState } from "react";

const SmsForm = ({ content, setContent, onContinue, onBack,isEditMode }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // QR Name required
    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    // Phone number required and 10 digits numeric
    if (!content.phoneNumber || content.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required";
    } else {
      const phoneRegex = /^\d{10}$/;
      const numericPhone = content.phoneNumber.replace(/\D/g, ""); // remove non-numeric
      if (!phoneRegex.test(numericPhone)) {
        newErrors.phoneNumber = "Phone Number must be 10 digits";
      }
    }

    // Message required
    if (!content.message || content.message.trim() === "") {
      newErrors.message = "Message is required";
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
      <h2 className="text-xl font-semibold mb-6">Add SMS QR Details</h2>

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

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          value={content.phoneNumber || ""}
          onChange={(e) => setContent({ ...content, phoneNumber: e.target.value })}
          placeholder="9876543210"
          className={`w-full border rounded-md px-4 py-2 ${
            errors.phoneNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          rows="3"
          value={content.message || ""}
          onChange={(e) => setContent({ ...content, message: e.target.value })}
          className={`w-full border rounded-md px-4 py-2 ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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

export default SmsForm;
