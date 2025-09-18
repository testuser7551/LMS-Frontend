// import React from "react";

// const ProfilePhoto = ({ profile, onChange }) => {
//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       {/* Header */}
//       <h3 className="text-lg font-semibold text-gray-800 mb-6">
//         Profile Photo
//       </h3>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//         {/* Left Column: Profile Image + Upload */}
//         <div className="flex flex-col items-center gap-4">
//           <div
//             className={`flex items-center justify-center w-28 h-28 border border-gray-300 overflow-hidden
//               ${
//                 profile.profileShapes === "square"
//                   ? "rounded-lg"
//                   : "rounded-full"
//               }
//               ${profile.profileRingOnPhoto ? "ring-2 ring-primary" : ""}`}
//           >
//             {profile.profileImgUrl ? (
//               <img
//                 src={profile.profileImgUrl}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-xl font-medium text-gray-500">J</span>
//             )}
//           </div>

//           {/* Upload Button */}
//           <label className="bg-primary text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-headcolor cursor-pointer transition">
//             Upload
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const imageUrl = URL.createObjectURL(file);
//                   onChange("profileImgUrl", imageUrl);
//                 }
//               }}
//             />
//           </label>
//         </div>

//         {/* Right Column: Controls */}
//         <div className="flex flex-col gap-6">
//           {/* Shape Options */}
//           <div>
//             <p className="text-sm font-medium text-gray-700 mb-2">Shape</p>
//             <div className="flex gap-3">
//               <button
//                 className={`px-4 py-2 rounded-lg border transition ${
//                   profile.profileShapes === "circle"
//                     ? "bg-activecolor text-primary border-secondary"
//                     : "border-gray-300 text-gray-600 hover:border-primary"
//                 }`}
//                 onClick={() => onChange("profileShapes", "circle")}
//               >
//                 Circle
//               </button>
//               <button
//                 className={`px-4 py-2 rounded-lg border transition ${
//                   profile.profileShapes === "square"
//                     ? "bg-activecolor text-primary border-secondary"
//                     : "border-gray-300 text-gray-600 hover:border-primary"
//                 }`}
//                 onClick={() => onChange("profileShapes", "square")}
//               >
//                 Square
//               </button>
//             </div>
//           </div>

//           {/* Checkboxes */}
//           <div className="flex flex-col gap-3 text-gray-700">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileRingOnPhoto || false}
//                 onChange={(e) =>
//                   onChange("profileRingOnPhoto", e.target.checked)
//                 }
//                 className="w-4 h-4"
//               />
//               Show Ring
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileVerified || false}
//                 onChange={(e) => onChange("profileVerified", e.target.checked)}
//                 className="w-4 h-4"
//               />
//               Verified Badge
//             </label>
//           </div>

//           {/* Save Button */}
//           <button
//             onClick={() => //console.log("Saved Profile:", profile)}
//             className="self-start bg-primary text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-headcolor transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePhoto;

// import React, { useEffect, useState } from "react";
// import { fetchProfileSection, saveProfileSection } from "../../../../../api/profileSection";

// const ProfilePhoto = ({ profile, onChange }) => {
//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       {/* Header */}
//       <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
//         Profile Photo
//       </h3>

//       <div className="flex flex-col items-center gap-4 mb-6">
//         {/* Profile Image */}
//         <div
//           className={`flex items-center justify-center w-32 h-32 border border-gray-300 overflow-hidden 
//             ${
//               profile.profileShapes === "square" ? "rounded-lg" : "rounded-full"
//             }
//             ${profile.profileRingOnPhoto ? "ring-2 ring-primary" : ""}`}
//         >
//           {profile.profileImgUrl ? (
//             <img
//               src={profile.profileImgUrl}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-2xl font-medium text-gray-500">JPG</span>
//           )}
//         </div>

//         {/* Upload Button */}
//         <div className="flex items-center gap-3">
//           {/* Upload Button */}
//           <label className="bg-primary text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-headcolor cursor-pointer transition font-outfit">
//             Upload
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const imageUrl = URL.createObjectURL(file);
//                   onChange("profileImgUrl", imageUrl);
//                 }
//               }}
//             />
//           </label>

//           {/* Remove Photo Button */}
//           {profile.profileImgUrl && (
//             <button
//               onClick={() => onChange("profileImgUrl", null)}
//               className="px-5 py-2 rounded-lg font-medium shadow transition font-outfit cursor-pointer"
//               style={{
//                 backgroundColor: "var(--color-danger)",
//                 color: "var(--color-bgcolor)",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#e65f53")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "var(--color-danger)")
//               }
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Banner Section */}
//       <div className="mt-6">
//         <p className="text-sm font-semibold text-[var(--color-text)] mb-4 font-outfit">
//           Banner Photo
//         </p>

//         {/* Toggles */}
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-poppins">
//               Show Ring on Photo
//             </span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileRingOnPhoto || false}
//                 onChange={(e) =>
//                   onChange("profileRingOnPhoto", e.target.checked)
//                 }
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//             </label>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-poppins">
//               Show Verified Badge
//             </span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileVerified || false}
//                 onChange={(e) => onChange("profileVerified", e.target.checked)}
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//             </label>
//           </div>
//         </div>

