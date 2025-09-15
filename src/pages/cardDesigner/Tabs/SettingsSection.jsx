// src/pages/Settings/SettingsSection.jsx

import React from "react";
import Settings from "./components/settingsComponents/Settings";

function SettingsSection({ card, onCardChange }) {
  
  
  // Handle toggle changes from Settings component
  const handleSettingsChange = (newSettings) => {
    onCardChange({
      ...card,
      settings: newSettings, // consistent with CardDesigner
    });
  };

  return (
    <div className="space-y-6">

      {/* Settings component */}
      <Settings
        settings={card.settings}
        setSettings={handleSettingsChange}
      />
    </div>
  );
}

export default SettingsSection;
