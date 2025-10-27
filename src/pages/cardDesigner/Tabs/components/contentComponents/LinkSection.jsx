import React, { useState,useContext } from "react";
import { X } from "lucide-react";
import {
  updateLinkSection,
} from "../../../../../api/carddesign/contentSection";
import { showToast } from "../../../../../components/toast.js";
import { CardContext } from '../../../../../context/CardContext';

function LinkSection({ linkSection, onChange }) {

const { userCard } = useContext(CardContext);
  const handleSave = async () => {
    try {
      // ✅ Simple validation
      if (!linkSection.title?.trim()) {
        showToast('Title Required', "top-center", 5000, "dark");
        return;
      }
      if (!linkSection.link?.trim()) {
        showToast('Link Required', "top-center", 5000, "dark");
        return;
      }
      const payload = {
          linkSection: linkSection,
          user_id: userCard?.user_id || "",
        };
      //  Proceed with saving
      const saved = await updateLinkSection(payload);
      showToast('Link Section saved successfully!', "top-center", 5000, "dark");
    } catch (err) {
      showToast('Failed to save Link Section', "top-center", 5000, "dark");
    }
  }

  return (
    <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          Link Section
        </h4>
        <div className="flex items-center gap-3">
          {/* Enable/Disable Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={linkSection.isEnabled}
              name="isEnabled"
              onChange={(e) => onChange("isEnabled", e.target.checked)}
              className="sr-only"
            />
            <span
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${linkSection.isEnabled
                ? "bg-[var(--color-btn-primary)]"
                : "bg-[var(--color-btn-secondary)]"
                }`}
            >
              <span
                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${linkSection.isEnabled ? "translate-x-5" : ""
                  }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Inputs */}
      <input
        type="text"
        value={linkSection.title}
        name="title"
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
      />
      <input
        type="url"
        value={linkSection.link}
        name="link"
        onChange={(e) => onChange("link", e.target.value)}
        placeholder="https://example.com"
        className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
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

export { LinkSection };
