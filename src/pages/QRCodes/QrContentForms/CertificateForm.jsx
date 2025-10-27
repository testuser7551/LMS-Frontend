import React, { useState } from "react";
import CertificateSearchBox from "../Components/CertificateSearch"
const API_BASE = import.meta.env.VITE_API_BASE;

const CertificateForm = ({ content, setContent, onContinue, onBack, isEditMode }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle field blur to mark touched
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    if (!content.certificateurl || content.certificateurl.trim() === "") {
      newErrors.certificateurl = "Select a certificate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Continue click
  const handleContinue = () => {
    if (validate()) {
      onContinue();
    } else {
      // mark all fields touched to show errors
      setTouched({ qrName: true, certificateurl: true });
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-6">Add Certificate Card Details</h2>

      {/* QR Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
        <input
          type="text"
          value={content.qrName || ""}
          onChange={(e) => setContent({ ...content, qrName: e.target.value })}
          onBlur={() => handleBlur("qrName")}
          placeholder="Enter QR Name"
          className={`w-full border rounded-md px-4 py-2 ${errors.qrName && touched.qrName ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.qrName && touched.qrName && (
          <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>
        )}
      </div>
      <CertificateSearchBox
        onChange={(selectedUrl) =>
          setContent({ ...content, certificateurl: selectedUrl })
        }
      />

      {/* Certificate Link / ID */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Link</label>
        <input
          type="text"
          value={content?.certificateurl ? `${API_BASE}${content.certificateurl}` : ""}
          disabled={true}
          onChange={(e) => setContent({ ...content, certificateurl: e.target.value })}
          onBlur={() => handleBlur("certificateurl")}
          placeholder="Your certificate link"
          className={`w-full disabled:opacity-50 cursor-not-allowed border rounded-md px-4 py-2 ${errors.certificateurl && touched.certificateurl ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.certificateurl && touched.certificateurl && (
          <p className="text-red-500 text-sm mt-1">{errors.certificateurl}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        {!isEditMode && (
          <button
            onClick={onBack}
            className="w-40 border border-black py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Go Back
          </button>
        )}
        <button
          onClick={handleContinue}
          className="w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CertificateForm;