//         {/* Shape Selection */}
//         <div>
//           <p className="text-sm font-semibold text-[var(--color-text)] mb-4 font-outfit">
//             Shape
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${
//                 profile.profileShapes === "circle"
//                   ? "bg-gray-100 border-primary"
//                   : "border-gray-300 hover:border-primary"
//               }`}
//               onClick={() => onChange("profileShapes", "circle")}
//             >
//               <div className="w-10 h-10 rounded-full bg-secondary mb-2"></div>
//               <span className="text-sm text-gray-700 font-poppins">Circle</span>
//             </button>
//             <button
//               className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${
//                 profile.profileShapes === "square"
//                   ? "bg-gray-100 border-primary"
//                   : "border-gray-300 hover:border-primary"
//               }`}
//               onClick={() => onChange("profileShapes", "square")}
//             >
//               <div className="w-10 h-10 rounded bg-secondary mb-2"></div>
//               <span className="text-sm text-gray-700 font-poppins">Square</span>
//             </button>
//           </div>
//           <div className="mt-6 flex justify-end">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export { ProfilePhoto };

// import React, { useEffect, useState } from "react";
// import { saveProfileSection } from "../../../../../api/profileSection";

// const ProfilePhoto = ({ profile, onChange }) => {
//   const [loading, setLoading] = useState(false);

//   // // ✅ Load profile from backend
//   // useEffect(() => {
//   //   const loadProfile = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const data = await fetchProfileSection();
//   //       if (data) {
//   //         // Push backend data into parent state
//   //         Object.keys(data).forEach((key) => onChange(key, data[key]));
//   //       }
//   //     } catch (err) {
//   //       //console.error("❌ Fetch profile error:", err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   loadProfile();
//   // }, []);

//   // ✅ Save profile to backend
//   const handleSave = async () => {
//     try {

//       const saved = await saveProfileSection(profile);
//       // Push saved values back into parent state
//       Object.keys(saved).forEach((key) => onChange(key, saved[key]));
//       alert("✅ Profile saved!");
//     } catch (err) {
//       //console.error("❌ Save profile error:", err);
//       alert("Failed to save profile");
//     }
//   };

//   return (
//     <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
//       {/* Header */}
//       <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
//         Profile Photo
//       </h3>

//       <div className="flex flex-col items-center gap-4 mb-6">
//         {/* Profile Image */}
//         <div
//           className={`flex items-center justify-center w-32 h-32 border border-gray-300 overflow-hidden 
//             ${
//               profile.profileShapes === "square" ? "rounded-lg" : "rounded-full"
//             }
//             ${profile.profileRingOnPhoto ? "ring-2 ring-primary" : ""}`}
//         >
//           {profile.profileImgUrl ? (
//             <img
//               src={profile.profileImgUrl}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-2xl font-medium text-gray-500">JPG</span>
//           )}
//         </div>

//         {/* Upload Button */}
//         <div className="flex items-center gap-3">
//           <label className="bg-primary text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-headcolor cursor-pointer transition font-outfit">
//             Upload
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const imageUrl = URL.createObjectURL(file);
//                   onChange("profileImgUrl", imageUrl);
//                 }
//               }}
//             />
//           </label>

//           {/* Remove Photo Button */}
//           {profile.profileImgUrl && (
//             <button
//               onClick={() => onChange("profileImgUrl", null)}
//               className="px-5 py-2 rounded-lg font-medium shadow transition font-outfit cursor-pointer"
//               style={{
//                 backgroundColor: "var(--color-danger)",
//                 color: "var(--color-bgcolor)",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#e65f53")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor =
//                   "var(--color-danger)")
//               }
//             >
//               Remove
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Banner Section */}
//       <div className="mt-6">
//         <p className="text-sm font-semibold text-[var(--color-text)] mb-4 font-outfit">
//           Banner Photo
//         </p>

//         {/* Toggles */}
//         <div className="flex flex-col gap-4 mb-6">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-poppins">Show Ring on Photo</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileRingOnPhoto || false}
//                 onChange={(e) => onChange("profileRingOnPhoto", e.target.checked)}
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//             </label>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-700 font-poppins">Show Verified Badge</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={profile.profileVerified || false}
//                 onChange={(e) => onChange("profileVerified", e.target.checked)}
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//             </label>
//           </div>
//         </div>

