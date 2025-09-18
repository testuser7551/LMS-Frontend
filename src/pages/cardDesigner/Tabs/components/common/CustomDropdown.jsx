import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CustomDropdown = ({
  label,
  options,
  value,
  onChange,
  width = "w-64",
  getOptionLabel = (option) => option.label || option.categoryName,
  getOptionValue = (option) => option.value || option.categoryName,
  placeholder = "Select an option",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleScroll = (event) => {
      // Check if the scroll is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // use capture phase

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block mb-1 font-popins text-primary font-poppins">{label}</label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between ${width} h-10 border border-[var(--color-secondarybgcolor)] bg-white px-4 py-3 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 font-medium transition cursor-pointer`}
      >
        <div className="text-md text-[var(--color-headtext)] font-poppins">{value || placeholder}{" "}</div>
        <div>
          {open ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Dropdown Options */}
      {open && (
        <div
          className={`absolute mt-2 ${width} bg-white border border-gray-200 rounded-lg shadow-lg z-20 h-40 overflow-scroll overflow-x-hidden`}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(getOptionValue(opt));
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-50 hover:text-primary font-semibold transition"
            >
              {getOptionLabel(opt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
