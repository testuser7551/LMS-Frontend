
import React, { useContext } from "react";
import { saveBannerImgSection } from "../../../../../api/carddesign/styleSection";
import FileDropzone from "../../../../courses/FileDropzone"; // adjust path if needed
import { CardContext } from '../../../../../context/CardContext';
import {showToast} from "../../../../../components/toast";
const API_BASE = import.meta.env.VITE_API_BASE;

const BannerPhoto = ({ bannerFile, bannerPreview, handleBannerChange }) => {
  const { userCard } = useContext(CardContext);
  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (bannerFile && bannerFile !== "") {
        // new file upload
        formData.append("bannerImg", bannerFile);
      } else {
        // send empty to trigger delete
        formData.append("bannerImg", "");
      }
      if (userCard?.user_id) {
        formData.append("user_id", userCard.user_id);
      }

      await saveBannerImgSection(formData);
      showToast(" Banner saved!","top-center",10000,"dark");
    } catch (err) {
      showToast("Failed to save banner","top-center",10000,"dark");
    }
  };
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <label className="font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
        Banner Photo
      </label>

      <FileDropzone
        file={bannerFile}
        setFile={handleBannerChange}
        accept="image/*"
      />

      {bannerPreview && (
        <div className="mt-4">
          <img
            src={
              bannerPreview.startsWith("blob:")
                ? bannerPreview
                : `${API_BASE}${bannerPreview}`
            }
            alt="Banner Preview"
            className="w-full h-40 object-cover rounded-lg border"
          />
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        {bannerPreview && (
          <button
            onClick={() => {
              handleBannerChange("");
            }}
            className="px-5 py-2 rounded-lg font-medium shadow transition font-outfit cursor-pointer"
            style={{
              backgroundColor: "var(--color-danger)",
              color: "var(--color-bgcolor)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#e65f53")
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-danger)")
            }
          >
            Remove
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
        >
          Save
        </button>

      </div>
    </div>
  );
};

export { BannerPhoto };
