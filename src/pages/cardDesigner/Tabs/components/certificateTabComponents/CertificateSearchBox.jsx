import React, { useState, useEffect, useContext } from "react";
import { getAllCertificates } from "../../../../../api/carddesign/contentSection";
import { updateCertificates } from "../../../../../api/carddesign/contentSection";
import { CardContext } from '../../../../../context/CardContext';
import {showToast} from "../../../../../components/toast";
const API_BASE = import.meta.env.VITE_API_BASE;

function CertificateSearchBox({ certification, onChange }) {
  const { userCard } = useContext(CardContext);
  const [search, setSearch] = useState("");
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [certificateFiles, setCertificateFiles] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getAllCertificates(userCard?.user_id);

        if (response && Array.isArray(response.certificates)) {
          const mapped = response.certificates.map((cert) => ({
            id: cert.certificate,
            name: cert.course?.title || "",
            certificateUrl: cert.certificate,
          }));

          // ✅ just store for displaying
          setCertificateFiles(mapped);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();

    // ✅ set from certification prop
    if (certification?.coursecertificates?.length) {
      setSelectedCertificates(
        certification.coursecertificates.map((url) => ({
          id: url,
          name: "", // no course title from props
          certificateUrl: url,
        }))
      );
    }
  }, [certification]);


  // Filter results by search text
  const filtered = certificateFiles.filter((cert) =>
    cert.name.toLowerCase().startsWith(search.toLowerCase())
  );

  // Handle selecting item
  const handleSelect = (item) => {
    setSearch("");
    setHighlightedIndex(-1);

    if (item) {
      setSelectedCertificates((prev) => {
        if (prev.find((c) => c.id === item.id)) return prev;

        const updated = [...prev, item];

        // 🔄 update parent certification
        if (onChange) {
          onChange({
            ...certification,
            coursecertificates: updated.map((c) => c.certificateUrl),
          });
        }

        return updated;
      });
    }
  };

  const handleRemove = (index, imagePath) => {
    setSelectedCertificates((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);

      // 🔄 update parent certification
      if (onChange) {
        onChange({
          ...certification,
          coursecertificates: updated.map((c) => c.certificateUrl),
        });
      }

      return updated;
    });

    console.log("Removed certificate:", imagePath);
  };

  // Handle keyboard navigation
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

  const handleSave = async () => {
    try {
      const certificateImageUrl = selectedCertificates.map(cert => cert.certificateUrl); // ✅ _id from DB

      const payload = {
        certificateImageUrl: certificateImageUrl,
        user_id: userCard?.user_id || "",
      };

      const response = await updateCertificates(payload);

      //console.log("Update response:", response);

      // ✅ Fetch again to reload saved certificates
      const refreshed = await getAllCertificates(userCard?.user_id);
      if (refreshed && Array.isArray(refreshed.certificates)) {
        setCertificateFiles(
          refreshed.certificates.map((cert) => ({
            _id: cert.certificate,
            name: cert.course?.title || "",
            certificateUrl: cert.certificate
          }))
        );

        // Optionally reset selectedCertificates if backend sends updated selected state
        // setSelectedCertificates(
        //   refreshed.certificates
        //     .filter(cert => certificateIds.includes(cert._id))
        //     .map(cert => ({
        //       _id: cert._id,
        //       name: cert.course?.title || "",
        //       certificateUrl: cert.certificate
        //     }))
        // );
      }

      showToast("Certificates updated successfully!","top-center",10000,"dark");
    } catch (error) {
      console.error("Error updating certificates:", error);
      showToast("Failed to update certificates.","top-center",10000,"dark");
    }
  };

  return (
    <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
      <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit mb-2">
        Search Certificates
      </h4>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setHighlightedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        className="w-full p-2 border border-[var(--color-secondarybgcolor)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-primary)]"
      />

      {/* Search results */}
      {search && (
        <ul className="mt-2 border border-[var(--color-secondarybgcolor)] rounded-lg bg-white max-h-40 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <li
                key={item.id}
                className={`px-3 py-2 cursor-pointer ${highlightedIndex === idx
                  ? "bg-[var(--color-btn-primary)] text-white"
                  : "hover:bg-[var(--color-btn-secondary)]"
                  }`}
                onClick={() => handleSelect(item)}
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

      {/* Selected certificate titles */}
      {selectedCertificates.length > 0 && (
        // <div className="mt-4 space-y-2">
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedCertificates.map((cert, index) => (
            <div
              key={index}
              className="p-2 border border-[var(--color-secondarybgcolor)] rounded-lg bg-white"
            >
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleRemove(index, cert.certificateUrl)}
                >
                  ×
                </button>
              </div>


              {/* ✅ Certificate preview */}
              {cert.certificateUrl && (
                <div className="mt-2">
                  <img
                    src={`${API_BASE}${cert.certificateUrl}`}  // ✅ prepend API_BASE
                    alt={`${cert.name} certificate`}
                    className="w-full h-auto rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedCertificates.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[var(--color-btn-primary)] text-white rounded-lg hover:bg-[var(--color-btn-secondary)]"
          >
            Save
          </button>
        </div>
      )}

    </div>
  );
}

export { CertificateSearchBox };
