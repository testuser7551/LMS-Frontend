import React from "react";

const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl z-50 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-primary mb-2">Success</h3>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
