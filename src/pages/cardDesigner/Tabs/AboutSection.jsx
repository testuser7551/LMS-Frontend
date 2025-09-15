

import React from "react";
import BasicDetails from "./components/aboutComponents/BasicDetails";
import MainButton from "./components/aboutComponents/MainButton";
import WhatsAppButton from "./components/aboutComponents/WhatsAppButton";

const AboutSection = ({ card, onCardChange }) => {
  const updateField = (section, field, value) => {
    onCardChange({
      ...card,
      about: {
        ...card.about,
        [section]: { ...card.about[section], [field]: value },
      },
    });
  };

  return (
    <div>
      <BasicDetails
        basicDetails={card.about.basicdetails}
        onChange={(field, value) => updateField("basicdetails", field, value)}
      />
      <MainButton
        mainButton={card.about.mainButton}
        onChange={(field, value) => updateField("mainButton", field, value)}
      />
      <WhatsAppButton
        whatsappButton={card.about.whatsappButton}
        onChange={(field, value) => updateField("whatsappButton", field, value)}
      />
    </div>
  );    
};

export default AboutSection;

