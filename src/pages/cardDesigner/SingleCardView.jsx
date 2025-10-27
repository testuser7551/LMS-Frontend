import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiDownload, FiCopy, FiFacebook, FiTwitter, FiLinkedin, FiExternalLink, FiShare2 } from "react-icons/fi";
import { getCardDesignWithId } from "../../api/card-design";
import { ShareModal } from "./components/ShareModal";

const API_BASE = import.meta.env.VITE_API_BASE;

function SingleCardView() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const cardId = query.get("id");

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(!card);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  // Share modal state
  const [selectedCard, setSelectedCard] = useState(null);
  const [shareInputUrl, setShareInputUrl] = useState("");
  const [activeShareTab, setActiveShareTab] = useState("whatsapp");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [copied, setCopied] = useState(false);


  const getYouTubeEmbedUrl = (url) => {
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


  useEffect(() => {
    const fetchCard = async () => {
      if (!cardId) {
        navigate("/login");
      }
      if (cardId) {
        setLoading(true);
        try {
          const res = await getCardDesignWithId(cardId);
          //  console.log("getCardDesign", res);
          const fetchedCard = res;
          if (fetchedCard?.content?.youtubeSections?.link) {
            fetchedCard.content.youtubeSections.link = getYouTubeEmbedUrl(
              fetchedCard.content.youtubeSections.link
            );
          }
          setCard(fetchedCard);
        } catch (err) {
          console.error("Error fetching card:", err.response || err.message);
          setError("Failed to load card.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCard();
  }, [cardId]);

  // Function to open share modal
  // const openShareModal = (link) => {
  //   const finalLink = link
  //     ? `${window.location.origin}${link}`
  //     : `${window.location.origin}/cardview?id=${cardId}`;
  //   setShareInputUrl(finalLink);
  //   setActiveShareTab("whatsapp");
  //   setWhatsappNumber("");
  //   setEmailAddress("");
  //   setCopied(false);
  //   setSelectedCard(card);
  // };

  // Function to open share modal
  const openShareModal = (link, type = "card") => {
    const finalLink = link
      ? `${link}`
      : `${window.location.origin}/cardview?id=${cardId}`;

    setShareInputUrl(finalLink);
    setActiveShareTab("whatsapp");
    setWhatsappNumber("");
    setEmailAddress("");
    setCopied(false);

    // Save share type + url in selectedCard
    setSelectedCard({
      ...card,
      shareType: type,   // "card" or "certificate"
      shareUrl: finalLink,
    });
  };


  const handleCertificateDownload = async (cert) => {

    if (!cert) return;
    const confirmDownload = window.confirm(
      "Do you want to download this certificate?"
    );
    if (!confirmDownload) return;
    try {
      console.log(`${API_BASE}${cert}`);
      const response = await fetch(`${API_BASE}${cert}`);
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch certificate");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      // const extension = cert.split(".").pop(); // pdf, png, jpg, etc.
      const link = document.createElement("a");
      link.href = url;
      link.download = `ce         rtificate-${cert || "file"}`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Certificate download failed:", error);
      showError("Failed to download the certificate.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading card...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Card not found.</p>
      </div>
    );
  }

  const textColor = card?.style?.themesSection?.textColor || "#000000";
  const font = card?.style?.headerStyleSection?.font;

  // Get profile section properties
  const profileShapes = card?.style?.profileSection?.profileShapes || "circle";
  const profileRingOnPhoto = card?.style?.profileSection?.profileRingOnPhoto || false;
  const profileVerified = card?.style?.profileSection?.profileVerified || false;

  // Get header style
  const headerStyle = card?.style?.headerStyleSection?.headerStyle || "center";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: card?.style.themesSection.primaryColor || "#1f2937" }}
    >
      <div
        className="my-6 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-3xl rounded-2xl shadow-lg overflow-hidden text-center relative"
        style={{ background: card?.style.themesSection.backgroundColor }}
      >
        {/* Banner + Profile */}
        <div className="relative">
          <div
            className="w-full h-32 sm:h-40 md:h-48"
            style={{
              backgroundColor: !card?.style?.bannerImgUrl
                ? card?.style?.themesSection?.territoryColor || "#ccc"
                : undefined,
            }}
          >
            {card?.style?.bannerImgUrl && (
              <img
                src={`${API_BASE}${card?.style?.bannerImgUrl}`}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            )}
          </div>


          <div
            className={`absolute -bottom-12 sm:-bottom-14 transform -translate-x-1/2 ${card?.style?.headerStyleSection?.headerStyle === "left"
              ? "left-12 sm:left-14 translate-x-0"
              : card?.style?.headerStyleSection?.headerStyle === "right"
                ? "right-12 sm:right-14 translate-x-0"
                : "left-1/2"
              }`}
          >

            <div className={`relative ${profileShapes === "circle" ? "rounded-full" : "rounded-lg"} 
              ${profileRingOnPhoto ? "p-1" : ""}`}
              style={profileRingOnPhoto ? {
                background: card?.style.themesSection.primaryColor
              } : {}}
            >
              <img
                src={
                  card?.style?.profileSection?.profileImgUrl
                    ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                    : "/assets/images/allCard/profile.png"
                }
                alt={card?.about?.basicdetails?.name}
                className={`w-24 h-24 sm:w-28 sm:h-28 border-4 border-white shadow-md bg-gray-200
                  ${profileShapes === "circle" ? "rounded-full" : "rounded-lg"}`}
              />
              {profileVerified && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name, Job, Location */}
        <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: textColor, fontFamily: font }}>
            {card?.about?.basicdetails?.name}
          </h2>
          <p className="mt-1 text-sm sm:text-base" style={{ color: textColor, fontFamily: font }}>
            {card?.about?.basicdetails?.organization} - {card?.about?.basicdetails?.jobTitle}
          </p>

          <p className="text-xs sm:text-sm" style={{ color: textColor, fontFamily: font }}>
            {card?.about?.basicdetails?.email}
          </p>
          <p className="text-xs sm:text-sm" style={{ color: textColor, fontFamily: font }}>
            {card?.about?.basicdetails?.location}
          </p>
          {/* Contact Buttons */}
          <div className={"mt-6 flex gap-3 flex-wrap justify-center"
          }>
            {/* {card?.about?.mainButton?.isEnabled !== false && (
              <a
                href={card?.about?.mainButton?.buttonInput}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2 rounded-full transition inline-block text-sm sm:text-base"
                style={{
                  backgroundColor: card?.style.themesSection.secondaryColor,
                  color: "#FFFFFF",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = card?.style.themesSection.territoryColor;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = card?.style.themesSection.secondaryColor;
                }}
              >
                {card?.about?.mainButton?.buttonText}
              </a>
            )} */}


            {card?.about?.mainButton?.buttonText && card?.about?.mainButton?.buttonInput && (
              <a
                href={card?.about?.mainButton?.buttonInput}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2 rounded-md transition inline-block text-sm sm:text-base"
                style={{
                  backgroundColor: card?.style.themesSection.secondaryColor,
                  color: "#FFFFFF",
                  fontFamily: font
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = card?.style.themesSection.territoryColor;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = card?.style.themesSection.secondaryColor;
                }}
              >
                {card?.about?.mainButton?.buttonText}
              </a>
            )}
            {card?.about?.whatsappButton?.isEnabled && (
              <a
                href={`https://wa.me/${card.about.whatsappButton.whatsappNumber}?text=${encodeURIComponent(
                  card.about.whatsappButton.message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-md shadow transition"
                style={{ backgroundColor: "green" }}
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" color="white" />
              </a>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex justify-start gap-4 border-b border-gray-300">
            {["home", "about", "certificate"].filter((tab) => {
              if (tab === "home") {
                return card?.contentAbout?.isEnabled || card?.certification?.isEnabled;
              }
              if (tab === "about") {
                return card?.contentAbout?.isEnabled;
              }
              if (tab === "certificate") {
                return card?.certification?.isEnabled;
              }
              return false;
            }).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm sm:text-base font-medium ${activeTab === tab ? "border-b-2 border-gray-900" : "hover:text-gray-800"
                  }`}
                style={{
                  color: activeTab === tab
                    ? textColor
                    : textColor?.replace(/ff$/i, "99"),
                  fontFamily: font,
                }}
              >
                {/* {tab === "home"
                  ? "Home"
                  : "Certificate"} */}
                {tab === "home"
                  ? "Home"
                  : tab === "about"
                    ? "About"
                    : "Certificate"}
              </button>
            ))}
            {(card?.contentAbout?.isEnabled || card?.certification?.isEnabled) && (
              <button
                onClick={() => setDrawerOpen(true)}
                className="ml-auto pb-2 text-sm sm:text-base font-medium"
                style={{ color: textColor, fontFamily: font }}
              >
                ☰
              </button>
            )}

          </div>

          {/* Drawer */}
          {drawerOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black/60"
                onClick={() => setDrawerOpen(false)}
              ></div>
              <div className="relative bg-white w-64 max-w-full h-full shadow-lg transform transition-transform duration-300">
                {/* Header */}
                <div className="p-4 border-b border-gray-300 flex items-center gap-3">
                  <img
                    src={
                      card?.style?.profileSection?.profileImgUrl
                        ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                        : "/assets/images/allCard/profile.png"
                    }
                    alt={card?.about?.basicdetails?.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <h3 className="font-semibold" style={{ color: textColor, fontFamily: font }}>
                    {card?.about?.basicdetails?.name}
                  </h3>
                </div>

                {/* Tabs */}
                <div className="p-4 flex flex-col gap-3">
                  {/* {["home", "certificate"].map((tab) => ( */}
                  {["home", "about", "certificate"].filter((tab) => {
                    if (tab === "home") {
                      return card?.contentAbout?.isEnabled || card?.certification?.isEnabled;
                    }
                    if (tab === "about") {
                      return card?.contentAbout?.isEnabled;
                    }
                    if (tab === "certificate") {
                      return card?.certification?.isEnabled;
                    }
                    return false;
                  }).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setDrawerOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg ${activeTab === tab ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                        }`}
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {/* {tab === "home" ? "Home" : "Certificate"} */}
                      {tab === "home" ? "Home" : tab === "about" ? "About" : "Certificate"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {/*       
          {activeTab === "home" && (
            <>
  
              {card?.content?.textSection?.isEnabled && (
                <div className="mt-6 text-left space-y-2">
                  {card.content.textSection.heading && (
                    <h3
                      className="text-lg sm:text-xl font-semibold"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.heading}
                    </h3>
                  )}
                  {card.content.textSection.title && (
                    <h4
                      className="text-sm sm:text-md font-medium mt-1"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.title}
                    </h4>
                  )}
                  {card.content.textSection.content && (
                    <p
                      className="mt-2 text-sm sm:text-base"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.content}
                    </p>
                  )}
                </div>
              )}

              {card?.content?.linksSection?.isEnabled && (
                <div className="mt-6 space-y-2 text-left">
                  <a
                    href={card.content.linksSection.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base hover:underline"
                    style={{ color: textColor, fontFamily: font }}
                  >
                    {card.content.linksSection.title}
                  </a>
                </div>
              )}


              {card?.content?.youtubeSections?.link && (
                <div className="mt-6 w-full h-48 sm:h-64">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={card.content.youtubeSections.link}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </>
          )} */}

          {activeTab === "home" && (
            <> {/* ✅ Links Section */}
              {card?.content?.textSection?.isEnabled && (
                <div className="mt-6 text-left space-y-2">
                  {card?.content?.linksSection?.isEnabled && (
                    <div className="mt-6 space-y-2 text-left">
                      <a
                        href={card.content.linksSection.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm sm:text-base hover:underline"
                        style={{ color: textColor, fontFamily: font }}
                      >
                        {card.content.linksSection.title}
                      </a>
                    </div>
                  )}
                  {card.content.textSection.heading && (
                    <h3
                      className="text-lg sm:text-xl font-semibold"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.heading}
                    </h3>
                  )}
                  {card.content.textSection.title && (
                    <h4
                      className="text-sm sm:text-md font-medium mt-1"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.title}
                    </h4>
                  )}
                  {card.content.textSection.content && (
                    <p
                      className="mt-2 text-sm sm:text-base"
                      style={{ color: textColor, fontFamily: font }}
                    >
                      {card.content.textSection.content}
                    </p>
                  )}
                </div>
              )}





              {card?.content?.youtubeSections?.link && (
                <div className="mt-6 w-full h-48 sm:h-64">
                  <h4
                    className="font-semibold text-lg text-left"
                    style={{ color: textColor, fontFamily: font }}
                  >
                    {card.content.youtubeSections.title}
                  </h4>

                  <iframe
                    className="w-full h-full rounded-lg"
                    src={card.content.youtubeSections.link}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}



              {/* ✅ Gallery Section */}
              {card?.content?.gallerySections?.isEnabled && (
                <div className="mt-10 text-left space-y-2">
                  <h4
                    className="font-semibold text-lg"
                    style={{ color: textColor, fontFamily: font }}
                  >
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
                    alt="Gallery"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}



              {card?.content?.photoSections?.isEnabled && (
                <div className="mt-6 text-left space-y-2">
                  <h4
                    className="font-semibold text-lg sm:text-xl"
                    style={{ color: textColor, fontFamily: font }}
                  >
                    {card.content.photoSections.title || "Photos"}
                  </h4>
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
          )}


          {/* About Tab */}
          {activeTab === "about" && (
            <>
              {card?.contentAbout?.isEnabled ? (
                <>
                  {card?.contentAbout?.aboutMeSection?.isEnabled && (
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <h2 className="text-xl font-bold" style={{ color: textColor, fontFamily: font }}>
                        {card?.contentAbout?.aboutMeSection?.heading || ""}
                      </h2>
                      <h3 className="text-lg font-medium opacity-90">
                        {card?.contentAbout?.aboutMeSection?.title || ""}
                      </h3>
                      <p className="text-sm opacity-80 break-words">
                        {card?.contentAbout?.aboutMeSection?.content || ""}
                      </p>
                    </div>
                  )}

                  {card?.contentAbout?.experienceSection?.isEnabled && (
                    <div className="flex flex-col space-y-4 text-left">
                      <h2
                        className="text-xl font-bold mb-6"
                        style={{ color: textColor, fontFamily: font }}
                      >
                        {card?.contentAbout?.experienceSection?.experienceTitle || "Experience"}
                      </h2>

                      <div className="space-y-3">
                        {[...card?.contentAbout?.experienceSection?.experienceData]
                          .sort((a, b) => {
                            const monthOrder = {
                              January: 1, February: 2, March: 3, April: 4,
                              May: 5, June: 6, July: 7, August: 8,
                              September: 9, October: 10, November: 11, December: 12,
                            };
                            const aYear = parseInt(a.startDate?.year) || 0;
                            const bYear = parseInt(b.startDate?.year) || 0;
                            const aMonth = monthOrder[a.startDate?.month] || 0;
                            const bMonth = monthOrder[b.startDate?.month] || 0;
                            if (bYear !== aYear) return bYear - aYear;
                            return bMonth - aMonth;
                          })
                          .map((exp) => (
                            <div
                              key={exp._id}
                              className="relative border-l-4 pl-3 pb-2"
                              style={{ borderColor: card?.style.themesSection?.territoryColor }}
                            >
                              <span
                                className="absolute -left-[8px] -top-3 h-3 w-3 rounded-full"
                                style={{ backgroundColor: card?.style.themesSection?.primaryColor }}
                              />
                              <div>
                                <h3 className="text-lg font-semibold">{exp.title}</h3>
                                <p className="text-sm opacity-80">{exp.company}</p>
                                <p className="text-sm opacity-70">
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
                      <div className="flex flex-col space-y-4 text-left mt-5">
                        <h2
                          className="text-xl font-bold mb-6"
                          style={{ color: textColor }}
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
                                className="relative border-l-4 pl-3 pb-2"
                                style={{ borderColor: card?.style.themesSection?.territoryColor }}
                              >
                                {/* Timeline Dot */}
                                <span
                                  className="absolute -left-[8px] -top-3 h-3 w-3 rounded-full"
                                  style={{ backgroundColor: card?.style.themesSection?.primaryColor }}
                                />

                                {/* Education Info */}
                                <div className="">
                                  <h3 className="text-lg font-semibold">{exp.organization}</h3>
                                  <p className="text-sm opacity-80">{exp.degree}</p>
                                  <p className="text-sm opacity-70">
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
              ) : null}
            </>
          )}

          {/* Certificate Tab */}
          {activeTab === "certificate" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {card?.certification?.coursecertificates?.map((cert, idx) => (
                <div key={idx} className="relative w-full">
                  {/* Certificate Image Full Width */}
                  <img
                    src={`${API_BASE}${cert}`} // Dynamically prepend API_BASE
                    alt={`Certificate ${idx + 1}`}
                    className="w-full h-60 sm:h-80 object-cover rounded-lg shadow cursor-pointer"
                    onClick={() => setPreviewCert(cert)}
                  />

                  {/* Top-right corner buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">

                    <button
                      onClick={() => openShareModal(`${API_BASE}${cert}`, "certificate")}

                      className="p-2 rounded-full bg-black/70 hover:bg-black transition transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <FiShare2 className="text-white" />
                    </button>
                    {/* <a
            href={`${API_BASE}${cert}`}
            download
            className="p-2 rounded-full bg-black/70 hover:bg-black transition transform hover:scale-110 active:scale-95 cursor-pointer"
           >
            <FiDownload className="text-white" />
          </a> */}

                    <button onClick={() => handleCertificateDownload(cert)}
                      className="p-2 rounded-full bg-black/70 hover:bg-black transition transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <FiDownload className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}



          {/* Certificate Preview Modal */}
          {previewCert && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
              onClick={() => setPreviewCert(null)} // close when clicking outside
            >
              <div
                className="relative max-w-3xl w-full p-4 bg-white rounded-lg"
                onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
              >
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-gray-700 font-bold text-lg"
                  onClick={() => setPreviewCert(null)}
                >
                  ×
                </button>

                {/* Certificate Image */}
                <img
                  src={`${API_BASE}${previewCert}`}
                  alt="Certificate Preview"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}


          {/* ✅ Send & Save Buttons at the bottom */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => openShareModal()}
              className="px-6 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: card?.style.themesSection.secondaryColor, fontFamily: font }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = card?.style.themesSection.territoryColor;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = card?.style.themesSection.secondaryColor;
              }}
            >
              <FiShare2 className="inline mr-2" />
              Share
            </button>
            <button
              className="px-6 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: card?.style.themesSection.secondaryColor, fontFamily: font }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = card?.style.themesSection.territoryColor;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = card?.style.themesSection.secondaryColor;
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {selectedCard && (
        <ShareModal
          card={selectedCard}
          shareInputUrl={shareInputUrl}
          setShareInputUrl={setShareInputUrl}
          activeShareTab={activeShareTab}
          setActiveShareTab={setActiveShareTab}
          whatsappNumber={whatsappNumber}
          setWhatsappNumber={setWhatsappNumber}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          copied={copied}
          setCopied={setCopied}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}

export { SingleCardView };