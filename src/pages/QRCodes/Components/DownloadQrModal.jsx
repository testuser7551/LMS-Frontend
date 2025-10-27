import React from "react";
import { Download } from "lucide-react";

const DownloadQrModal = ({ isOpen, onClose, qrImageUrl, qrName }) => {
  if (!isOpen) return null;


   const handleDownload = async () => {
  if (!qrImageUrl) return;

  try {
    // Fetch the QR image as blob
    const response = await fetch(qrImageUrl);
    const blob = await response.blob();

    // Create a temporary link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Extract file name from URL or default
    const fileName = qrImageUrl.split("/").pop() || "qr-code.png";
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release object URL
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download QR code:", err);
    alert("Download failed. Try opening the image in a new tab.");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-80 max-w-full relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-4 text-center">Download QR Code</h2>

        {/* QR Code Image */}
        <div className="flex justify-center mb-4">
          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt={qrName}
              className="w-40 h-40 object-contain rounded-md border"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md border">
              No QR
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={handleDownload}
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadQrModal;
