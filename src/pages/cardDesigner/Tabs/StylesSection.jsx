// import React, { useState } from "react";
// import { ProfilePhoto } from "./components/styleComponents/ProfilePhoto";
// import BannerPhoto from "./components/styleComponents/BannerPhoto";
// import HeaderStyle from "./components/styleComponents/HeaderStyle";
// import FontStyle from "./components/styleComponents/FontStyle";
// import ThemeStyle from "./components/styleComponents/ThemeStyle";
// import FileDropzone from "../../courses/FileDropzone";

// function StylesSection({ card, onCardChange }) {
//   const [profile, setProfile] = useState(card?.styles?.profileSection || {});
//   const [banner, setBanner] = useState(card?.styles?.bannerImgUrl || null);
//   const [fontFamily, setFontFamily] = useState(
//     card?.styles?.fontFamily || "Inter, sans-serif"
//   );
//   const [themesSection, setThemesSection] = useState(
//     card?.styles?.themesSection || {}
//   );

//   // ✅ Handle profile changes
//   const handleProfileChange = (key, value) => {
//     const updatedProfile = { ...profile, [key]: value };
//     setProfile(updatedProfile);
//     onCardChange({
//       ...card,
//       styles: {
//         ...card.styles,
//         profileSection: updatedProfile,
//         bannerImgUrl: banner,
//         fontFamily,
//         themesSection,
//       },
//     });
//   };

//   // ✅ Handle banner changes
//   // ✅ Handle banner changes (with preview URL)
// const handleBannerChange = (file) => {
//   if (!file) return;

//   const previewUrl = URL.createObjectURL(file);

//   const fileWithPreview = {
//     file,         // original file
//     previewUrl,   // blob url for <img>
//   };

//   setBanner(fileWithPreview);

//   onCardChange({
//     ...card,
//     styles: {
//       ...card.styles,
//       profileSection: profile,
//       bannerImgUrl: previewUrl, // keep URL in styles
//       fontFamily,
//       themesSection,
//     },
//   });
// };

//   // ✅ Handle font changes
//   const handleFontChange = (value) => {
//     setFontFamily(value);
//     onCardChange({
//       ...card,
//       styles: {
//         ...card.styles,
//         profileSection: profile,
//         bannerImgUrl: banner,
//         fontFamily: value,
//         themesSection,
//       },
//     });
//   };

//   const handleThemeChange = (section, value) => {
//     setThemesSection(value);
//     onCardChange({
//       ...card,
//       styles: {
//         ...card.styles,
//         profileSection: profile,
//         bannerImgUrl: banner,
//         fontFamily,
//         themesSection: value,
//       },
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <ProfilePhoto profile={profile} onChange={handleProfileChange} />
//       {/* <BannerPhoto bannerImgUrl={banner} onChange={handleBannerChange} /> */}
//       <div>
//         <label className="block mb-1 font-medium">Banner Photo</label>
//         <FileDropzone
//           file={banner}
//           setFile={handleBannerChange}
//           accept="image/*"
//         />
//       </div>
//       <HeaderStyle profile={profile} onChange={handleProfileChange} />
//       <FontStyle fontFamily={fontFamily} onChange={handleFontChange} />
//       <ThemeStyle card={card} onChange={handleThemeChange} />
//     </div>
//   );
// }

// export default StylesSection;

import React, { useState, useEffect } from "react";
import { ProfilePhoto } from "./components/styleComponents/ProfilePhoto";
import { HeaderStyle } from "./components/styleComponents/HeaderStyle";
import { FontStyle } from "./components/styleComponents/FontStyle";
import { ThemeStyle } from "./components/styleComponents/ThemeStyle";
import { BannerPhoto } from "./components/styleComponents/BannerPhoto";
import FileDropzone from "../../courses/FileDropzone";

