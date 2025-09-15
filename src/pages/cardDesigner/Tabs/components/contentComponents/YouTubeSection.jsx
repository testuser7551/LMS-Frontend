import React, { useState } from "react";
import { X } from "lucide-react";
import {
  updateYouTubeSection,
} from "../../../../../api/carddesign/contentSection";


function YouTubeSection({ youTubeSection, onChange }) {
  
  const handleSave = async () => {
    try {
      // ✅ Simple validation
      if (!youTubeSection.title?.trim()) {
        alert(" Title cannot be empty");
        return;
      }
      if (!youTubeSection.link?.trim()) {
        alert(" Link cannot be empty");
        return;
      }
      //  Proceed with saving
      const saved = await updateYouTubeSection(youTubeSection);

      
      alert("YouTube Section  saved successfully!");
    } catch (err) {
      //console.error("YouTube Section  error:", err);
      alert("Failed to save YouTube Section ");
    }
  }


  return (
    <div className="bg-[var(--color-bgcolor)] rounded-lg p-4 shadow-sm mt-4 border border-[var(--color-secondarybgcolor)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          YouTube Section
        </h4>
        <div className="flex items-center gap-3">
          {/* Enable/Disable Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={youTubeSection.isEnabled}
              onChange={(e) => onChange("isEnabled", e.target.checked)}
              className="sr-only"
            />
            <span
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${youTubeSection.isEnabled
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-secondarybgcolor)]"
                }`}
            >
              <span
                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${youTubeSection.isEnabled ? "translate-x-5" : ""
                  }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Inputs */}
      <input
        type="text"
        value={youTubeSection.title || ""}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Video Title"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)]"
      />
      <input
        type="text"
        value={youTubeSection.link || ""}
        onChange={(e) => onChange("link", e.target.value)}
        placeholder="YouTube URL"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)]"
      />
      {/* Save */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSave}
          className="bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export { YouTubeSection };
