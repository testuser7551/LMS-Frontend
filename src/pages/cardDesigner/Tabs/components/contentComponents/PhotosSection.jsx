
// // import React, { useState } from "react";
// // import { X } from "lucide-react";
// // import FileDropzone from "../../../../courses/FileDropzone";

// // const PhotosSection = ({ section, onUpdate, onDelete, onToggle }) => {
// //   const [localData, setLocalData] = useState(section.data);

// //   const handleChange = (photos) => {
// //     const updated = { ...localData, photos };
// //     setLocalData(updated);
// //     onUpdate(section.id, updated);
// //   };

// //   // ✅ Handle multiple files at once
// //   const handleAddPhotos = (files) => {
// //     const urls = Array.from(files).map((file) => URL.createObjectURL(file));
// //     handleChange([...(localData.photos || []), ...urls]);
// //   };

// //   const handleSave = () => {
// //     //console.log("Saved Photos Section:", JSON.stringify(localData, null, 2));
// //   };

// //   return (
// //     <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-3">
// //         <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
// //           Photos Section
// //         </h3>
// //         <div className="flex items-center gap-3">
// //           {/* Enable/Disable Toggle */}
// //           <label className="flex items-center cursor-pointer">
// //             <input
// //               type="checkbox"
// //               checked={section.enabled}
// //               onChange={() => onToggle(section.id)}
// //               className="sr-only"
// //             />
// //             <span
// //               className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
// //                 section.enabled ? "bg-[#4e4ebc]" : "bg-[#b8b8e9]"
// //               }`}
// //             >
// //               <span
// //                 className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
// //                   section.enabled ? "translate-x-5" : ""
// //                 }`}
// //               />
// //             </span>
// //           </label>
// //         </div>
// //       </div>

// //       {/* Fields */}
// //       <div className="space-y-3">
// //         {/* ✅ FileDropzone now in multiple mode */}
// //         <FileDropzone
// //           file={null}
// //           multiple={true} // enable multiple select
// //           setFile={handleAddPhotos} // now works with bulk files
// //           accept="image/*"
// //         />

// //         {/* Photos Grid */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
// //           {(localData.photos || []).map((photo, i) => (
// //             <div key={i} className="relative">
// //               <img
// //                 src={photo}
// //                 alt={`Photo ${i}`}
// //                 className="w-32 h-32 object-cover rounded border"
// //               />
// //               <button
// //                 onClick={() => {
// //                   const updated = localData.photos.filter((_, idx) => idx !== i);
// //                   handleChange(updated);
// //                 }}
// //                 className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
// //               >
// //                 <X className="w-4 h-4" />
// //               </button>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Save button */}
// //         <div className="flex justify-end mt-3">
// //           <button
// //             onClick={handleSave}
// //             className="bg-[#4e4ebc] hover:bg-[#6f6fd1] text-white px-4 py-2 rounded-lg cursor-pointer"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export  {PhotosSection};



// import React, { useState } from "react";
// import { X } from "lucide-react";
// import FileDropzone from "../../../../courses/FileDropzone";

// const PhotosSection = ({ section, onUpdate, onDelete, onToggle }) => {
//   const [localData, setLocalData] = useState(section.data);

//   const handleChange = (photos) => {
//     const updated = { ...localData, photos };
//     setLocalData(updated);
//     onUpdate(section.id, updated);
//   };

//   // ✅ Handle multiple files at once
//   const handleAddPhotos = (files) => {
//     const urls = Array.from(files).map((file) => URL.createObjectURL(file));
//     handleChange([...(localData.photos || []), ...urls]);
//   };

//   const handleSave = () => {
//   };

//   return (
//     <div className="bg-[var(--color-bgcolor)] rounded-lg p-4 shadow-sm mt-4 border border-[var(--color-secondarybgcolor)]">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
//           Photos Section
//         </h3>
//         <div className="flex items-center gap-3">
//           {/* Enable/Disable Toggle */}
//           <label className="flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={section.enabled}
//               onChange={() => onToggle(section.id)}
//               className="sr-only"
//             />
//             <span
//               className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
//                 section.enabled
//                   ? "bg-[var(--color-primary)]"
//                   : "bg-[var(--color-secondarybgcolor)]"
//               }`}
//             >
//               <span
//                 className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
//                   section.enabled ? "translate-x-5" : ""
//                 }`}
//               />
//             </span>
//           </label>
//         </div>
//       </div>

//       {/* Fields */}
//       <div className="space-y-3">
//         {/* ✅ FileDropzone now in multiple mode */}
//         <FileDropzone
//           file={null}
//           multiple={true} // enable multiple select
//           setFile={handleAddPhotos} // now works with bulk files
//           accept="image/*"
//         />

//         {/* Photos Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
//           {(localData.photos || []).map((photo, i) => (
//             <div key={i} className="relative">
//               <img
//                 src={photo}
//                 alt={`Photo ${i}`}
//                 className="w-32 h-32 object-cover rounded border border-[var(--color-secondarybgcolor)]"
//               />
//               {/* <button
//                 onClick={() => {
//                   const updated = localData.photos.filter((_, idx) => idx !== i);
//                   handleChange(updated);
//                 }}
//                 className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
//               >
//                 <X className="w-4 h-4" />
//               </button> */}
//             </div>
//           ))}
//         </div>

