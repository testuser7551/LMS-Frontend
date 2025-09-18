// import React, { useState } from "react";
// import {CertificateSearchBox} from "./components/certificateTabComponents/CertificateSearchBox";
// function CertificateTab() {
//   const [certificate, setCertificate] = useState({
//     certificate: {
//       isEnabled: false,
//     },
//   });

//   // ✅ handler for toggling certificate.isEnabled
//   const handleToggleCertificate = (checked) => {
//     setCertificate((prev) => ({
//       ...prev,
//       certificate: {
//         ...prev.certificate,
//         isEnabled: checked,
//       },
//     }));
//   };

//   return (
//     <div>
//       {/* Enable toggle card */}
//       <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
//         <div className="flex justify-between items-center">
//           <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit">
//             Enable
//           </h4>
//           <div>
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={certificate.certificate.isEnabled}
//                 onChange={(e) => handleToggleCertificate(e.target.checked)}
//                 className="sr-only"
//               />
//               <span
//                 className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
//                   certificate.certificate.isEnabled
//                     ? "bg-[var(--color-btn-primary)]"
//                     : "bg-[var(--color-btn-secondary)]"
//                 }`}
//               >
//                 <span
//                   className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
//                     certificate.certificate.isEnabled ? "translate-x-5" : ""
//                   }`}
//                 />
//               </span>
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Show search box card only if enabled */}
//       {certificate.certificate.isEnabled && <CertificateSearchBox />}
//     </div>
//   );
// }

// export { CertificateTab };


import React from "react";
import { CertificateSearchBox } from "./components/certificateTabComponents/CertificateSearchBox";
import { isEnabledContent } from "../../../api/carddesign/contentSection";
import { showToast } from "../../../components/toast.js";

function CertificateTab({ certificate, onChange }) {
  const handleToggleCertificate = async (checked) => {
    // 🔄 update parent state
    onChange({
      ...certificate,
      isEnabled: checked,
    });

    try {
      const payload = { contentpage: "certificate", isEnabled: checked };
      await isEnabledContent(payload);

      showToast(
        checked ? "Certificate Enabled" : "Certificate Disabled",
        "top-center",
        3000,
        "dark"
      );
    } catch (error) {
      showToast("Failed to update Certificate", "top-center", 3000, "dark");
    }
  };

  return (
    <div>
      {/* Enable toggle card */}
      <div className="bg-[var(--color-bgcolor)] p-4 rounded-lg mt-4 border border-[var(--color-secondarybgcolor)]">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-[var(--color-headtext)] font-outfit">
            Enable
          </h4>
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={certificate?.isEnabled || false}
                onChange={(e) => handleToggleCertificate(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                  certificate?.isEnabled
                    ? "bg-[var(--color-btn-primary)]"
                    : "bg-[var(--color-btn-secondary)]"
                }`}
              >
                <span
                  className={`bg-[var(--color-bgcolor)] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    certificate?.isEnabled ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Show search box card only if enabled */}
      {certificate?.isEnabled && <CertificateSearchBox />}
    </div>
  );
}

export { CertificateTab };

