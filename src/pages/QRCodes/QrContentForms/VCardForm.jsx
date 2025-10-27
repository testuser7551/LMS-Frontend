import React, { useState } from "react";

const VCardForm = ({ content, setContent, onContinue, onBack }) => {
  const [errors, setErrors] = useState({});

  const fields = [
    { label: "First Name", key: "firstName", required: true },
    { label: "Last Name", key: "lastName", required: true },
    { label: "Phone Number", key: "phoneNumber", required: true, type: "tel" },
    { label: "Email", key: "emailAddress", required: true, type: "email" },
    { label: "Website", key: "personalWebsite", required: false },
    { label: "Company", key: "companyName", required: false },
    { label: "Position", key: "profession", required: false },
  ];

  const addressFields = [
    { label: "Street", key: "street", required: true },
    { label: "City", key: "city", required: true },
    { label: "State", key: "state", required: true },
    { label: "Postal Code", key: "postalCode", required: true },
    { label: "Country", key: "country", required: true },
  ];

  const validate = () => {
    const newErrors = {};

    if (!content.qrName || content.qrName.trim() === "") newErrors.qrName = "QR Name is required";

    fields.forEach(f => {
      const value = content[f.key] || "";
      if (f.required && value.trim() === "") newErrors[f.key] = `${f.label} is required`;
      else if (f.key === "phoneNumber" && !/^\d{10}$/.test(value.trim())) newErrors[f.key] = "Phone number must be 10 digits";
      else if (f.key === "emailAddress" && value.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors[f.key] = "Invalid email address";
    });

    addressFields.forEach(f => {
      if (!content[f.key] || content[f.key].trim() === "") newErrors[f.key] = `${f.label} is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) onContinue();
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md overflow-y-auto max-h-[75vh]">
      <h2 className="text-xl font-semibold mb-6">Add vCard Details</h2>

      {/* QR Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">QR Name</label>
        <input
          type="text"
          value={content.qrName || ""}
          onChange={(e) => setContent({ ...content, qrName: e.target.value })}
          placeholder="Enter QR name"
          className={`w-full border rounded-md px-4 py-2 ${errors.qrName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.qrName && <p className="text-red-500 text-sm mt-1">{errors.qrName}</p>}
      </div>

      {/* Main Fields */}
      {fields.map(f => (
        <div key={f.key} className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
          <input
            type={f.type || "text"}
            value={content[f.key] || ""}
            onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
            className={`w-full border rounded-md px-4 py-2 ${errors[f.key] ? "border-red-500" : "border-gray-300"}`}
          />
          {errors[f.key] && <p className="text-red-500 text-sm mt-1">{errors[f.key]}</p>}
        </div>
      ))}

      {/* Address Fields (stored separately) */}
      <h3 className="text-lg font-medium mt-4 mb-2">Address</h3>
      {addressFields.map(f => (
        <div key={f.key} className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
          <input
            type="text"
            value={content[f.key] || ""}
            onChange={(e) => setContent({
              ...content, address: {
                ...content.address,
                [f.key]: e.target.value,
              },
            })}
            className={`w-full border rounded-md px-4 py-2 ${errors[f.key] ? "border-red-500" : "border-gray-300"}`}
          />
          {errors[f.key] && <p className="text-red-500 text-sm mt-1">{errors[f.key]}</p>}
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
         {!isEditMode && (
          <button onClick={onBack} className="w-40 border border-black py-2 rounded-md hover:bg-gray-100">Go Back</button>
        )}
        <button onClick={handleContinue} className="w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800">Continue</button>
      </div>
    </div>
  );
};

export default VCardForm;
