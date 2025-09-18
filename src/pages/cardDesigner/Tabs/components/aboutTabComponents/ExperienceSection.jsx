import React, { useState } from 'react'
import { ExperienceModal } from "./ExperienceModal"
import { Pencil, Trash } from 'lucide-react';
import {
    updateExperienceMeta, deleteExperience
} from "../../../../../api/carddesign/contentSection";
import { showToast } from "../../../../../components/toast.js";

function ExperienceSection({ experienceSection, onChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    // save title and enabled button
    const handleSave = async () => {

        //  Simple validation
        if (!experienceSection?.experienceTitle.trim() && experienceSection.isEnabled) {
            showToast('Experience Title Required', "top-center", 3000, "dark");
            return;
        }
        try {
            //  Proceed with saving
            const payload = {
                experienceTitle: experienceSection?.experienceTitle,
                isEnabled: experienceSection?.isEnabled
            }
            const saved = await updateExperienceMeta(payload);
            showToast('Experience saved successfully!', "top-center", 3000, "dark");
        }
        catch (err) {
            showToast('Failed to save About Section', "top-center", 3000, "dark");
        }

    }

    return (
        <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
            <div className="flex justify-between items-center mb-5">
                <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit">
                    Experience Section
                </h4>
                <div>
                    {/* Enable/Disable Toggle */}
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={experienceSection.isEnabled}
                            name="isEnabled"
                            onChange={(e) => onChange("isEnabled", e.target.checked)}
                            className="sr-only"
                        />
                        <span
                            className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${experienceSection.isEnabled
                                ? "bg-[var(--color-btn-primary)]"
                                : "bg-[var(--color-btn-secondary)]"
                                }`}
                        >
                            <span
                                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${experienceSection.isEnabled ? "translate-x-5" : ""
                                    }`}
                            />
                        </span>
                    </label>
                </div>
            </div>
            {/* Inputs */}
            {experienceSection.isEnabled && (

                <input
                    type="text"
                    value={experienceSection.experienceTitle}
                    name="experienceTitle"
                    onChange={(e) => onChange("experienceTitle", e.target.value)}
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-4 font-Poppins text-[var(--color-text)] placeholder-[var(--color-subtext)]"
                />
            )}

            {/* Save button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer"
                >
                    Save
                </button>
            </div>
            {experienceSection.isEnabled && experienceSection.experienceData?.length > 0 && (

                <>
                    {/* card with Experience data to display with edit and delete */}

                    <div className=" my-4">
                        {[...experienceSection.experienceData]
                            .sort((a, b) => {
                                // Convert month names to numbers for sorting
                                const monthOrder = {
                                    January: 1, February: 2, March: 3, April: 4,
                                    May: 5, June: 6, July: 7, August: 8,
                                    September: 9, October: 10, November: 11, December: 12,
                                };

                                const aStartYear = parseInt(a.startDate?.year) || 0;
                                const bStartYear = parseInt(b.startDate?.year) || 0;

                                const aStartMonth = monthOrder[a.startDate?.month] || 0;
                                const bStartMonth = monthOrder[b.startDate?.month] || 0;

                                // First sort by year (descending for latest first)
                                if (bStartYear !== aStartYear) {
                                    return bStartYear - aStartYear;
                                }

                                // Then sort by month (descending for latest first)
                                return bStartMonth - aStartMonth;
                            }).map((exp) => (
                                <div
                                    key={exp._id}
                                    className="mb-3 bg-white rounded-lg shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] p-2 space-y-4 rounded-lg flex justify-between w-full h-[32] items-center"
                                >
                                    {/* Experience Info */}
                                    <div className='flex flex-col justify-center flex-wrap w-full h-full flex-1'>
                                        <h3 className="font-bold text-lg text-black">{exp.title}</h3>
                                        <p className="text-md text-secondary">{exp.company}</p>
                                        <p className="text-sm text-secondary">
                                            {exp.startDate?.month} {exp.startDate?.year} –{" "}
                                            {exp.currentlyWorking
                                                ? "Present"
                                                : `${exp.endDate?.month} ${exp.endDate?.year}`}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex">
                                        {/* Edit */}
                                        <button
                                            className="pr-3 text-[var(--color-bgcolor)] rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-[var(--color-btn-primary-hover)]"
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setEditingExp(exp); // store current exp in state for editing
                                            }}
                                        >
                                            <Pencil size={15} color="black" />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await deleteExperience(exp._id); // API call
                                                    const updated = experienceSection.experienceData.filter(
                                                        (item) => item._id !== exp._id
                                                    );
                                                    onChange("experienceData", updated);
                                                    showToast("Experience deleted successfully!");
                                                } catch (err) {
                                                    showToast("Failed to delete experience");
                                                }
                                            }}
                                            className="pr-3 text-[var(--color-bgcolor)] rounded-md cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-[var(--color-btn-primary-hover)]"
                                        >
                                            <Trash size={15} color="red" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>


                    {/* Add Experience button */}
                    <button
                        className="bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-[var(--color-bgcolor)] px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => setIsModalOpen(true)}>
                        Add Experience
                    </button>
                    {/* Modal for Add/Edit */}
                    {isModalOpen && (
                        <ExperienceModal
                            onClose={() => {
                                setIsModalOpen(false);
                                setEditingExp(null);
                            }}
                            initialData={editingExp} // pass data if editing
                            onSave={(newExp) => {
                                if (editingExp) {
                                    // Update existing
                                    const updated = experienceSection.experienceData.map((item) =>
                                        item._id === editingExp._id ? newExp : item
                                    );
                                    onChange("experienceData", updated);
                                } else {
                                    // Add new
                                    onChange("experienceData", [
                                        ...experienceSection.experienceData,
                                        newExp,
                                    ]);
                                }
                                setEditingExp(null);
                            }}
                        />
                    )}

                </>
            )
            }
        </div >
    )
}

export { ExperienceSection }
