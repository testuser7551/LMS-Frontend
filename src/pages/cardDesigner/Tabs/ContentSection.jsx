import React, { useState } from "react";
import { LinkSection } from "../Tabs/components/contentComponents/LinkSection";
import { TextSection } from "../Tabs/components/contentComponents/TextSection";
import { YouTubeSection } from "../Tabs/components/contentComponents/YouTubeSection";
import { GallerySection } from "../Tabs/components/contentComponents/GallerySection";
import { PhotosSection } from "../Tabs/components/contentComponents/PhotosSection";
import { AboutTab } from "./AboutTab";
import { CertificateTab } from "./CertificateTab";

import { Link, Type, Youtube, Image, Images } from "lucide-react";

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'certificates', label: 'Certificates' },
];

// ✅ Section types
const sectionTypes = [
  {
    type: "links",
    label: "Links",
  },
  {
    type: "text",
    label: "Textarea",
  },
  {
    type: "youtube",
    label: "YouTube",
  },
  {
    type: "gallery",
    label: "Gallery",
  },
  {
    type: "photos",
    label: "Photos Gallery",
  },
];

function ContentSection({ card, onCardChange }) {
  // Ensure all sections exist ONCE with stable IDs
  const [activeSection, setActiveSection] = useState('home');
  const updateField = (section, field, value) => {
    onCardChange({
      ...card,
      content: {
        ...card.content,
        [section]: { ...card.content[section], [field]: value },
      },
    });
  };
  
  return (
    <div>
      <div className="bg-secondarybgcolor rounded-xl p-4 sm:p-6 lg:p-4 xl:p-6">
        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {sections.map((section) => (
            <>
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg md:text-md font-medium transition-colors font-poppins ${activeSection === section.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-activecolor border border-gray-200 cursor-pointer'
                  }`}
              >
                {section.icon}
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            </>
          ))}
          {/* <button className="bg-primary px-3 py-2 text-white rounded-xl border-2 border-primary hover:bg-transparent hover:text-primary">+ Add Page</button> */}
        </div>

        {/* Section Content: delegate to children */}
        <div className="space-y-4">
          {activeSection === 'home' && (
            sectionTypes.map((section) => {
              switch (section.type) {
                case "links":
                  return (
                    <LinkSection
                      key={section.type}
                      linkSection={card.content.linksSection}
                      onChange={(field, value) => updateField("linksSection", field, value)}
                    />
                  );
                case "text":
                  return (
                    <TextSection
                      key={section.type}
                      textSection={card.content.textSection}
                      onChange={(field, value) => updateField("textSection", field, value)}
                    />
                  );
                case "youtube":
                  return (
                    <YouTubeSection
                      key={section.type}
                      youTubeSection={card.content.youtubeSections}
                      onChange={(field, value) => updateField("youtubeSections", field, value)}
                    />
                  );
                case "gallery":
                  return (
                    <GallerySection
                      key={section.type}
                      gallerySections={card.content.gallerySections}
                      onChange={(field, value) => updateField("gallerySections", field, value)}
                    />
                  );
                case "photos":
                  return (
                    <PhotosSection
                      key={section.type}
                      photoSection={card.content.photoSections}
                      onChange={(field, value) => updateField("photoSections", field, value)}
                    />
                  );
                default:
                  return null;
              }
            })
          )}
          {activeSection === 'about' && (
            <AboutTab
              contentAbout={card.contentAbout}
              onChange={(updatedAbout) =>
                onCardChange({ ...card, contentAbout: updatedAbout })
              }
            />
          )}

          {activeSection === 'certificates' && (
            <CertificateTab
              certificate={card.certificate}
              onChange={(updatedCertificate) =>
                onCardChange({ ...card, certificate: updatedCertificate })
              } />
          )}
        </div>
      </div>

    </div>
  );
}

export default ContentSection;
