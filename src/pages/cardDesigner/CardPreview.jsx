import React, { useState } from "react";
import { Link as LinkIcon, Share2, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ShareModal } from "./components/ShareModal"

const API_BASE = import.meta.env.VITE_API_BASE;

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);

    // case 1: normal watch link
    if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
    }

    // case 2: short youtu.be link
    if (urlObj.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${urlObj.pathname}`;
    }

    // fallback (maybe already embed link)
    return url;
  } catch (err) {
    // invalid URL → return empty
    return "";
  }
};


const CardPreview = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const profile = card?.style?.profileSection || {};
  const previewMode = "desktop" || "";
  console.log("From Preview", card)
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

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            {/* ✅ Links Section */}
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

            {/* ✅ Text Section */}
            {card.content.textSection?.isEnabled && (
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{card.content.textSection?.heading}</h4>
                <h5 className="opacity-90 text-base font-medium">{card.content.textSection?.title}</h5>
                <p className="break-words text-sm ">
                  {card.content.textSection.content}
                </p>
              </div>
            )}

            {/* ✅ YouTube Section */}
            {card.content.youtubeSections?.isEnabled && (
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">{card?.content?.youtubeSections?.title}</h4>
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

            {/* ✅ Gallery Section */}
            {card?.content?.gallerySections?.isEnabled && (
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">
                  Gallery
                </h4>
                <img
                  src={
                    card?.content?.gallerySections?.image?.startsWith("blob:")
                      ? card?.content?.gallerySections?.image
                      : card?.content?.gallerySections?.imgUrl
                        ? `${API_BASE}${card?.content?.gallerySections?.imgUrl}`
                        : "/assets/images/placeholder.png"
                  }
                  alt={`Gallery`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* ✅ Photos Section */}
            {card?.content?.photoSections?.isEnabled && (
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">Photos</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[...(card.content.photoSections.photos || []), ...(card.content.photoSections.imgUrls || [])]
                    .filter((img) => img && img.trim() !== "")
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
          </>
        );

      case "about":
        return card?.contentAbout?.isEnabled ? (
          <>
            {card?.contentAbout?.aboutMeSection?.isEnabled && (
              <div className="flex flex-col items-center space-y-2 text-center">
                <h2 className="text-lg font-bold" style={{ color: theme.textColor }}>
                  {card?.contentAbout?.aboutMeSection?.heading || ""}
                </h2>
                <h3 className="text-md font-medium opacity-90">
                  {card?.contentAbout?.aboutMeSection?.title || ""}
                </h3>
                <p className="text-sm opacity-80 break-words">
                  {card?.contentAbout?.aboutMeSection?.content || ""}
                </p>
              </div>
            )}

            {card?.contentAbout?.experienceSection?.isEnabled && (
              <div className="flex flex-col space-y-4">
                <h2
                  className="text-md font-bold mb-6"
                  style={{ color: theme.textColor }}
                >
                  {card?.contentAbout?.experienceSection?.experienceTitle || "Experience"}
                </h2>

                <div className="space-y-3">
                  {[...card?.contentAbout?.experienceSection?.experienceData]
                    .sort((a, b) => {
                      // month to number map
                      const monthOrder = {
                        January: 1, February: 2, March: 3, April: 4,
                        May: 5, June: 6, July: 7, August: 8,
                        September: 9, October: 10, November: 11, December: 12,
                      };

                      const aYear = parseInt(a.startDate?.year) || 0;
                      const bYear = parseInt(b.startDate?.year) || 0;

                      const aMonth = monthOrder[a.startDate?.month] || 0;
                      const bMonth = monthOrder[b.startDate?.month] || 0;

                      // sort by year first, then month (latest first)
                      if (bYear !== aYear) return bYear - aYear;
                      return bMonth - aMonth;
                    })
                    .map((exp) => (
                      <div
                        key={exp._id}
                        className="relative border-l-3 pl-3 pb-2"
                        style={{ borderColor: theme.territoryColor }}
                      >
                        {/* Timeline Dot */}
                        <span
                          className="absolute -left-[8px] -top-3 h-3 w-3 rounded-full"
                          style={{ backgroundColor: theme.primaryColor }}
                        />

                        {/* Experience Info */}
                        <div className="">
                          <h3 className="text-md font-semibold">{exp.title}</h3>
                          <p className="text-xs opacity-80">{exp.company}</p>
                          <p className="text-xs opacity-70">
                            {exp.startDate?.month} {exp.startDate?.year} –{" "}
                            {exp.currentlyWorking
                              ? "Present"
                              : `${exp.endDate?.month} ${exp.endDate?.year}`}
                          </p>
                        </div>
                      </div>

                    ))}
                </div>
              </div>
            )}

            {card?.contentAbout?.educationSection?.isEnabled && (
              <div>
                <div className="flex flex-col space-y-4">
                  <h2
                    className="text-md font-bold mb-6"
                    style={{ color: theme.textColor }}
                  >
                    {card?.contentAbout?.educationSection?.educationTitle || "Education"}
                  </h2>

                  <div className="space-y-3">
                    {[...card?.contentAbout?.educationSection?.educationData]
                      .sort((a, b) => {
                        // month to number map
                        const monthOrder = {
                          January: 1, February: 2, March: 3, April: 4,
                          May: 5, June: 6, July: 7, August: 8,
                          September: 9, October: 10, November: 11, December: 12,
                        };

                        const aYear = parseInt(a.startDate?.year) || 0;
                        const bYear = parseInt(b.startDate?.year) || 0;

                        const aMonth = monthOrder[a.startDate?.month] || 0;
                        const bMonth = monthOrder[b.startDate?.month] || 0;

                        // sort by year first, then month (latest first)
                        if (bYear !== aYear) return bYear - aYear;
                        return bMonth - aMonth;
                      })
                      .map((exp) => (
                        <div
                          key={exp._id}
                          className="relative border-l-3 pl-3 pb-2"
                          style={{ borderColor: theme.territoryColor }}
                        >
                          {/* Timeline Dot */}
                          <span
                            className="absolute -left-[8px] -top-3 h-3 w-3 rounded-full"
                            style={{ backgroundColor: theme.primaryColor }}
                          />

                          {/* Education Info */}
                          <div className="">
                            <h3 className="text-md font-semibold">{exp.organization}</h3>
                            <p className="text-xs opacity-80">{exp.degree}</p>
                            <p className="text-xs opacity-70">
                              {exp.startDate?.month} {exp.startDate?.year} –{" "}
                              {exp.currentlyStudying
                                ? "Present"
                                : `${exp.endDate?.month} ${exp.endDate?.year}`}
                            </p>
                          </div>
                        </div>

                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null;




      case "certificate":
        // const certificates = [
        //   "/assets/images/certificates/aron.jpg",
        //   "/assets/images/certificates/1.png",
        //   "/assets/images/certificates/3.jpg",
        //   "/assets/images/certificates/4.jpg",
        // ];
        const certificates = card?.certification?.coursecertificates
        return (
          <div className="text-center py-4 space-y-4">
            {certificates.map((cert, index) => (
              <div key={index} className="w-full">
                <img
                  // src={cert}
                  // alt={`Certificate ${index + 1}`}
                  src={`${API_BASE}${cert}`}  // ✅ prepend API_BASE
                  alt={`certificate_${index}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-sm mx-auto w-full lg:fixed mt-10 lg:mt-0">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 lg:mb-2 font-poppins">
          Live Preview
        </h3>
      </div>

      <div className="lg:py-4 flex justify-center">
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

          {/* ✅ Profile Section */}

          <div
            className={`flex gap-3 px-4 pb-4 -mt-10 ${card?.style?.headerStyleSection?.headerStyle === "right"
              ? "justify-end"
              : card?.style?.headerStyleSection?.headerStyle === "left"
                ? "justify-start"
                : "justify-center"
              }`}
          >


            <div className={`relative ${profile.profileShapes === "circle" ? "rounded-full" : "rounded-lg"} 
              ${profile.profileRingOnPhoto ? "p-1" : ""}`}
              style={profile.profileRingOnPhoto ? {
                background: card?.style.themesSection.primaryColor
              } : {}}
            >
              <img
                src={
                  profile?.profileImgUrl?.startsWith("blob:")
                    ? profile.profileImgUrl
                    : profile?.profileImgUrl
                      ? `${API_BASE}${profile.profileImgUrl}`
                      : card?.style?.profileSection?.profileImgUrl
                        ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                        : "/assets/images/allCard/profile.png"
                }
                alt={card?.about?.basicdetails?.name}
                className={`w-20 h-20 object-cover
                  ${profile.profileShapes === "circle" ? "rounded-full" : "rounded-lg"}`}
              />
              {profile.profileVerified && (
                <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  ✔
                </span>
              )}
            </div>
          </div>

          {/* ✅ Basic Info (Always visible) */}

          <div className="flex flex-col items-center space-y-1 -mt-2 mb-2">
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
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {/* Call Me Button */}
            {(card?.about?.mainButton?.buttonText !== null && card?.about?.mainButton?.buttonInput ) && (
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
            )}


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

          {/* ✅ Tab Navigation */}
          {(card?.contentAbout?.isEnabled || card?.certification?.isEnabled) && (
            <div className="flex justify-center border-b" style={{ borderColor: theme.primaryColor }}>

              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === "home" ? "border-b-2" : ""}`}
                style={{
                  color: activeTab === "home" ? theme.primaryColor : theme.textColor,
                  borderColor: activeTab === "home" ? theme.primaryColor : "transparent"
                }}
                onClick={() => setActiveTab("home")}
              >
                Home
              </button>

              {card?.contentAbout?.isEnabled && (
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "about" ? "border-b-2" : ""}`}
                  style={{
                    color: activeTab === "about" ? theme.primaryColor : theme.textColor,
                    borderColor: activeTab === "about" ? theme.primaryColor : "transparent"
                  }}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
              )}
              {card?.certification?.isEnabled && (
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "certificate" ? "border-b-2" : ""}`}
                  style={{
                    color: activeTab === "certificate" ? theme.primaryColor : theme.textColor,
                    borderColor: activeTab === "certificate" ? theme.primaryColor : "transparent"
                  }}
                  onClick={() => setActiveTab("certificate")}
                >
                  Certification
                </button>
              )}
            </div>  
          )}

          {/* ✅ Tab Content */}
          <div
            className="space-y-4 mt-3 text-sm px-3"
            style={{ color: theme.textColor }}
          >
            {renderTabContent()}
          </div>

          <div className="flex justify-center gap-3 mt-4 mb-4">
            {/* Share Button */}
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

            {/* Save Contact Button */}
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

          {/* Branding */}
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