import React, { useEffect, useState, useContext } from "react";
import {
  updateWhatsappButton,
} from "../../../../../api/carddesign/aboutSection";
import { showToast } from "../../../../../components/toast.js";
import { CardContext } from '../../../../../context/CardContext';


const WhatsAppButton = ({ whatsappButton, onChange }) => {
  const { userCard } = useContext(CardContext);
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
    const mobile = whatsappButton?.whatsappNumber;
    if (mobile == null) return;

    const mobileStr = String(mobile);

    // Only format if it's raw 10 digits (from DB) — avoids re-formatting formatted string
    if (/^\d{10}$/.test(mobileStr)) {
      onChange("whatsappNumber", formatPhoneNumber(mobileStr));
    }
  }, [whatsappButton?.whatsappNumber, onChange]);

  const handleSave = async () => {
    if (!whatsappButton?.isEnabled) {
      showToast("Please Enable Whatsapp Button and Save", "top-center", 4000, "dark");
      return;
    }
    if (whatsappButton?.isEnabled) {
      if (!whatsappButton?.whatsappNumber.trim()) {
        showToast("Whatsapp Number and Message Required", "top-center", 4000, "dark");
        return;
      }
      if (!validateUSPhone(whatsappButton?.whatsappNumber)) {
        showToast("Invalid phone number! Format: (123) 456-7890", "top-center", 4000, "dark");
        return;
      }
      try {
        const cleanedNumber = whatsappButton?.whatsappNumber.replace(/\D/g, "");
        const payload = {
          whatsappButton: {
            ...whatsappButton,
            whatsappNumber: cleanedNumber, // ✅ store digits only in DB
          },
          user_id: userCard?.user_id || "",
        };
        const saved = await updateWhatsappButton(payload);
        // setWhatsapp(saved);
        showToast('WhatsApp Button saved!', "top-center", 5000, "dark");
      } catch (err) {
        //console.error("❌ Save WhatsApp error:", err);
        showToast('Failed to save WhatsApp Button', "top-center", 5000, "dark");
      }
    }
  };
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange("whatsappNumber", formatted);
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
            onChange={handlePhoneChange}
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
