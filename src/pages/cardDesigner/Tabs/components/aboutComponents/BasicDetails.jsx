import React, { useEffect, useState } from "react";
import {
  updateBasicDetails
} from "../../../../../api/carddesign/aboutSection";
import { showToast } from "../../../../../components/toast.js";


const BasicDetails = ({ basicDetails, onChange }) => {
  //  Format input as (123) 456-7890
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    // remove all non-digits
    const digits = value.replace(/\D/g, "");

    const len = digits.length;
    if (len < 4) return digits;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateUSPhone = (phone) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // strict format
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    const mobile = basicDetails?.mobilenumber;
    if (mobile == null) return;

    const mobileStr = String(mobile);

    // Only format if it's raw 10 digits (from DB) — avoids re-formatting formatted string
    if (/^\d{10}$/.test(mobileStr)) {
      onChange("mobilenumber", formatPhoneNumber(mobileStr));
    }
  }, [basicDetails?.mobilenumber, onChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUSPhone(basicDetails.mobilenumber)) {
      showToast("Invalid phone number! Format: (123) 456-7890", "top-center", 4000, "dark");
      return;
    }
    try {
      let savedData;
      try {
        const cleanedNumber = basicDetails.mobilenumber.replace(/\D/g, "");
        const payload = {
          ...basicDetails,
          mobilenumber: cleanedNumber, // store digits only in DB
        };
        await updateBasicDetails(payload);
      } catch (err) {
        console.err(err);
        throw err;
      }
      showToast('Basic details saved successfully!', "top-center", 5000, "dark");

    } catch (err) {
      //console.error("Error saving basic details:", err);
      showToast('Failed to save basic details. Try again.', "top-center", 5000, "dark");
    }
  };
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange("mobilenumber", formatted);
  };


  return (
    <div className="mb-8 bg-[var(--color-bgcolor)] p-4 rounded-lg shadow border border-[var(--color-secondarybgcolor)]">
      <form onSubmit={handleSubmit}>
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Basic Details
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--color-subtext)]">
              Card Visibility
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={basicDetails.cardVisibility}
                onChange={(e) => onChange("cardVisibility", e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-[var(--color-secondarybgcolor)] rounded-full peer peer-checked:bg-[var(--color-primary)] 
                after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                after:bg-[var(--color-bgcolor)] after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all peer-checked:after:translate-x-full"
              ></div>
            </label>
          </div>
        </div>

        {/* 2-column form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={basicDetails.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={basicDetails.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobilenumber"
              placeholder="Enter your mobile number"
              value={basicDetails.mobilenumber}
              onChange={handlePhoneChange}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Enter your job title"
              value={basicDetails.jobTitle}
              onChange={(e) => onChange("jobTitle", e.target.value)}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Company / Organization
            </label>
            <input
              type="text"
              name="organization"
              placeholder="Enter company name"
              value={basicDetails.organization}
              onChange={(e) => onChange("organization", e.target.value)}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={basicDetails.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="w-full border rounded-lg p-2 border-[var(--color-highlight)] focus:border-[var(--color-subtext)] text-[var(--color-text)] outline-none"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