function StylesSection({ card, onCardChange }) {
  const [profile, setProfile] = useState(card?.style?.profileSection || {});
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [fontFamily, setFontFamily] = useState(
    card?.style?.fontFamily || "Inter, sans-serif"
  );
  const [themesSection, setThemesSection] = useState(
    card?.style?.themesSection || {}
  );

  // ✅ Debug: log themes when it changes
  useEffect(() => {
    ////console.log("🎨 Current Theme Styles:", themesSection);
  }, [themesSection]);
  // useEffect(() => {
  //   const loadProfile = async () => {
  //     try {
  //       const data = await fetchProfileSection();
  //       if (data) {
  //         setProfile(data);

  //         // also update card so parent stays synced
  //         onCardChange({
  //           ...card,
  //           styles: {
  //             ...card.styles,
  //             profileSection: data,
  //             bannerImgUrl: data.bannerImgUrl || card?.styles?.bannerImgUrl,
  //             fontFamily,
  //             themesSection,
  //           },
  //         });
  //       }
  //     } catch (err) {
  //       //console.error("❌ Failed to fetch profile:", err);
  //     }
  //   };

  //   loadProfile();
  // }, []); // run once

  // ✅ Handle profile changes
  // const handleProfileChange = (key, value) => {
  //   const updatedProfile = { ...profile, [key]: value };
  //   setProfile(updatedProfile);
  //   onCardChange({
  //     ...card,
  //     style: {
  //       ...card.style,
  //       profileSection: updatedProfile,
  //       //bannerImgUrl: card.styles.bannerImgUrl,
  //       fontFamily,
  //       themesSection,
  //     },
  //   });
  // };
  const handleProfileChange = (key, value) => {
    const updatedValue =
      key === "profileRingOnPhoto" || key === "profileVerified"
        ? !!value
        : value;
  
    const updatedProfile = { ...profile, [key]: updatedValue };
    setProfile(updatedProfile);
  
    onCardChange({
      ...card,
      style: {
        ...card.style,
        profileSection: updatedProfile,
        fontFamily,
        themesSection,
      },
    });
  };

  // ✅ Handle banner changes (keep File + generate preview URL)
  // const handleBannerChange = (file) => {
  //   if (!file) return;
  //   setBanner(file);

  //   const previewUrl = URL.createObjectURL(file);

  //   onCardChange({
  //     ...card,
  //     styles: {
  //       ...card.styles,
  //       profileSection: profile,
  //       bannerImgUrl: previewUrl, // pass preview URL into styles
  //       fontFamily,
  //       themesSection,
  //     },
  //   });
  // };

//   const handleBannerChange = (file) => {
//   if (!file) return;
//   const previewUrl = URL.createObjectURL(file);
//   setBanner(previewUrl);  // 👈 store URL instead of File

//   onCardChange({
//     ...card,
//     style: {
//       ...card.style,
//       profileSection: profile,
//       bannerImgUrl: previewUrl,
//       fontFamily,
//       themesSection,
//     },
//   });
// };

const handleBannerChange = (file) => {
  if (!file) return;

  setBannerFile(file); // ✅ keep real file for API
  setBannerPreview(URL.createObjectURL(file)); // ✅ for UI preview

  onCardChange({
    ...card,
    style: {
      ...card.style,
      profileSection: profile,
      bannerImgUrl: URL.createObjectURL(file), // preview for UI
      fontFamily,
      themesSection,
    },
  });
};


  // ✅ Handle font changes
  const handleFontChange = (value) => {
    setFontFamily(value);
    onCardChange({
      ...card,
      style: {
        ...card.style,
        profileSection: profile,
        bannerImgUrl: card.style.bannerImgUrl,
        fontFamily: value,
        themesSection,
      },
    });
  };

  const handleThemeChange = (section, value) => {
    setThemesSection(value);
    onCardChange({
      ...card,
      style: {
        ...card.style,
        profileSection: profile,
        //bannerImgUrl: card.styles.bannerImgUrl,
        fontFamily,
        themesSection: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <ProfilePhoto profile={profile} onChange={handleProfileChange} />
      {/* <BannerPhoto banner={banner} handleBannerChange={handleBannerChange} /> */}
      <BannerPhoto bannerFile={bannerFile} bannerPreview={bannerPreview} handleBannerChange={handleBannerChange}/>

      {/* <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
        <label className="font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
          Banner Photo
        </label>
        <FileDropzone
          file={banner}
          setFile={handleBannerChange}
          accept="image/*"
        />
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] rounded-lg hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div> */}
      <ThemeStyle card={card} onChange={handleThemeChange} />

      <HeaderStyle profile={profile} onChange={handleProfileChange} />
      <FontStyle fontFamily={fontFamily} onChange={handleFontChange} />
    </div>
  );
}

export default StylesSection;
