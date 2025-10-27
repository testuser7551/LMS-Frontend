import React, { useState, useEffect, useContext } from "react";
import CustomDropdown from "../common/CustomDropdown";
import { showToast } from "../../../../../components/toast"; // ✅ import your toast util
import { saveEducationSection, updateEducationById } from "../../../../../api/carddesign/contentSection";
import { CardContext } from '../../../../../context/CardContext';
const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
];

const years = Array.from(
    { length: new Date().getFullYear() - 1940 + 1 },
    (_, i) => {
        const year = 1940 + i;
        return { label: year.toString(), value: year.toString() };
    }
).reverse();

function EducationModal({ onClose, onSave, initialData }) {
    const { userCard } = useContext(CardContext);
    const [formData, setFormData] = useState({
        organization: "",
        degree: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        currentlyStudying: false,
    });
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
    const handleChange = (field, value) => {
        if (field.startsWith("startDate.") || field.startsWith("endDate.")) {
            const [parent, key] = field.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: { ...prev[parent], [key]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const validateForm = () => {
        if (!formData.organization.trim()) {
            showToast("Organization Name is required");
            return false;
        }
        if (!formData.startDate.month || !formData.startDate.year) {
            showToast("Start date is required");
            return false;
        }

        if (!formData.currentlyStudying) {
            if (!formData.endDate.month || !formData.endDate.year) {
                showToast("End date is required");
                return false;
            }

            // Validate start <= end
            const start = new Date(
                `${formData.startDate.month} 1, ${formData.startDate.year}`
            );
            const end = new Date(
                `${formData.endDate.month} 1, ${formData.endDate.year}`
            );

            if (start > end) {
                showToast("Start date cannot be after end date");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            let savedData;
            if (initialData?._id) {
                // Update API call
                const payload = {
                    education: formData,
                    user_id: userCard?.user_id || "",
                };
                savedData = await updateEducationById(initialData._id, payload);
                showToast("Education updated successfully!");
            } else {
                // Add new
                const payload = {
                    education: formData,
                    user_id: userCard?.user_id || "",
                };
                savedData = await saveEducationSection(payload);
                showToast("Saved Education Successfully!");
            }

            onSave(savedData.education);
            onClose();
        } catch (error) {
            showToast("Failed to Save Education");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--color-bgcolor)] p-6 rounded-lg w-full max-w-md shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--color-headtext)] mb-4 font-poppins">
                    Add Education
                </h3>

                {/* Title */}
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                    placeholder="School *"
                    className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-3 font-poppins"
                />

                {/* Company */}
                <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                    placeholder="Degree"
                    className="w-full px-3 py-2 border border-[var(--color-secondarybgcolor)] rounded-lg mb-3 font-poppins"
                />

                {/* Start Date */}
                <div className="flex gap-2 mb-3 items-end mt-3">
                    <CustomDropdown
                        label="Start Date *"
                        options={months}
                        value={formData.startDate.month}
                        onChange={(val) => handleChange("startDate.month", val)}
                        width="w-32"
                        placeholder="Month"
                    />
                    <CustomDropdown
                        options={years}
                        value={formData.startDate.year}
                        onChange={(val) => handleChange("startDate.year", val)}
                        width="w-full"
                        placeholder="Year"
                    />
                </div>

                {/* Currently Studying Toggle */}
                <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md text-[var(--color-headtext)] font-poppins">
                        Currently Studying
                    </h4>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.currentlyStudying}
                            onChange={(e) =>
                                handleChange("currentlyStudying", e.target.checked)
                            }
                            className="sr-only"
                        />
                        <span
                            className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${formData.currentlyStudying
                                ? "bg-[var(--color-btn-primary)]"
                                : "bg-[var(--color-btn-secondary)]"
                                }`}
                        >
                            <span
                                className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${formData.currentlyStudying ? "translate-x-5" : ""
                                    }`}
                            />
                        </span>
                    </label>
                </div>

                {/* End Date */}
                {!formData.currentlyStudying && (
                    <div className="flex gap-2 mb-3 items-end">
                        <CustomDropdown
                            label="End Date *"
                            options={months}
                            value={formData.endDate.month}
                            onChange={(val) => handleChange("endDate.month", val)}
                            width="w-32"
                            placeholder="Month"
                        />
                        <CustomDropdown
                            options={years}
                            value={formData.endDate.year}
                            onChange={(val) => handleChange("endDate.year", val)}
                            width="w-full"
                            placeholder="Year"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[var(--color-btn-secondary)] text-primary rounded-lg font-poppins cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)] text-white rounded-lg font-poppins cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export { EducationModal };
