import React, { useEffect, useState } from "react";
import {
  updateWhatsappButton,
} from "../../../../../api/carddesign/aboutSection";
import {showToast} from "../../../../../components/toast.js";


const WhatsAppButton = ({whatsappButton,onChange}) => {
  const handleSave = async () => {
    try {
      const saved = await updateWhatsappButton( whatsapp);
      // setWhatsapp(saved);
      showToast('WhatsApp Button saved!', "top-center", 5000, "dark");
    } catch (err) {
      //console.error("❌ Save WhatsApp error:", err);
      showToast('Failed to save WhatsApp Button', "top-center", 5000, "dark");
    }
  };

  return (
    <div className="mb-8 bg-[var(--color-bgcolor)] p-4 rounded-lg shadow border border-[var(--color-secondarybgcolor)]">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-headcolor)]">
          WhatsApp Button
        </h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={whatsappButton.isEnabled}
            // onChange={(e) =>
            //   setWhatsapp({ ...whatsapp, isEnabled: e.target.checked })
            // }
            onChange={(e) => onChange("isEnabled", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--color-secondarybgcolor)] rounded-full peer peer-checked:bg-[var(--color-primary)] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[var(--color-bgcolor)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
        </label>
      </div>
        <>
          {/* WhatsApp Number */}
          <div className="mb-4">
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="Enter WhatsApp number"
              value={whatsappButton.whatsappNumber}
              // onChange={(e) =>
              //   setWhatsapp({ ...whatsapp, whatsappNumber: e.target.value })
              // }
              onChange={(e) => onChange("whatsappNumber", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Default Message */}
          <div className="mb-4">
            <label className="block text-sm text-[var(--color-subtext)] mb-1">
              Message
            </label>
            <input
              type="text"
              placeholder="Enter default message"
              value={whatsappButton.message}
              // onChange={(e) =>
              //   setWhatsapp({ ...whatsapp, message: e.target.value })
              // }
              onChange={(e) => onChange("message", e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors"
            >
              Save
            </button>
          </div>
        </>
    </div>
  );
};

export default WhatsAppButton;
