
import React, { useState, useEffect, useContext } from "react";
import { saveMainButton } from "../../../../../api/carddesign/aboutSection";
import { showToast } from "../../../../../components/toast.js";
import { CardContext } from '../../../../../context/CardContext';

const MainButton = ({ mainButton, onChange }) => {
  const { userCard } = useContext(CardContext);
  const [saving, setSaving] = useState(false);

  // Initialize defaults on first load
  useEffect(() => {
    if (!mainButton.buttonType) {
      onChange("buttonType", "call");
      onChange("buttonText", "Call Me");
      onChange("buttonInput", "tel:+919999999999");
    }
  }, []);

  // ✅ Clear fields when buttonType changes
  // useEffect(() => {
  //   onChange("buttonText", "");
  //   onChange("buttonInput", "");
  // }, [mainButton?.buttonType]);

  // ✅ Validation placeholder
  const validateFields = () => {
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      setSaving(true);

      const payload = {
        mainButton: mainButton,
        user_id: userCard?.user_id || "",
      };
      await saveMainButton(payload);

      showToast("Main button saved!", "top-center", 5000, "dark");
    } catch (err) {
      showToast("Failed to save main button!", "top-center", 5000, "dark");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-8 bg-[var(--color-bgcolor)] p-4 rounded-lg shadow border border-[var(--color-secondarybgcolor)]">
      <h2 className="text-lg font-semibold mb-3 text-[var(--color-headcolor)]">
        Main Button
      </h2>

      {/* Dropdown */}
      <div className="mb-4">
        <label className="block text-sm text-[var(--color-subtext)] mb-1">
          Button Type
        </label>
        <select
          value={mainButton.buttonType || "call"}
          onChange={(e) => onChange("buttonType", e.target.value.toLowerCase())}
          className="w-full border rounded-lg p-2"
        >
          <option value="call">Call</option>
          <option value="email">Email</option>
          <option value="link">Link</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      {/* CALL fields */}
      {mainButton?.buttonType === "call" && (
        <>
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Call Button Text
          </label>
          <input
            type="text"
            placeholder="Call Me"
            value={mainButton.buttonText || ""}
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="tel:+919999999999"
            value={mainButton.buttonInput || ""}
            onChange={(e) => onChange("buttonInput", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
        </>
      )}

      {/* EMAIL fields */}
      {mainButton?.buttonType === "email" && (
        <>
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Email Button Text
          </label>
          <input
            type="text"
            placeholder="Mail Me"
            value={mainButton.buttonText || ""}
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Email Address
          </label>
          <input
            type="text"
            placeholder="example@email.com"
            value={mainButton.buttonInput || ""}
            onChange={(e) => onChange("buttonInput", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
        </>
      )}

      {/* WHATSAPP fields */}
      {mainButton?.buttonType === "whatsapp" && (
        <>
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            WhatsApp Button Text
          </label>
          <input
            type="text"
            placeholder="Chat on WhatsApp"
            value={mainButton.buttonText || ""}
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            WhatsApp Number
          </label>
          <input
            type="text"
            placeholder="+919999999999"
            value={mainButton.buttonInput || ""}
            onChange={(e) => onChange("buttonInput", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
        </>
      )}

      {/* LINK fields */}
      {mainButton?.buttonType === "link" && (
        <>
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Link Button Text
          </label>
          <input
            type="text"
            placeholder="Visit Link"
            value={mainButton.buttonText || ""}
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Website URL
          </label>
          <input
            type="text"
            placeholder="https://example.com"
            value={mainButton.buttonInput || ""}
            onChange={(e) => onChange("buttonInput", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
        </>
      )}

      {/* Save button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg transition-colors ${saving
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] hover:bg-[var(--color-btn-primary-hover)]"
            }`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default MainButton;
