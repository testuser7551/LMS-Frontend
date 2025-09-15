// import React from "react";
// import {
//   fetchMainButton,
//   saveMainButton,
//   deleteMainButton,
// } from "../../../../../api/mainbutton";

// const getDefaultButtonText = (type) => {
//   switch (type) {
//     case "call":
//       return "Call Now";
//     case "email":
//       return "Mail Me";
//     case "link":
//       return "Visit Link";
//     case "whatsapp":
//       return "Chat on WhatsApp";
//     default:
//       return "Click Me";
//   }
// };
// const getButtonInputLabel = (type) => {
//   switch (type) {
//     case "call":
//       return "Phone Number";
//     case "email":
//       return "Email Address";
//     case "link":
//       return "Website URL";
//     case "whatsapp":
//       return "WhatsApp Number";
//     default:
//       return "Button Input";
//   }
// };

// const getDefaultButtonInput = (type) => {
//   switch (type) {
//     case "call":
//       return ""; // default phone prefix
//     case "email":
//       return "example@email.com";
//     case "link":
//       return "https://";
//     case "whatsapp":
//       return ""; // WhatsApp number prefix
//     default:
//       return "";
//   }
// };
// // 👇 dynamic label mapper
// const getButtonTextLabel = (type) => {
//   switch (type) {
//     case "call":
//       return "Call Button Text";
//     case "email":
//       return "Email Button Text";
//     case "link":
//       return "Link Button Text";
//     case "whatsapp":
//       return "WhatsApp Button Text";
//     default:
//       return "Button Text";
//   }
// };
// const MainButton = ({ mainButton, onChange }) => {

//   const handleSave = async () => {
//     try {
//       const saved = await saveMainButton(mainButton);
//       alert("✅ Main button saved!");
//     } catch (err) {
//       //console.error("❌ Save error:", err);
//       alert("Failed to save main button");
//     }
//   };

//   return (
//     <div className="mb-8 bg-[var(--color-bgcolor)] p-4 rounded-lg shadow border border-[var(--color-secondarybgcolor)]">
//       <h2 className="text-lg font-semibold mb-3 text-[var(--color-headcolor)]">
//         Main Button
//       </h2>

//       {/* Button Type + Text */}
//       <div className="flex gap-4 mb-4">
//         {/* Button Type */}
//         <div className="flex-1">
//           <label className="block text-sm text-[var(--color-subtext)] mb-1">
//             Button Type
//           </label>
//           <select
//             value={mainButton.buttonType}
//             onChange={(e) => onChange("buttonType", e.target.value)}
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="call">Call</option>
//             <option value="email">Email</option>
//             <option value="link">Link</option>
//             <option value="whatsapp">WhatsApp</option>
//           </select>
//         </div>

//         {/* Button Text */}
//         <div className="flex-1">
//           <label className="block text-sm text-[var(--color-subtext)] mb-1">
//             Button Text
//           </label>
//           <input
//             type="text"
//             placeholder={getDefaultButtonText(mainButton.buttonType)}
//             value={mainButton.buttonText || getDefaultButtonText(mainButton.buttonType)}
//             onChange={(e) => onChange("buttonText", e.target.value)}
//             className="w-full border rounded-lg p-2 mb-4"
//           />
//         </div>
//       </div>

//       {/* Button Value */}
//       <label className="block text-sm text-[var(--color-subtext)] mb-1">
//         {getButtonTextLabel(mainButton.buttonType)}
//       </label>
//       <input
//         type="text"
//         value={mainButton.buttonInput}
//         placeholder={getDefaultButtonInput(mainButton.buttonType)}
//         onChange={(e) => onChange("buttonInput", e.target.value)}
//         className="w-full border rounded-lg p-2 mb-4"
//       />

//       {/* Save button */}
//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={handleSave}
//           className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MainButton;


import React, { useState } from "react";
import {
  saveMainButton,
} from "../../../../../api/carddesign/aboutSection";
import { showToast } from "../../../../../components/toast.js";

// Centralized button config
const buttonConfig = {
  call: {
    text: "Call Now",
    input: "",
    label: "Phone Number",
  },
  email: {
    text: "Mail Me",
    input: "example@email.com",
    label: "Email Address",
  },
  link: {
    text: "Visit Link",
    input: "https://",
    label: "Website URL",
  },
  whatsapp: {
    text: "Chat on WhatsApp",
    input: "",
    label: "WhatsApp Number",
  },
  default: {
    text: "Click Me",
    input: "",
    label: "Button Input",
  },
}

const getButtonConfig = (type) => buttonConfig[type] || buttonConfig.default;

const MainButton = ({ mainButton, onChange }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!mainButton.buttonInput?.trim() || !mainButton.buttonText?.trim()) {
      showToast('Main Button Text Required!', "top-center", 5000, "dark");
      return
    }
    if (!mainButton.buttonInput?.trim() ) {
      showToast('Main Button Input Required!', "top-center", 5000, "dark");
      return
    }
    try {
      setSaving(true);
      await saveMainButton(mainButton);
      showToast('Main button saved!', "top-center", 5000, "dark");
    } catch (err) {
      showToast('Failed to save main button!', "top-center", 5000, "dark");
    } finally {
      setSaving(false);
    }
  };

  const { text, input, label } = getButtonConfig(mainButton.buttonType);

  return (
    <div className="mb-8 bg-[var(--color-bgcolor)] p-4 rounded-lg shadow border border-[var(--color-secondarybgcolor)]">
      <h2 className="text-lg font-semibold mb-3 text-[var(--color-headcolor)]">
        Main Button
      </h2>

      {/* Button Type + Text */}
      <div className="flex gap-4 mb-4">
        {/* Button Type */}
        <div className="flex-1">
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Button Type
          </label>
          <select
            value={mainButton.buttonType}
            onChange={(e) => onChange("buttonType", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="link">Link</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        {/* Button Text */}
        <div className="flex-1">
          <label className="block text-sm text-[var(--color-subtext)] mb-1">
            Button Text
          </label>
          <input
            type="text"
            placeholder={text}
            value={
              mainButton.buttonText !== undefined && mainButton.buttonText !== null
                ? mainButton.buttonText
                : text
            }
            onChange={(e) => onChange("buttonText", e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
        </div>
      </div>

      {/* Button Input */}
      <label className="block text-sm text-[var(--color-subtext)] mb-1">
        {label}
      </label>
      <input
        type="text"
        value={mainButton.buttonInput}
        placeholder={input}
        onChange={(e) => onChange("buttonInput", e.target.value)}
        className="w-full border rounded-lg p-2 mb-4"
      />

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

