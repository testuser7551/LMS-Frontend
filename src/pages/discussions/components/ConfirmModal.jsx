import React from "react";
import { X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm",
  message = "Are you sure?",
  buttons = [
    // Example:
    // { text: "Cancel", onClick: () => {}, color: "bg-gray-200", textColor: "text-gray-700" },
    // { text: "Delete", onClick: () => {}, color: "bg-red-600", textColor: "text-white" },
  ],
  onClose, // optional: for X button
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={`px-4 py-2 rounded-lg ${
                btn.textColor || "text-white"
              } hover:opacity-90 transition ${btn.color || "bg-blue-600"}`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;