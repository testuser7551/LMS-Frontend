// // src/pages/cardDesigner/Tabs/components/styleComponents/FontStyle.jsx
// import React from "react";

// const fonts = [
//   { label: "Inter", value: "Inter, sans-serif" },
//   { label: "Roboto", value: "Roboto, sans-serif" },
//   { label: "Open Sans", value: "'Open Sans', sans-serif" },
//   { label: "Lato", value: "Lato, sans-serif" },
//   { label: "Poppins", value: "Poppins, sans-serif" },
// ];

// const FontStyle = ({ fontFamily, onChange }) => {
//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       <h3 className="text-base font-semibold text-[var(--color-headtext)] mb-3 font-outfit">
//         Font
//       </h3>

//       <select
//         value={fontFamily || fonts[0].value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[var(--color-bgcolor)]
//              text-[var(--color-text)] font-medium focus:ring-2
//              focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]
//              appearance-none font-poppins transition duration-200
//              bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
//       >
//         {fonts.map((font) => (
//           <option key={font.value} value={font.value}>
//             {font.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default FontStyle;

import Select from "react-select";
import React, { useState } from "react";
import { saveFontSection } from "../../../../../api/carddesign/styleSection";

const fonts = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Lato", value: "Lato, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "var(--color-bgcolor)",
    borderColor: "var(--color-primary)",
    color: "var(--color-text)",
    fontFamily: "Poppins, sans-serif",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "var(--color-activecolor)" : "white",
    color: state.isFocused ? "var(--color-primary)" : "var(--color-text)",
    fontFamily: "Poppins, sans-serif",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--color-text)",
    fontFamily: "Poppins, sans-serif",
  }),
};

const FontStyle = ({ fontFamily, onChange }) => {
  const selectedOption = fonts.find((f) => f.value === fontFamily) || fonts[0];
  const [saving, setSaving] = useState(false);


  const handleSave = async () => {
    try {
      setSaving(true);
      await saveFontSection(selectedOption.value);
      alert("✅ Font style saved!");
    } catch (err) {
      //console.error("Save font style error:", err);
      alert("❌ Failed to save font style");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h3 className="text-base font-semibold text-[var(--color-headtext)] mb-3 font-outfit">
        Font
      </h3>

      <Select
        options={fonts}
        value={selectedOption}
        onChange={(selected) => onChange(selected.value)}
        styles={customStyles}
      />
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

export { FontStyle };
