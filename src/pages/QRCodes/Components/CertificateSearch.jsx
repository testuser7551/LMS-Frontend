import React, { useState, useEffect, useContext } from "react";
import { getAllCertificates } from "../../../api/carddesign/contentSection";
import { Search } from "lucide-react";
const API_BASE = import.meta.env.VITE_API_BASE;

function CertificateSearchBox({ onChange }) {
    const [search, setSearch] = useState("");
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [certificateFiles, setCertificateFiles] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await getAllCertificates();
                if (response && Array.isArray(response.certificates)) {
                    const mapped = response.certificates.map((cert) => ({
                        id: cert.certificate,
                        name: cert.course?.title || "",
                        certificateUrl: cert.certificate,
                    }));
                    setCertificateFiles(mapped);
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
            }
        };
        fetchCertificates();
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".search-container")) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const filtered = certificateFiles.filter((cert) =>
        cert.name.toLowerCase().startsWith(search.toLowerCase())
    );


    const handleSelect = (item) => {
        setSearch("");
        setHighlightedIndex(-1);
        setSelectedCertificate(item);

        // Send selected certificate URL to parent
        if (onChange) {
            onChange(item.certificateUrl);
        }
    };

    const handleRemove = () => {
        setSelectedCertificate(null);
        if (onChange) {
            onChange("");
        }
    };

    const handleKeyDown = (e) => {
        if (!search || filtered.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < filtered.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filtered.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                handleSelect(filtered[highlightedIndex]);
            }
        }
    };

    return (
        <div className="mb-6 search-container relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Certificate
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    placeholder="Enter Course Title to Search Certificate"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setHighlightedIndex(-1);
                        setIsDropdownVisible(true);
                    }}
                    onFocus={() => setIsDropdownVisible(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-primary)]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Show dropdown if visible and there are filtered items or search is not empty */}
            {isDropdownVisible && (filtered.length > 0 || search.length > 0) && (
                <ul className="mt-2 border border-[var(--color-secondarybgcolor)] rounded-lg bg-white max-h-40 overflow-y-auto z-50 absolute w-full">
                    {filtered.length > 0 ? (
                        filtered.map((item, idx) => (
                            <li
                                key={item.id}
                                className={`px-3 py-2 cursor-pointer ${highlightedIndex === idx
                                    ? "bg-[var(--color-btn-primary)] text-white"
                                    : "hover:bg-[var(--color-btn-secondary)]"
                                    }`}
                                onClick={() => {
                                    handleSelect(item);
                                    setIsDropdownVisible(false);
                                }}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                            >
                                {item.name}
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}

            {/* Selected certificate preview remains unchanged */}
            {selectedCertificate && (
                <div className="mt-4 p-2 border border-[var(--color-secondarybgcolor)] rounded-lg bg-white relative w-52">
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => {
                            handleRemove();
                            setIsDropdownVisible(false);
                        }}
                    >
                        ×
                    </button>
                    {selectedCertificate.certificateUrl && (
                        <img
                            src={`${API_BASE}${selectedCertificate.certificateUrl}`}
                            alt={selectedCertificate.name || "Selected certificate"}
                            className="w-full h-auto rounded-lg border border-gray-300"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
export default CertificateSearchBox;
