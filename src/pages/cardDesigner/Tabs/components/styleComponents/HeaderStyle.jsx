// src/pages/cardDesigner/Tabs/components/styleComponents/HeaderStyle.jsx
import React, { useEffect, useState } from "react";
import { saveHeaderSection } from "../../../../../api/carddesign/styleSection";

const HeaderStyle = ({ profile, onChange }) => {
  const options = ["left", "center", "right"];
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveHeaderSection(profile.headerStyle); // send current style to backend
      alert("✅ Header style saved!");
    } catch (err) {
      //console.error("Save header style error:", err);
      alert("❌ Failed to save header style");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h3 className="text-base font-semibold text-[var(--color-headtext)] font-outfit">Header Style</h3>

      <div className="flex items-center justify-between gap-4 mt-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange("headerStyle", option)}
            className={`flex-1 h-14 rounded-md border flex items-center justify-center font-medium font-poppins
              transition-all duration-200 ease-in-out
              ${
                profile.headerStyle === option
                  ? "border-[var(--color-primary)] ring-2 ring-[var(--color-activecolor)] bg-[var(--color-activecolor)] text-[var(--color-headcolor)]"
                  : "border-gray-300 text-gray-600 hover:border-[var(--color-secondary)] hover:bg-[var(--color-subbgcolor)] hover:text-[var(--color-headcolor)]"
              }`}
          >
            <span className="capitalize">{option}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
            <button
              type="submit"
              onClick={handleSave}
              className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
    </div>
  );
};

export {HeaderStyle};
