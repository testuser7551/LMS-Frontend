
import React, { useState ,useContext} from "react";
import { X } from "lucide-react";
import FileDropzone from "../../../components/FileDropzone";
import { savePhotoSectionAPI, deletePhotoAPI } from "../../../../../api/carddesign/contentSection";
import { CardContext } from '../../../../../context/CardContext';
import {showToast} from "../../../../../components/toast";
const PhotosSection = ({ photoSection, onChange }) => {
  const { userCard } = useContext(CardContext);
  const [localData, setLocalData] = useState(
    photoSection || { imgUrls: [], photos: [], isEnabled: true }
  );
  const [selectedFiles, setSelectedFiles] = useState([]); // real File objects
  const [uploading, setUploading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE;

  // ✅ Add new photos
  const handleAddPhotos = (files) => {
    const fileArray = Array.from(files);
    const blobs = fileArray.map((file) => URL.createObjectURL(file));

    const updated = {
      ...localData,
      photos: [...(localData.photos || []), ...blobs],
    };
    setLocalData(updated);
    setSelectedFiles((prev) => [...prev, ...fileArray]);
    onChange("photos", updated.photos);
  };

  // ✅ Save to backend
  const handleSave = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please add at least one photo before saving!","top-center",10000,"dark");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("photos", file));
      formData.append("isEnabled", localData.isEnabled);
      if (userCard?.user_id) {
        formData.append("user_id", userCard.user_id);
      }

      const result = await savePhotoSectionAPI(formData);

      // const updated = {
    //   ...localData,
      //   imgUrls: result.photoSection.imgUrls, // backend URLs
      //   photos: [], // clear previews
      // };

      // setLocalData(updated);
      setSelectedFiles([]);
      // onChange( "photos", updated.photos);
      // onChange("imgUrls", updated.imgUrls);
      showToast("Photos uploaded","top-center",10000,"dark");
    } catch (err) {
      // console.error("Photos save failed:", err);
      showToast("Failed to save photos","top-center",10000,"dark");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete photo
  const handleDelete = async (photoUrl, index, isBlob = false) => {
    if (isBlob) {
      // remove preview before saving
      const updatedPhotos = localData.photos.filter((_, i) => i !== index);
      setLocalData({ ...localData, photos: updatedPhotos });
      setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
      onChange("photos", updatedPhotos);
      showToast("Photos deleted","top-center",10000,"dark");

      return;
    }

    try {
      const filename = photoUrl.split("/").pop();
      const payload = {
          filename: filename,
          user_id: userCard?.user_id || "",
        };

      await deletePhotoAPI(payload);

      const updatedUrls = localData.imgUrls.filter((_, i) => i !== index);
      const updated = { ...localData, imgUrls: updatedUrls };
      setLocalData(updated);
      onChange("imgUrls", updatedUrls);
      showToast("Photos deleted","top-center",10000,"dark");

    } catch (err) {
      // console.error("Delete photo failed:", err);
      showToast("Failed to delete photo","top-center",10000,"dark");
    }
  };
  return (
    <div className="bg-[var(--color-bgcolor)] rounded-lg p-4 mt-4 shadow border border-[var(--color-secondarybgcolor)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          Photos Section
        </h3>
        {/* Toggle */}
        <label className="flex items-center cursor-pointer">
          <input                                                                                                                                                                                                                                                                                                                      
            type="checkbox"
            checked={localData.isEnabled}
            onChange={(e) => {
              const updated = { ...localData, isEnabled: e.target.checked };
              setLocalData(updated);
              onChange("isEnabled", e.target.checked);
            }}
            className="sr-only"
          />
          <span
            className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              localData.isEnabled
                ? "bg-[var(--color-btn-primary)]"
                : "bg-[var(--color-btn-secondary)]"
            }`}
          >
            <span
              className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                localData.isEnabled ? "translate-x-5" : ""
              }`}
            />
          </span>
        </label>
      </div>

      {/* Upload */}
      <FileDropzone
        file={null}
        multiple={true}
        setFile={handleAddPhotos}
        accept="image/*"
      />

      {/* Saved + Preview Photos */}
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* saved photos */}
        {(localData.imgUrls || []).map((photo, i) => {
          const fullUrl = photo.startsWith("http") ? photo : `${API_BASE}${photo}`;
          return (
            <div key={`saved-${i}`} className="relative">
              <img
                src={fullUrl}
                alt={`Saved ${i}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                onClick={() => handleDelete(photo, i, false)}
                className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}

        {/* preview photos */}
        {(localData.photos || []).map((preview, i) => (
          <div key={`preview-${i}`} className="relative">
            <img
              src={preview}
              alt={`Preview ${i}`}
              className="w-32 h-32 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(preview, i, true)}
              className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Save */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSave}
          disabled={uploading}
          className={`bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export { PhotosSection };

