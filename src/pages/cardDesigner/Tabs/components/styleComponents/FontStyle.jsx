import Select from "react-select";
import React, { useState, useContext } from "react";
import { saveFontSection } from "../../../../../api/carddesign/styleSection";
import { CardContext } from '../../../../../context/CardContext';
import {showToast} from "../../../../../components/toast";
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
  const { userCard } = useContext(CardContext);
  const selectedOption = fonts.find((f) => f.value === fontFamily) || fonts[0];
  const [saving, setSaving] = useState(false);


  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        fontStyle: selectedOption.value,
        user_id: userCard?.user_id || "",
      };
      await saveFontSection(payload);
      showToast("✅ Font style saved!","top-center",10000,"dark");
    } catch (err) {
      //console.error("Save font style error:", err);
      showToast("❌ Failed to save font style","top-center",10000,"dark");
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
