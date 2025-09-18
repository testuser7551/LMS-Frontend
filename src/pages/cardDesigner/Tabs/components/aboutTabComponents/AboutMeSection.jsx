import React, { useState } from "react";
import { X } from "lucide-react";
import {
  updateContentAbout,
} from "../../../../../api/carddesign/contentSection";
import { showToast } from "../../../../../components/toast.js";

function AboutMeSection({ textSection, onChange }) {

  const handleSave = async () => {
    try {
      if (textSection.isEnabled) {
        // ✅ Simple validation
        if (!textSection.heading?.trim()) {
          showToast('Heading Required', "top-center", 3000, "dark");
          return;
        }
        if (!textSection.title?.trim()) {
          showToast('Title  Required', "top-center", 3000, "dark");
          return;
        }
        if (!textSection.content?.trim()) {
          showToast('Content  Required', "top-center", 3000, "dark");
          return;
        }

        //  Proceed with saving
        const saved = await updateContentAbout(textSection);
        showToast('About Section saved successfully!', "top-center", 3000, "dark");
      }else{
        showToast('Enable About Me to Save', "top-center", 3000, "dark");
        return;
      }
    } catch (err) {
      showToast('Failed to save About Section', "top-center", 3000, "dark");
    }
  }

  return (
    <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit">
          About Me Section
        </h4>
        <div>
          {/* Enable/Disable Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={textSection.isEnabled}
              name="isEnabled"
              onChange={(e) => onChange("isEnabled", e.target.checked)}
              className="sr-only"
            />
            <span
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${textSection.isEnabled
                ? "bg-[var(--color-btn-primary)]"
                : "bg-[var(--color-btn-secondary)]"
                }`}
            >
              <span
                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${textSection.isEnabled ? "translate-x-5" : ""
                  }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Inputs */}
      <input
        type="text"
        value={textSection.heading}
        name="heading"
        onChange={(e) => onChange("heading", e.target.value)}
        placeholder="Heading"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
      />
      <input
        type="text"
        value={textSection.title}
        name="title"
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
      />
      <textarea
        rows={3}
        value={textSection.content}
        onChange={(e) => onChange("content", e.target.value)}
        placeholder="Write something..."
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-2 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
      />

      {/* Save button */}
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

export { AboutMeSection };
