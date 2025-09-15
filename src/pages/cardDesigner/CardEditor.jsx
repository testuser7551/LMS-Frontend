import React, { useState } from 'react';
import { User,Palette, Type, Settings } from 'lucide-react';
import AboutSection from './Tabs/AboutSection';
import ContentSection from './Tabs/ContentSection';
import StylesSection from './Tabs/StylesSection';
import SettingsSection from './Tabs/SettingsSection';

const sections = [
  { id: 'about', label: 'About', icon: <User size={16} /> },
  { id: 'content', label: 'Content', icon: <Type size={16} /> },
  { id: 'style', label: 'Style', icon: <Palette size={16} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
];

const CardEditor = ({ card, onCardChange }) => {
  const [activeSection, setActiveSection] = useState('about');
  return (
    <div className="bg-secondarybgcolor rounded-xl p-4 sm:p-6 lg:p-4 xl:p-6">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg md:text-md font-medium transition-colors font-poppins ${
              activeSection === section.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-activecolor border border-gray-200 cursor-pointer'
            }`}
          >
            {section.icon}
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content: delegate to children */}
      <div className="space-y-4">
        {activeSection === 'about' && (
          <AboutSection card={card} onCardChange={onCardChange} />
        )}
        {activeSection === 'content' && (
          <ContentSection card={card} onCardChange={onCardChange} />
        )}
        
        {activeSection === 'style' && (
          <StylesSection card={card} onCardChange={onCardChange} />
        )}
        {activeSection === 'settings' && (
          <SettingsSection card={card} onCardChange={onCardChange} />
        )}
      </div>
    </div>
  );
};

export default CardEditor;
