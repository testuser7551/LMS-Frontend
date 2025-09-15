import React, { forwardRef, useImperativeHandle, useState } from "react";
import { X, Plus } from "lucide-react";
import CustomDropdown from "../Components/CustomDropdown";

const sectionTypes = [
  { value: "Normal", label: "Normal" },
  { value: "Tab", label: "Tab" },
];

const TextSections = forwardRef(({ lesson, setLesson }, ref) => {
  const sections = lesson.sections || [];

  const [validationErrors, setValidationErrors] = useState({}); // { sectionIndex: { fieldName: errorMessage, ... }, ... }

  const addNewSection = () => {
    setLesson({
      ...lesson,
      sections: [
        ...sections,
        {
          type: "Normal",
          title: "",
          description: "",
          contents: [],
        },
      ],
    });
  };

  const updateSection = (index, updatedSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setLesson({ ...lesson, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setLesson({ ...lesson, sections: newSections });
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  const addTabContentField = (sectionIdx) => {
    const section = sections[sectionIdx];
    const updatedContents = [
      ...(section.contents || []),
      { contentTitle: "", contentDescription: "" },
    ];
    updateSection(sectionIdx, { ...section, contents: updatedContents });
  };

  const removeTabContentField = (sectionIdx, contentIdx) => {
    const section = sections[sectionIdx];
    const updatedContents = section.contents.filter((_, i) => i !== contentIdx);
    updateSection(sectionIdx, { ...section, contents: updatedContents });
  };

  const updateTabContentField = (sectionIdx, contentIdx, field, value) => {
    const section = sections[sectionIdx];
    const updatedContents = [...section.contents];
    updatedContents[contentIdx] = {
      ...updatedContents[contentIdx],
      [field]: value,
    };
    updateSection(sectionIdx, { ...section, contents: updatedContents });
  };

  const validateSections = () => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (!section.title.trim()) {
        return `Section ${i + 1}: Heading is required`;
      }

      if (section.type === "Normal") {
        if (!section.description.trim()) {
          return `Section ${i + 1}: Description is required`;
        }
      } else if (section.type === "Tab") {
        if (section.contents.length === 0) {
          return `Section ${i + 1}: At least one Tab Content is required`;
        }
        for (let j = 0; j < section.contents.length; j++) {
          const content = section.contents[j];
          if (!content.contentTitle.trim()) {
            return `Section ${i + 1}, Content ${
              j + 1
            }: Content Title is required`;
          }
          if (!content.contentDescription.trim()) {
            return `Section ${i + 1}, Content ${
              j + 1
            }: Content Description is required`;
          }
        }
      }
    }
    return null; // All valid
  };

  useImperativeHandle(ref, () => ({
    validateSections,
  }));

  return (
    <div className="p-4 rounded-2xl mt-4 space-y-4 bg-gray-50 border">
      <h4 className="text-lg font-semibold text-gray-700">Text Sections</h4>

      {sections.map((section, idx) => (
        <div
          key={idx}
          className="p-4 rounded space-y-3 border border-gray-500 bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">Section {idx + 1}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeSection(idx)}
            >
              <X />
            </button>
          </div>

          <CustomDropdown
            label="Section Type"
            options={sectionTypes}
            value={section.type}
            onChange={(val) =>
              updateSection(idx, {
                ...section,
                type: val,
                title: "",
                description: "",
                contents: [],
              })
            }
            width="w-full"
            getOptionLabel={(opt) => opt.label}
            getOptionValue={(opt) => opt.value}
            placeholder="Select Section Type"
          />

          {/* Normal Section */}
          {section.type === "Normal" && (
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Heading
                </label>
                <input
                  className={`w-full p-2 rounded-lg border ${
                    validationErrors[idx]?.title
                      ? "border-red-500"
                      : "border-gray-400"
                  } bg-white`}
                  placeholder="Enter Heading"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(idx, { ...section, title: e.target.value })
                  }
                />
                {validationErrors[idx]?.title && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[idx].title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  className={`w-full p-2 rounded-lg border ${
                    validationErrors[idx]?.description
                      ? "border-red-500"
                      : "border-gray-400"
                  } bg-white`}
                  placeholder="Enter Description"
                  value={section.description}
                  onChange={(e) =>
                    updateSection(idx, {
                      ...section,
                      description: e.target.value,
                    })
                  }
                />
                {validationErrors[idx]?.description && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[idx].description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tab Section */}
          {section.type === "Tab" && (
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Heading
                </label>
                <input
                  className={`w-full p-2 rounded-lg border ${
                    validationErrors[idx]?.title
                      ? "border-red-500"
                      : "border-gray-400"
                  } bg-white`}
                  placeholder="Enter Section Heading"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(idx, { ...section, title: e.target.value })
                  }
                />
                {validationErrors[idx]?.title && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[idx].title}
                  </p>
                )}
              </div>

              <h5 className="font-semibold">Tab Contents</h5>

              {section.contents.map((content, ci) => (
                <div key={ci} className="space-y-2 p-2 border rounded bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Content {ci + 1}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeTabContentField(idx, ci)}
                    >
                      <X />
                    </button>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Content Title
                    </label>
                    <input
                      className={`w-full p-2 rounded-lg border ${
                        validationErrors[idx]?.contents?.[ci]?.contentTitle
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white`}
                      placeholder="Enter Content Title"
                      value={content.contentTitle}
                      onChange={(e) =>
                        updateTabContentField(
                          idx,
                          ci,
                          "contentTitle",
                          e.target.value
                        )
                      }
                    />
                    {validationErrors[idx]?.contents?.[ci]?.contentTitle && (
                      <p className="text-red-500 text-sm">
                        {validationErrors[idx].contents[ci].contentTitle}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Content Description
                    </label>
                    <textarea
                      className={`w-full p-2 rounded-lg border ${
                        validationErrors[idx]?.contents?.[ci]
                          ?.contentDescription
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white`}
                      placeholder="Enter Content Description"
                      value={content.contentDescription}
                      onChange={(e) =>
                        updateTabContentField(
                          idx,
                          ci,
                          "contentDescription",
                          e.target.value
                        )
                      }
                    />
                    {validationErrors[idx]?.contents?.[ci]
                      ?.contentDescription && (
                      <p className="text-red-500 text-sm">
                        {validationErrors[idx].contents[ci].contentDescription}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                onClick={() => addTabContentField(idx)}
              >
                Add Tab Content
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
        onClick={addNewSection}
      >
        <Plus className="w-5 h-5" />
        Add Section
      </button>
    </div>
  );
});

export default TextSections;
