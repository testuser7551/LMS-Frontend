// // src/pages/cardDesigner/Tabs/components/styleComponents/BannerPhoto.jsx
// import React from "react";

// const BannerPhoto = ({ bannerImgUrl, onChange }) => {
//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       {/* Header */}
//       <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-4 font-outfit">
//         Banner Photo
//       </h3>

//       {/* Banner Upload Box */}
//       <div className="border-2 border-dashed border-gray-300 rounded-lg w-full h-40 flex items-center justify-center relative overflow-hidden">
//         {bannerImgUrl ? (
//           <div className="w-full h-full relative">
//             <img
//               src={bannerImgUrl}
//               alt="Banner"
//               className="w-full h-full object-cover rounded-lg"
//             />
//             {/* Remove Button */}
//             <button
//               onClick={() => onChange(null)}
//               className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-md shadow hover:opacity-80 transition font-poppins"
//             >
//               Remove
//             </button>
//           </div>
//         ) : (
//           <label className="flex items-center gap-2 bg-activecolor text-gray-700 px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-primary hover:text-white transition font-poppins">
//             + Add
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const imageUrl = URL.createObjectURL(file);
//                   onChange(imageUrl);
//                 }
//               }}
//             />
//           </label>
//         )}
//       </div>
      
      
//     </div>
//   );
// };

// export  {BannerPhoto};


// src/pages/cardDesigner/Tabs/components/styleComponents/BannerPhoto.jsx
// import React from "react";
// import { saveBannerImgSection } from "../../../../../api/profileSection";
// import FileDropzone from "../../../../courses/FileDropzone"; // adjust path if needed

// const BannerPhoto = ({ banner, handleBannerChange }) => {

//   const handleSave = async () => {
//     try {
//       if (!banner) return alert("Please select a banner image first");
//       await saveBannerImgSection(banner); // 🔥 call API
      
//     } catch (err) {
//       //console.error("❌ Failed to save banner:", err);
//     }
//   };
//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       <label className="font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
//         Banner Photo
//       </label>

//       <FileDropzone
//         file={banner}
//         setFile={handleBannerChange}
//         accept="image/*"
//       />

//       <div className="mt-6 flex justify-end">
//         <button
//           type="submit"
//           onClick={handleSave}
//           className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export { BannerPhoto };

import React from "react";
import { saveBannerImgSection } from "../../../../../api/carddesign/styleSection";
import FileDropzone from "../../../../courses/FileDropzone"; // adjust path if needed

const BannerPhoto = ({ bannerFile, bannerPreview, handleBannerChange }) => {
  const handleSave = async () => {
    try {
      if (!bannerFile) return alert("Please select a banner image first");

      const formData = new FormData();
      formData.append("bannerImg", bannerFile); // ✅ key must match backend

      await saveBannerImgSection(formData);
      alert("✅ Banner saved!");
    } catch (err) {
      alert("❌ Failed to save banner");
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
            src={bannerPreview}
            alt="Banner Preview"
            className="w-full h-40 object-cover rounded-lg border"
          />
        </div>
      )}

      <div className="mt-6 flex justify-end">
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
