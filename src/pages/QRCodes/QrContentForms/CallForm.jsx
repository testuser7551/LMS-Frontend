import React, { useState, useEffect } from "react";

const CallForm = ({ content, setContent, onContinue, onBack,isEditMode }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validate form fields
  useEffect(() => {
    const newErrors = {};

    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    if (!content.phoneNumber || content.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(content.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [content]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    // <div className="bg-gray-100 p-6 rounded-md shadow-md">
    //   <h2 className="text-xl font-semibold mb-6">Add Call QR Details</h2>

    //   {/* QR Name */}
    //   <div className="mb-4">
    //     <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
    //     <input
    //       type="text"
    //       value={content.qrName || ""}
    //       onChange={(e) => setContent({ ...content, qrName: e.target.value })}
    //       onBlur={() => handleBlur("qrName")}
    //       placeholder="Enter QR Name"
    //       className={`w-full border rounded-md px-4 py-2 ${
    //         errors.qrName && touched.qrName ? "border-red-500" : "border-gray-300"
    //       }`}
    //     />
    //     {errors.qrName && touched.qrName && (
    //       <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>
    //     )}
    //   </div>

    //   {/* Phone Number */}
    //   <div className="mb-6">
    //     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
    //     <input
    //       type="tel"
    //       value={content.phoneNumber || ""}
    //       onChange={(e) => setContent({ ...content, phoneNumber: e.target.value })}
    //       onBlur={() => handleBlur("phoneNumber")}
    //       placeholder="9876543210"
    //       className={`w-full border rounded-md px-4 py-2 ${
    //         errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-gray-300"
    //       }`}
    //     />
    //     {errors.phoneNumber && touched.phoneNumber && (
    //       <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
    //     )}
    //   </div>

    //   {/* Buttons */}
    //   <div className="flex justify-center gap-4">
    //      {!isEditMode && (
    //     <button
    //       onClick={onBack}
    //       className="w-40 border border-black py-2 rounded-md hover:bg-gray-100"
    //     >
    //       Go Back
    //     </button>
    //     )}
    //     <button
    //       onClick={onContinue}
    //       disabled={!isValid}
    //       className={`w-40 py-2 rounded-md ${
    //         isValid
    //           ? "bg-black text-white hover:bg-gray-800"
    //           : "bg-gray-400 text-gray-200 cursor-not-allowed"
    //       }`}
    //     >
    //       Continue
    //     </button>
    //   </div>
    // </div>

    <div className="bg-gray-100 p-4 sm:p-6 rounded-md shadow-md">
  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Add Call QR Details</h2>

  {/* QR Name */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
    <input
      type="text"
      value={content.qrName || ""}
      onChange={(e) => setContent({ ...content, qrName: e.target.value })}
      onBlur={() => handleBlur("qrName")}
      placeholder="Enter QR Name"
      className={`w-full border rounded-md px-3 sm:px-4 py-2 ${
        errors.qrName && touched.qrName ? "border-red-500" : "border-gray-300"
      } text-sm sm:text-base`}
    />
    {errors.qrName && touched.qrName && (
      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.qrName}</p>
    )}
  </div>

  {/* Phone Number */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
    <input
      type="tel"
      value={content.phoneNumber || ""}
      onChange={(e) => setContent({ ...content, phoneNumber: e.target.value })}
      onBlur={() => handleBlur("phoneNumber")}
      placeholder="9876543210"
      className={`w-full border rounded-md px-3 sm:px-4 py-2 ${
        errors.phoneNumber && touched.phoneNumber ? "border-red-500" : "border-gray-300"
      } text-sm sm:text-base`}
    />
    {errors.phoneNumber && touched.phoneNumber && (
      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phoneNumber}</p>
    )}
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
    {!isEditMode && (
      <button
        onClick={onBack}
        className="w-full sm:w-40 border border-black py-2 rounded-md hover:bg-gray-100 text-sm sm:text-base"
      >
        Go Back
      </button>
    )}
    <button
      onClick={onContinue}
      disabled={!isValid}
      className={`w-full sm:w-40 py-2 rounded-md text-sm sm:text-base ${
        isValid
          ? "bg-black text-white hover:bg-gray-800"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
    >
      Continue
    </button>
  </div>
</div>

  );
};

export default CallForm;