//         {/* Save button */}
//         <div className="flex justify-end mt-3">
//           <button
//             onClick={handleSave}
//             className="bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { PhotosSection };


//NEW SECTION SIVA



import React, { useState } from "react";
import { X } from "lucide-react";
import FileDropzone from "../../../components/FileDropzone";
import { savePhotoSectionAPI, deletePhotoAPI } from "../../../../../api/carddesign/contentSection";
import { showToast } from "../../../../../components/toast.js";


const PhotosSection = ({ section, onUpdate, onToggle }) => {
  const [localData, setLocalData] = useState(section.data || { photos: [], isEnabled: true });
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // ✅ Update parent state
  const handleChange = (photos) => {
    const updated = { ...localData, photos };
    setLocalData(updated);
    onUpdate(section.id, updated);
  };

  // ✅ Add new photos (preview before save)
  const handleAddPhotos = (files) => {
    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    // Store files for backend upload
    setSelectedFiles((prev) => [...prev, ...fileArray]);

    // Store preview URLs for UI
    handleChange([...(localData.photos || []), ...urls]);
  };

  // ✅ Save to backend
  const handleSave = async () => {
    if (selectedFiles.length === 0) {
      showToast('Please add at least one photo before saving!', "top-center", 5000, "dark");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("photos", file)); // must match multer field name
      formData.append("isEnabled", localData.isEnabled);

      const result = await savePhotoSectionAPI(formData);

      // ✅ Replace previews with backend URLs
      handleChange(result.photoSection.imgUrls);

      // ✅ Clear local file queue
      setSelectedFiles([]);
      showToast('Photos saved successfully!', "top-center", 5000, "dark");
    } catch (err) {
      console.error("Photos save failed:", err);
      showToast('Failed to save photos', "top-center", 5000, "dark");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete photo (local + backend)
  // const handleDelete = async (photoUrl, index) => {
  //   try {
  //     await deletePhotoAPI(index);
  //     const updated = localData.photos.filter((_, idx) => idx !== index);
  //     handleChange(updated);
  //   } catch (err) {
  //     console.error("Delete photo failed:", err);
  //     showToast('Failed to delete photos', "top-center", 5000, "dark");
  //   }
  // };
  const handleDelete = async (photoUrl, index) => {
    try {
      const filename = photoUrl.split("/").pop(); // extract just the filename
      await deletePhotoAPI(filename);
  
      const updated = (localData.imgUrls || []).filter((_, idx) => idx !== index);
      setLocalData({ ...localData, imgUrls: updated });
    } catch (err) {
      console.error("Delete photo failed:", err);
      showToast('Failed to delete photos', "top-center", 5000, "dark");
    }
  };

  return (
    <div className="bg-[var(--color-bgcolor)] rounded-lg p-4 mt-4 shadow border border-[var(--color-secondarybgcolor)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          Photos Section
        </h3>
        <div className="flex items-center gap-3">
          {/* Enable/Disable Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localData.isEnabled}
              onChange={(e) => {
                const updated = { ...localData, isEnabled: e.target.checked };
                setLocalData(updated);
                onToggle(section.id, e.target.checked);
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
      </div>

      {/* File Upload */}
      <div className="space-y-3">
        <FileDropzone
          file={null}
          multiple={true}
          setFile={handleAddPhotos}
          accept="image/*"
        />

        {/* Photos Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {(localData.photos || []).map((photo, i) => (
            <div key={i} className="relative">
              <img
                src={photo}
                alt={`Photo ${i}`}
                className="w-32 h-32 object-cover rounded border border-[var(--color-secondarybgcolor)]"
              />
              <button
                onClick={() => handleDelete(photo, i)}
                className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div> */}
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
  {(localData.imgUrls || []).map((photo, i) => {
    const fullUrl = photo.startsWith("http") ? photo : `${API_BASE}${photo}`;
    return (
      <div key={`saved-${i}`} className="relative flex flex-col items-center bg-[var(--color-secondarybgcolor)] p-2 rounded">
        <img
          src={fullUrl}
          alt={`Saved Photo ${i}`}
          className="w-32 h-32 object-cover rounded border border-[var(--color-secondarybgcolor)]"
        />
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-xs text-[var(--color-btn-primary)] underline break-all text-center"
        >
          {photo.split("/").pop()}
        </a>
        <button
          onClick={() => handleDelete(photo, i)}
          className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  })}

  {/* Show unsaved previews */}
  {(localData.photos || []).map((preview, i) => (
    <div key={`preview-${i}`} className="relative flex flex-col items-center bg-[var(--color-secondarybgcolor)] p-2 rounded">
      <img
        src={preview}
        alt={`Preview ${i}`}
        className="w-32 h-32 object-cover rounded border border-[var(--color-secondarybgcolor)]"
      />
      <p className="mt-2 text-xs text-[var(--color-subtext)] break-all text-center">
        {preview.split("/").pop() || "New Image"}
      </p>
      <button
        onClick={() => {
          // remove only from local previews
          const updated = localData.photos.filter((_, idx) => idx !== i);
          setLocalData({ ...localData, photos: updated });
        }}
        className="absolute top-1 right-1 bg-[var(--color-danger)] text-[var(--color-bgcolor)] p-1 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>

        {/* Save button */}
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
    </div>
  );
};

export { PhotosSection };
