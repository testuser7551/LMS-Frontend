import React, { useState } from "react";

const EmailForm = ({ content, setContent, onContinue, onBack,isEditMode }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // QR Name required
    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    // Recipient Email required and valid
    if (!content.email || content.email.trim() === "") {
      newErrors.email = "Recipient Email is required";
    } else {
      // simple email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(content.email.trim())) {
        newErrors.email = "Invalid email address";
      }
    }

    // Subject required
    if (!content.subject || content.subject.trim() === "") {
      newErrors.subject = "Subject is required";
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
      <h2 className="text-xl font-semibold mb-6">Add Email QR Details</h2>

      {/* QR Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
        <input
          type="text"
          value={content.qrName || ""}
          onChange={(e) => setContent({ ...content, qrName: e.target.value })}
          className={`w-full border rounded-md px-4 py-2 ${
            errors.qrName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.qrName && <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>}
      </div>

      {/* Recipient Email & Subject */}
      {[
        { label: "Recipient Email", key: "email", type: "email" },
        { label: "Subject", key: "subject", type: "text" },
      ].map((f) => (
        <div key={f.key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
          <input
            type={f.type}
            value={content[f.key] || ""}
            onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
            className={`w-full border rounded-md px-4 py-2 ${
              errors[f.key] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors[f.key] && <p className="text-red-500 text-sm mt-1">{errors[f.key]}</p>}
        </div>
      ))}

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          rows="4"
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

export default EmailForm;
