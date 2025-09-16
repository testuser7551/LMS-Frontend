// src/pages/cardDesigner/Tabs/components/styleComponents/ThemeStyle.jsx
import React, { useState, useEffect } from "react";
import { saveThemesSection, fetchAllThemes } from "../../../../../api/carddesign/styleSection";
import { showToast } from "../../../../../components/toast"

const ThemeStyle = ({ card, onChange }) => {
  const [themes, setThemes] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch themes from backend
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await fetchAllThemes();
        const themeObj = res.reduce((acc, t) => {
          acc[t.themeName] = {
            _id: t._id,
            primaryColor: t.primaryColor,
            secondaryColor: t.secondaryColor,
            territoryColor: t.territoryColor,
            backgroundColor: t.backgroundColor,
            textColor: t.textColor,
          };
          return acc;
        }, {});
        setThemes(themeObj);
      } catch (err) {
        //console.error("Error fetching themes:", err);
        showToast('Error fetching themes', "top-center", 5000, "dark");
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  const [selectedTheme, setSelectedTheme] = useState(
    card?.style?.themesSection?.themeName || "Custom"
  );
  const [customColors, setCustomColors] = useState({
    primaryColor: card?.style?.themesSection?.primaryColor || "#4e4ebc",
    secondaryColor: card?.style?.themesSection?.secondaryColor || "#6f6fd1",
    territoryColor: card?.style?.themesSection?.territoryColor || "#383896",
    backgroundColor: card?.style?.themesSection?.backgroundColor || "#ffffff",
    textColor: card?.style?.themesSection?.textColor || "#1a1a1a",
  });

  // Handle theme change
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    if (theme !== "Custom" && themes[theme]) {
      onChange("themesSection", { themeName: theme, ...themes[theme] });
    } else {
      onChange("themesSection", { themeName: "Custom", ...customColors });
    }
  };

  // inside ThemeStyle component
  // // const handleSave = async () => {
  // //   try {
  // //     const payload =
  // //       selectedTheme === "Custom"
  // //         ? { themeName: "Custom", ...customColors }
  // //         : { themeName: selectedTheme };

  // //     const res = await saveThemesSection(card._id, payload);
  // //     
  // //   } catch (err) {
  // //     //console.error("❌ Error saving theme section:", err);
  // //   }
  // // };
  // const handleSave = async () => {
  //   if (!card?._id) {
  //     //console.error("❌ cardId is missing");
  //     return;
  //   }

  //   try {
  //     const payload =
  //       selectedTheme === "Custom"
  //         ? { themeName: "Custom", ...customColors }
  //         : { themeName: selectedTheme };

  //     const res = await saveThemesSection(card._id, payload);
  //     
  //   } catch (err) {
  //     //console.error("❌ Error saving theme section:", err);
  //   }
  // };

  const handleSave = async () => {
    if (!selectedTheme) return;

    const themeData = {
      themeName: selectedTheme,
      themeId: themes[selectedTheme]?._id || null, // preset theme ID if exists
      primaryColor: customColors.primaryColor,
      secondaryColor: customColors.secondaryColor,
      territoryColor: customColors.territoryColor,
      backgroundColor: customColors.backgroundColor,
      textColor: customColors.textColor,
    };

    try {
      const res = await saveThemesSection(themeData);
      showToast(`✅ Themes saved successfully: ${res?.message || themeData.themeName}`);
    } catch (err) {
      //console.error("Error saving themes:", err);
    }
  };


  // Handle custom color change
  const handleColorChange = (key, value) => {
    const updatedColors = { ...customColors, [key]: value };
    setCustomColors(updatedColors);
    onChange("themesSection", { themeName: "Custom", ...updatedColors });
  };



  const allThemes = ["Custom", ...Object.keys(themes)];

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500 font-poppins">
        Loading themes...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-[var(--color-subbgcolor)] rounded-xl p-6 space-y-6">
      <h3 className="font-semibold text-[var(--color-headtext)] mb-6 font-outfit">
        Themes
      </h3>
      <p className="text-sm text-[var(--color-subtext)] font-poppins">
        Choose a preset or create a custom palette
      </p>

      {/* Theme Options with scroll */}
      <div className="flex gap-4 overflow-x-auto p-2">
        {allThemes.map((theme) => {
          const themeData = themes[theme] || {};
          return (
            <button
              key={theme}
              onClick={() => handleThemeSelect(theme)}
              className={`min-w-[120px] cursor-pointer h-36 rounded-2xl border flex flex-col items-center justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              style={{
                borderColor: 
                  selectedTheme === theme
                    ? "var(--color-primary)"
                    : "transparent",
                borderWidth: selectedTheme === theme ? "3px" : "",
                backgroundColor:
                  theme === "Custom"
                    ? "#1a1a2e"
                    : themeData.backgroundColor || "#f4f4f5",
              }}
            >
              {/* Theme name */}
              <span
                className="mt-3 font-semibold text-sm font-poppins"
                style={{
                  color: theme === "Custom" ? "#fff" : themeData.textColor || "#000",
                }}
              >
                {theme}
              </span>

              {/* Divider */}
              <div
                className="w-8 h-2 rounded-md"
                style={{
                  backgroundColor:
                    theme === "Custom"
                      ? "#9ca3af"
                      : themeData.secondaryColor || "#d1d5db",
                }}
              />

              {/* Bottom preview strip */}
              <div
                className="w-full h-5 rounded-b-2xl"
                style={{
                  backgroundColor:
                    theme === "Custom"
                      ? "#6b7280"
                      : themeData.territoryColor || "#9ca3af",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Custom Color Pickers */}
      {selectedTheme === "Custom" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(customColors).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-[var(--color-text)] capitalize font-poppins">
                {key.replace("Color", " Color")}
              </label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-full h-10 rounded border border-gray-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-lg font-medium shadow text-white transition font-outfit"
          style={{
            backgroundColor: "var(--color-btn-primary)",
          }}
          onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            "var(--color-btn-primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-btn-primary)")
          }
        >
          Save
        </button>

      </div>
    </div>
  );
};

export { ThemeStyle };
