import React, { useState } from "react";
import { Link as LinkIcon, Share2, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // 👈 make sure react-icons installed
import { ShareModal } from "./components/ShareModal"

const API_BASE = import.meta.env.VITE_API_BASE;

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";
  const urlObj = new URL(url);
  // case 1: normal watch link
  if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.get("v")) {
    return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
  }
  // case 2: short youtu.be link
  if (urlObj.hostname.includes("youtu.be")) {
    return `https://www.youtube.com/embed${urlObj.pathname}`;
  }
  return url; // fallback (already an embed link)
};

const CardPreview = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const profile = card?.style?.profileSection || {};
  const previewMode = "desktop" || "";

  // set banner once
  const banner = card?.style?.bannerImgUrl || "";

  const theme = {
    backgroundColor:
      card?.style?.themesSection?.backgroundColor || "#FFFFFF",
    textColor: card?.style?.themesSection?.textColor || "#111827",
    primaryColor: card?.style?.themesSection?.primaryColor || "#6B7280",
    secondaryColor: card?.style?.themesSection?.secondaryColor || "#6B7280",
    territoryColor: card?.style?.themesSection?.territoryColor || "#6B7280",
    fontFamily: card?.style?.fontStyleSection?.font || "Inter, sans-serif",
  };

  // ✅ Photos
  const photos = [
    "/assets/images/courses/1.jpg",
    "/assets/images/courses/3.jpg",
  ].filter(Boolean); // filter ensures only valid images

  // ✅ Gallery
  const gallery = ["/assets/images/courses/2.jpg"].filter(Boolean);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-sm mx-auto w-full fixed overflow-hidden">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-poppins">
          Live Preview
        </h3>
      </div>

      <div className="py-4 flex justify-center">
          <div
            className="h-[600px] w-[300px] overflow-y-auto rounded-2xl border-6 border-y-12 transition shadow-[0_10px_20px_0px_rgba(0,0,0,0.3)] duration-300 flex flex-col"
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              fontFamily: theme.fontFamily,
              borderColor: theme.primaryColor,
            }}
          >
            {/* ✅ Banner Preview */}
            {card?.style?.bannerImgUrl && card?.style?.bannerImgUrl !== "" && (
              <div className="w-full h-32 sm:h-40 md:h-48">
                <img
                  src={
                    card?.style?.bannerImgUrl.startsWith("blob:")
                      ? card?.style?.bannerImgUrl
                      : `${API_BASE}${card?.style?.bannerImgUrl}`
                  }
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!card?.style?.bannerImgUrl && (
              <div className="w-full h-32 sm:h-40 md:h-48"
                style={{
                  backgroundColor: card?.style?.themesSection?.territoryColor,
                }}>
                <div className="h-32 sm:h-40 md:h-48"></div>
              </div>
            )}

            {/* ✅ Profile Section ${card?.style?.headerStyleSection?.headerStyle}*/}
            <div
              className={`flex gap-3 px-4 pb-4 -mt-10 ${card?.style?.headerStyleSection?.headerStyle === "right"
                ? "justify-end"
                : card?.style?.headerStyleSection?.headerStyle === "left"
                  ? "justify-start"
                  : "justify-center"
                }`}
            >
              <div className="relative">
                <div
                  className={`flex items-center justify-center w-20 h-20 border border-gray-300 overflow-hidden ${profile.profileShapes === "square"
                    ? "rounded-md"
                    : "rounded-full"
                    } ${profile.profileRingOnPhoto ? "ring-2 ring-blue-500" : ""
                    }`}
                >
                  {profile?.profileImgUrl ? (
                    <img
                      src={
                        profile.profileImgUrl.startsWith("blob:")
                          ? profile.profileImgUrl
                          : `${API_BASE}${profile.profileImgUrl}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/default-profile.jpg"; // fallback image
                      }}
                    />
                  ) : (
                    <img
                    src={"/assets/images/sidebar/profile.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  )}

                </div>

                {/* ✅ Verified Badge */}
                {profile.profileVerified && (
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    ✔
                  </span>
                )}
              </div>
            </div>
            {/*  */}
            {/* ✅ Basic Info */}
            <div className="flex flex-col items-center space-y-1">
              {card?.about?.basicdetails?.cardVisibility && (
                <>
                  <p className="break-all font-semibold text-2xl">
                    {card?.about?.basicdetails?.name || ""}
                  </p>
                  <p className="break-all">
                    {card?.about?.basicdetails?.organization || ""}-
                    {card?.about?.basicdetails?.jobTitle || ""}
                  </p>
                  <p className="break-all">
                    {card?.about?.basicdetails?.email || ""}
                  </p>
                  <p className="break-all">
                    {card?.about?.basicdetails?.location || ""}
                  </p>
                </>
              )}


              {/* ✅ Action Buttons */}
              <div className="flex justify-center gap-3 mt-4">
                {/* Call Me Button */}
                <button
                  onClick={() => {
                    const type = card?.about?.mainButton?.buttonType || "call";
                    const text = card?.about?.mainButton?.Message || "";

                    if (type.toLowerCase() === "call") {
                      window.location.href = `tel:${text}`;
                    } else if (type.toLowerCase() === "mail") {
                      window.location.href = `mailto:${text}`;
                    } else if (type.toLowerCase() === "link") {
                      window.open(text, "_blank");
                    }
                  }}
                  className="px-4 py-2 text-white text-sm font-medium rounded-md shadow hover:opacity-90 transition"
                  style={{ backgroundColor: theme.secondaryColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.territoryColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.secondaryColor)}
                >
                  {card?.about?.mainButton?.buttonText || "Call Me Now"}
                </button>

                {/* WhatsApp Icon Button */}
                {card.about.whatsappButton?.isEnabled && (
                  <button
                    onClick={() => {
                      const number = card?.about?.whatsappButton?.whatsappNumber || "";
                      const message = card?.about?.whatsappButton?.message || "Hello!!!";
                      const url = `https://wa.me/${number}?text=${encodeURIComponent(
                        message
                      )}`;
                      window.open(url, "_blank");
                    }}
                    className="flex items-center justify-center w-10 h-10 text-white rounded-md shadow hover:opacity-90 transition"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* ✅ Sections */}
              <div
                className="space-y-4 mt-3 text-sm px-3"
                style={{ color: theme.textColor }}
              >
                {/* Links Section */}
                {card.content.linksSection?.isEnabled && (
                  <div className="space-y-1 text-lg">
                    <a
                      href={card.content.linksSection.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline underline"
                      style={{ color: theme.textColor }}
                    >
                      {card.content.linksSection.title}
                    </a>
                  </div>
                )}

                {/* Text Section */}
                {card.content.textSection?.isEnabled && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{card.content.textSection?.heading}</h4>
                    <h5 className="opacity-90 text-base font-medium">{card.content.textSection?.title}</h5>
                    <p className="break-words text-sm ">
                      {card.content.textSection.content}
                    </p>
                  </div>
                )}

                {/* YouTube Section */}
                {card.content.youtubeSections?.isEnabled && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{card.content.youtubeSections?.title}</h4>
                    <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={getYoutubeEmbedUrl(card.content?.youtubeSections?.link)}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {console.log("From Preview", card)}
                {/* ✅ Gallery Section (show title only if image exists) */}
                {card?.content?.gallerySections?.isEnabled && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">
                      Gallery
                    </h4>
                    <img
                      // src={`${API_BASE}${card?.content?.gallerySections?.imgUrl}`}
                      src={
                        card?.content?.gallerySections?.image?.startsWith("blob:")
                          ? card?.content?.gallerySections?.image
                          : card?.content?.gallerySections?.imgUrl
                            ? `${API_BASE}${card?.content?.gallerySections?.imgUrl}`
                            : "/assets/images/placeholder.png" // fallback
                      }
                      alt={`Gallery`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                {/* ✅ Photos Section (show title only if image exists) */}

                {/* {card?.content?.photoSections?.isEnabled && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Photos</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[...(card.content.photoSections.photos || []), ...(card.content.photoSections.imgUrls || [])]
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img.startsWith("blob:") ? img : `${API_BASE}${img}`}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                    </div>
                  </div>
                )} */}
                {card?.content?.photoSections?.isEnabled && (
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">Photos</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[...(card.content.photoSections.photos || []), ...(card.content.photoSections.imgUrls || [])]
                        .filter((img) => img && img.trim() !== "") // ✅ remove empty/cleared blobs
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img.startsWith("blob:") ? img : `${API_BASE}${img}`}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4 mb-4">
              {/* Call Me Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 text-white text-sm font-medium rounded-full shadow hover:opacity-90 transition flex items-center cursor-pointer gap-1"
                style={{ backgroundColor: theme.secondaryColor }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.territoryColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.secondaryColor)}
              >
                <Share2 size={16} /> Share
              </button>

              {isOpen && (
                <ShareModal card={card} onClose={() => setIsOpen(false)} />
              )}
              {
                card.settings.showSaveContact === true && (
                  <button
                    className="px-4 py-2 text-white text-sm font-medium rounded-full shadow hover:opacity-90 transition flex items-center cursor-pointer gap-1 "
                    style={{ backgroundColor: theme.secondaryColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.territoryColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.secondaryColor)}
                  >
                    <Download size={16} />Save Contact
                  </button>
                )
              }
            </div>
            {
              card.settings.removeBranding === false && (
                <h1 className="flex justify-center items-center">Card Created From LMS</h1>
              )
            }
          </div>
      </div>

      <div className="grid grid-cols-1 gap-3">{/* Action buttons here */}</div>
    </div>
  );
};

export default CardPreview;