//         {/* Shape Selection */}
//         <div>
//           <p className="text-sm font-semibold text-[var(--color-text)] mb-4 font-outfit">
//             Shape
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <button
//               className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${
//                 profile.profileShapes === "circle"
//                   ? "bg-gray-100 border-primary"
//                   : "border-gray-300 hover:border-primary"
//               }`}
//               onClick={() => onChange("profileShapes", "circle")}
//             >
//               <div className="w-10 h-10 rounded-full bg-secondary mb-2"></div>
//               <span className="text-sm text-gray-700 font-poppins">Circle</span>
//             </button>
//             <button
//               className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${
//                 profile.profileShapes === "square"
//                   ? "bg-gray-100 border-primary"
//                   : "border-gray-300 hover:border-primary"
//               }`}
//               onClick={() => onChange("profileShapes", "square")}
//             >
//               <div className="w-10 h-10 rounded bg-secondary mb-2"></div>
//               <span className="text-sm text-gray-700 font-poppins">Square</span>
//             </button>
//           </div>

//           {/* ✅ Save Button */}
//           <div className="mt-6 flex justify-end">
//             <button
//               type="button"
//               onClick={handleSave}
//               disabled={loading}
//               className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { ProfilePhoto };


import React, { useState } from "react";
import { saveProfileSection } from "../../../../../api/carddesign/styleSection";

const API_BASE = import.meta.env.VITE_API_BASE;

const ProfilePhoto = ({ profile, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // store actual File object

  // // ✅ Save profile to backend
  // const handleSave = async () => {
  //   try {
  //     setLoading(true);

  //     // Prepare profile data
  //     const profileData = {
  //       ...profile,
  //       profileImg: file, // send actual file
  //     };

  //     const saved = await saveProfileSection(profileData);

  //     // Update parent state with saved data
  //     Object.keys(saved.profileSection).forEach((key) =>
  //       onChange(key, saved.profileSection[key])
  //     );

  //     alert("✅ Profile saved!");
  //   } catch (err) {
  //     console.error("❌ Save profile error:", err);
  //     alert("Failed to save profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();

      if (file) {
        formData.append("profileImg", file); // append actual File
      }

      formData.append("profileShapes", profile.profileShapes);
      formData.append("profileRingOnPhoto", profile.profileRingOnPhoto ? "true" : "false");
      formData.append("profileVerified", profile.profileVerified ? "true" : "false");

      const saved = await saveProfileSection(formData);

      // Update parent state with saved data
      Object.keys(saved.profileSection).forEach((key) =>
        onChange(key, saved.profileSection[key])
      );

      alert("✅ Profile saved!");
    } catch (err) {
      alert("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
        Profile Photo
      </h3>

      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Profile Image */}
        <div
          className={`flex items-center justify-center w-32 h-32 border border-gray-300 overflow-hidden 
            ${profile.profileShapes === "square" ? "rounded-lg" : "rounded-full"}
            ${profile.profileRingOnPhoto ? "ring-2 ring-primary" : ""}`}
        >
          {profile.profileImgUrl ? (
            // <img
            //   src={
            //     profile?.profileImgUrl?.startsWith("blob:")
            //       ? profile.profileImgUrl : profile?.profileImgUrl?.startsWith("blob:") ? profile?.profileImgUrl?.startsWith("blob:") : `/assets/images/sidebar/profile.png`
            //       : `${API_BASE}${profile?.profileImgUrl}`
            //   }
            //   alt="Profile"
            //   className="w-full h-full object-cover"
            // />
            <img
              src={
                profile?.profileImgUrl
                  ? profile?.profileImgUrl.startsWith("blob:")
                    ? profile.profileImgUrl
                    : `${API_BASE}${profile.profileImgUrl}`
                  : "/assets/images/sidebar/profile.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
            src={"/assets/images/sidebar/profile.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          )}
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <label className="bg-primary text-white px-5 py-2 rounded-lg cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile); // store File object
                  const previewUrl = URL.createObjectURL(selectedFile);
                  onChange("profileImgUrl", previewUrl); // preview only
                }
              }}
            />
          </label>

          {/* Remove Photo Button */}
          {profile.profileImgUrl && (
            <button
              onClick={() => {
                setFile(null); // remove file
                onChange("profileImgUrl", null); // remove preview
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
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-poppins">Show Ring on Photo</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.profileRingOnPhoto || false}
              onChange={(e) => onChange("profileRingOnPhoto", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-poppins">Show Verified Badge</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.profileVerified || false}
              onChange={(e) => onChange("profileVerified", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-activecolor rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>

      {/* Shape Selection */}
      <div>
        <p className="text-sm font-semibold text-[var(--color-text)] mb-4 font-outfit">
          Shape
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${profile.profileShapes === "circle"
              ? "bg-gray-100 border-primary"
              : "border-gray-300 hover:border-primary"
              }`}
            onClick={() => onChange("profileShapes", "circle")}
          >
            <div className="w-10 h-10 rounded-full bg-secondary mb-2"></div>
            <span className="text-sm text-gray-700 font-poppins">Circle</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${profile.profileShapes === "square"
              ? "bg-gray-100 border-primary"
              : "border-gray-300 hover:border-primary"
              }`}
            onClick={() => onChange("profileShapes", "square")}
          >
            <div className="w-10 h-10 rounded bg-secondary mb-2"></div>
            <span className="text-sm text-gray-700 font-poppins">Square</span>
          </button>
        </div>

        {/* ✅ Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfilePhoto };
