import React, { useState } from "react";

const WifiForm = ({ content, setContent, onContinue, onBack,isEditMode }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // QR Name validation
    if (!content.qrName || content.qrName.trim() === "") {
      newErrors.qrName = "QR Name is required";
    }

    // Network Name validation
    if (!content.networkName || content.networkName.trim() === "") {
      newErrors.networkName = "Network Name (SSID) is required";
    }

    // Encryption Type validation
    if (!content.encryptionType || content.encryptionType.trim() === "") {
      newErrors.encryptionType = "Encryption Type is required";
    }

    // Password validation if encryption is not 'nopass'
    if (content.encryptionType !== "nopass") {
      if (!content.password || content.password.trim() === "") {
        newErrors.password = "Password is required for selected encryption";
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
      <h2 className="text-xl font-semibold mb-6">Add Wi-Fi QR Details</h2>

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

      {/* Network Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Network Name (SSID)</label>
        <input
          type="text"
          value={content.networkName || ""}
          onChange={(e) => setContent({ ...content, networkName: e.target.value })}
          placeholder="e.g., MyWiFiNetwork"
          className={`w-full border rounded-md px-4 py-2 ${errors.networkName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.networkName && <p className="text-red-500 text-sm mt-1">{errors.networkName}</p>}
      </div>

      {/* Encryption Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Encryption Type</label>
        <select
          value={content.encryptionType || "WPA"}
          onChange={(e) => setContent({ ...content, encryptionType: e.target.value })}
          className={`w-full border rounded-md px-4 py-2 ${errors.encryptionType ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
        {errors.encryptionType && <p className="text-red-500 text-sm mt-1">{errors.encryptionType}</p>}
      </div>

      {/* Password */}
      {content.encryptionType !== "nopass" && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={content.password || ""}
            onChange={(e) => setContent({ ...content, password: e.target.value })}
            placeholder="Enter WiFi password"
            className={`w-full border rounded-md px-4 py-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-4">
         {!isEditMode && (
        <button onClick={onBack} className="w-40 border border-black py-2 rounded-md hover:bg-gray-100">
          Go Back
        </button>
        )}
        <button onClick={handleContinue} className="w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800">
          Continue
        </button>
      </div>
    </div>
  );
};

export default WifiForm;
