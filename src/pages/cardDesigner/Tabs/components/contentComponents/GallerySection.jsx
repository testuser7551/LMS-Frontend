
import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import FileDropzone from "../../../components/FileDropzone";
import { saveGalleryImageAPI } from "../../../../../api/carddesign/contentSection"; // API call
import { showToast } from "../../../../../components/toast.js";
import { CardContext } from '../../../../../context/CardContext';

function GallerySection({ gallerySections, onChange }) {
  const { userCard } = useContext(CardContext);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ real file state

  const handleSave = async () => {
    try {
      // If no file selected & no existing image → block save
      if (!selectedFile && !gallerySections?.image) {
        showToast('Please upload an image before saving!', "top-center", 5000, "dark");
        return;
      }

      setUploading(true);

      const formData = new FormData();

      if (selectedFile) {
        formData.append("image", selectedFile); // send file if new one selected
      }
      formData.append("isEnabled", gallerySections?.isEnabled);

      // Optional link
      if (gallerySections?.link) {
        formData.append("link", gallerySections?.link);
      }
      // ✅ Add user_id if available
      if (userCard?.user_id) {
        formData.append("user_id", userCard.user_id);
      }
      const result = await saveGalleryImageAPI(formData);
      showToast('Gallery Section saved successfully!', "top-center", 5000, "dark");
    } catch (err) {
      console.error("Gallery save failed:", err);
      showToast('Failed to save Gallery Section', "top-center", 5000, "dark");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="bg-[var(--color-bgcolor)] rounded-lg p-4 shadow border border-[var(--color-secondarybgcolor)] mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          Gallery Section
        </h3>
        <div className="flex items-center gap-3">
          {/* Enable/Disable Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={gallerySections?.isEnabled}
              onChange={(e) => onChange("isEnabled", e.target.checked)}
              className="sr-only"
            />
            <span
              className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${gallerySections?.isEnabled
                ? "bg-[var(--color-btn-primary)]"
                : "bg-[var(--color-btn-secondary)]"
                }`}
            >
              <span
                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${gallerySections?.isEnabled ? "translate-x-5" : ""
                  }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-3">
        {!gallerySections?.image ? (
          <FileDropzone
            file={null}
            setFile={(file) => {
              setSelectedFile(file); //  keep real file for upload
              const url = URL.createObjectURL(file);
              onChange("image", url); // preview URL
            }}
            accept="image/*"
          />
        ) : (
          <div className="relative w-40 h-40">
            <img
              src={gallerySections?.image}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border border-[var(--color-secondarybgcolor)]"
            />
            <button
              onClick={() => {
                onChange("image", null);
                setSelectedFile(null); // reset file state
              }}
              className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Optional Link Input */}
        {/* <input
          type="text"
          value={gallerySections.link || ""}
          onChange={(e) => onChange("link", e.target.value)}
          placeholder="Enter optional link"
          className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
        /> */}
        {gallerySections?.imgUrl && (
          <p className="text-sm font-Poppins text-[var(--color-subtext)] break-all">
            {gallerySections?.imgUrl.split("/").pop()}
          </p>
        )}

        {/* Save button */}
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSave}
            disabled={uploading}
            className={`bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer ${uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { GallerySection };

