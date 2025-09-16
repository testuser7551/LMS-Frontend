import React, { useState, useEffect } from "react";
import { ProfilePhoto } from "./components/styleComponents/ProfilePhoto";
import { HeaderStyle } from "./components/styleComponents/HeaderStyle";
import { FontStyle } from "./components/styleComponents/FontStyle";
import { ThemeStyle } from "./components/styleComponents/ThemeStyle";
import { BannerPhoto } from "./components/styleComponents/BannerPhoto";
import FileDropzone from "../../courses/FileDropzone";

function StylesSection({ card, onCardChange }) {
  const [profile, setProfile] = useState(card?.style?.profileSection || "center");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(card?.style?.bannerImgUrl);
  const [fontFamily, setFontFamily] = useState(
    card?.style?.fontStyleSection?.font || "Inter, sans-serif"
  );
  const [headerStyle, setHeaderStyle] = useState(card?.style?.headerStyleSection?.headerStyle || {});
  const [themesSection, setThemesSection] = useState(
    card?.style?.themesSection || {}
  );

  // ✅ Debug: log themes when it changes
  useEffect(() => {
    ////console.log("🎨 Current Theme Styles:", themesSection);
  }, [themesSection]);

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

  const handleBannerChange = (file) => {
    if (file==="") {
      setBannerFile(file);
      setBannerPreview(file);
      onCardChange({
        ...card,
        style: {
          ...card.style,
          profileSection: profile,
          bannerImgUrl: "", // preview for UI
          themesSection,
        },
      });
      return;
    }
    setBannerFile(file); // ✅ keep real file for API
    setBannerPreview(URL.createObjectURL(file)); // ✅ for UI preview

    onCardChange({
      ...card,
      style: {
        ...card.style,
        profileSection: profile,
        bannerImgUrl: URL.createObjectURL(file), // preview for UI
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
        fontStyleSection: {
          font: value,
        },
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
        themesSection: value,
      },
    });
  };
  const handleHeaderStyleChange = (value) => {
    setHeaderStyle(value);
    onCardChange({
      ...card,
      style: {
        ...card.style,
        profileSection: profile,
        bannerImgUrl: card.style.bannerImgUrl,
        themesSection,
        headerStyleSection: { headerStyle: value },
      },
    });
  };

  return (
    <div className="space-y-6">
      <ProfilePhoto profile={profile} onChange={handleProfileChange} />
      <BannerPhoto bannerFile={bannerFile} bannerPreview={bannerPreview} handleBannerChange={handleBannerChange} />


      <ThemeStyle card={card} onChange={handleThemeChange} />

      <HeaderStyle headerStyle={headerStyle} onChange={handleHeaderStyleChange} />
      <FontStyle fontFamily={fontFamily} onChange={handleFontChange} />
    </div>
  );
}

export default StylesSection;
