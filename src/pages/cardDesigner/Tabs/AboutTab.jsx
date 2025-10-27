import React, { useContext } from 'react'
import { AboutMeSection } from "./components/aboutTabComponents/AboutMeSection";
import { ExperienceSection } from "./components/aboutTabComponents/ExperienceSection";
import { EducationSection } from "./components/aboutTabComponents/EducationSection";
import {
  isEnabledContent
} from "../../../api/carddesign/contentSection";
import { showToast } from "../../../components/toast.js";
import { CardContext } from '../../../context/CardContext';

function AboutTab({ contentAbout, onChange }) {
  const { userCard } = useContext(CardContext);

  const updateField = (section, field, value) => {
    onChange({
      ...contentAbout,
      [section]: {
        ...contentAbout[section],
        [field]: value,
      },
    });
  };

  const handleToggleAbout = async (checked) => {
    onChange({
      ...contentAbout,
      isEnabled: checked,
    });
    try {
      const payload = { contentpage: "contentAbout", isEnabled: checked, user_id: userCard?.user_id || "" }
      const saved = await isEnabledContent(payload);
      if (payload.isEnabled)
        showToast('About Enabled', "top-center", 3000, "dark");
      else
        showToast('About disabled', "top-center", 3000, "dark");
    } catch (error) {
      showToast('Failed to Enable About', "top-center", 3000, "dark");
    }
  };

  return (
    <div>
      <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
        <div className="flex justify-between items-center ">
          <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit">
            Enable
          </h4>
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contentAbout?.isEnabled || false}
                onChange={(e) => handleToggleAbout(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${contentAbout?.isEnabled
                  ? "bg-[var(--color-btn-primary)]"
                  : "bg-[var(--color-btn-secondary)]"
                  }`}
              >
                <span
                  className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${contentAbout?.isEnabled ? "translate-x-5" : ""
                    }`}
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      {contentAbout?.isEnabled && (
        <>
          <AboutMeSection
            textSection={contentAbout.aboutMeSection}
            onChange={(field, value) =>
              updateField("aboutMeSection", field, value)
            }
          />
          <ExperienceSection
            experienceSection={contentAbout.experienceSection}
            onChange={(field, value) =>
              updateField("experienceSection", field, value)
            }
          />
          <EducationSection
            educationSection={contentAbout.educationSection}
            onChange={(field, value) =>
              updateField("educationSection", field, value)
            }
          />
        </>
      )}
    </div>
  );
}

export { AboutTab };
