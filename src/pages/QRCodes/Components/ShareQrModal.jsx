import React, { useState } from "react";
import { Copy } from "lucide-react";

const ShareQrModal = ({ isOpen, onClose, qrLink }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;


  const handleCopy = () => {
    if (!qrLink) return;

    if (navigator.clipboard && window.isSecureContext) {
      // Modern approach
      navigator.clipboard.writeText(qrLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error("Clipboard failed:", err));
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = qrLink;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Fallback: Unable to copy", err);
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-96 max-w-full relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2 text-center">Share QR Code</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 text-center">
          Share the link below with others, such as a printing agency, to download and print the QR code.
        </p>

        {/* Link input */}
        <div className="flex items-center border rounded-md overflow-hidden mb-4">
          <input
            type="text"
            value={qrLink || ""}
            readOnly
            className="flex-1 px-3 py-2 focus:outline-none"
          />
          <button
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            onClick={handleCopy}
          >
            <Copy size={16} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareQrModal;
