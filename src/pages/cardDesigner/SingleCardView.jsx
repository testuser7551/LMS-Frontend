
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiDownload, FiCopy, FiFacebook, FiTwitter, FiLinkedin, FiExternalLink, FiShare2 } from "react-icons/fi";
import {getCardDesignWithId} from "../../api/card-design"
//import { ShareModal } from "./ShareModal"; // Import the ShareModal component
import { ShareModal } from "./components/ShareModal";

  
const API_BASE = import.meta.env.VITE_API_BASE;

function SingleCardView() {
  const location = useLocation();
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
    if (!url) return null;
    try {
      const yt = new URL(url);
      if (yt.hostname === "youtu.be") return `https://www.youtube.com/embed/${yt.pathname.slice(1)}`;
      if (yt.searchParams.get("v")) return `https://www.youtube.com/embed/${yt.searchParams.get("v")}`;
      if (yt.pathname.startsWith("/embed/")) return url;
    } catch {
      return null;
    }
    return null;
  };

  useEffect(() => {
    const fetchCard = async () => {
      if (cardId) {
        setLoading(true);
        try {
          const res = await getCardDesignWithId(cardId);
          console.log("getCardDesign",res);
          const fetchedCard = res;
          if (fetchedCard?.content?.youtubeSections?.link) {
            fetchedCard.content.youtubeSections.link = getYouTubeEmbedUrl(
              fetchedCard.content.youtubeSections.link
            );
          }
          setCard(fetchedCard);
        } catch (err) {
          console.error("❌ Error fetching card:", err.response || err.message);
          setError("Failed to load card. Please check API & CORS.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCard();
  }, [cardId]);

  // Function to open share modal
  const openShareModal = (link) => {
    const finalLink = link
      ? `${window.location.origin}${link}`
      : `${window.location.origin}/cardview?id=${cardId}`;
    setShareInputUrl(finalLink);
    setActiveShareTab("whatsapp");
    setWhatsappNumber("");
    setEmailAddress("");
    setCopied(false);
    setSelectedCard(card);
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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: card?.style.themesSection.backgroundColor || "#1f2937" }}
    >
      <div
        className="my-6 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-3xl rounded-2xl shadow-lg overflow-hidden text-center relative"
        style={{ background: card?.style.themesSection.primaryColor }}
      >
        {/* Banner + Profile */}
        <div className="relative">
          <img
            src={`${API_BASE}${card?.style?.bannerImgUrl}`}
            alt="Banner"
            className="w-full h-32 sm:h-40 md:h-48 object-cover"
          />
          <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2">
            <img
              // src={`${API_BASE}${card?.style?.profileSection?.profileImgUrl}`}
              src={
                card?.style?.profileSection?.profileImgUrl
                  ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                  : "/assets/images/allCard/profile.png"
              }
              
              alt={card?.about?.basicdetails?.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md bg-gray-200"
            />
          </div>
        </div>

        {/* Name, Job, Location */}
        <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
            {card?.about?.basicdetails?.name}
          </h2>
          <p className="mt-1 text-sm sm:text-base" style={{ color: textColor }}>
            {card?.about?.basicdetails?.jobTitle} - {card?.about?.basicdetails?.organization}
          </p>
          <p className="text-xs sm:text-sm" style={{ color: textColor }}>
            {card?.about?.basicdetails?.location}
          </p>

          {/* Contact Buttons */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {card?.about?.mainButton?.isEnabled !== false && (
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
            )}
            {card?.about?.whatsappButton?.isEnabled && (
              <a
                href={`https://wa.me/${card.about.whatsappButton.whatsappNumber}?text=${encodeURIComponent(
                  card.about.whatsappButton.message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow transition"
                style={{ backgroundColor: "green" }}
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" color="white" />
              </a>
            )}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex justify-start gap-4 border-b border-gray-300">
            {["home", "bio", "certificate", "new"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm sm:text-base font-medium ${
                  activeTab === tab ? "border-b-2 border-gray-900" : "hover:text-gray-800"
                }`}
                style={{
                  color: activeTab === tab ? textColor : textColor.replace(/ff$/i, "99"),
                }}
              >
                {tab === "home"
                  ? "Home"
                  // : 
                  // tab === "bio"
                  // ? "Bio"
                  : tab === "certificate"
                  ? "Certificate"
                  : ""}
              </button>
            ))}

            <button
              onClick={() => setDrawerOpen(true)}
              className="ml-auto pb-2 text-sm sm:text-base font-medium"
              style={{ color: textColor }}
            >
              ☰
            </button>
          </div>

          {/* Drawer */}
          {/* {drawerOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black/60"
                onClick={() => setDrawerOpen(false)}
              ></div>
              <div className="relative bg-white w-64 max-w-full h-full shadow-lg transform transition-transform duration-300">
                <div className="p-4 border-b border-gray-300 flex items-center gap-3">
                  <img
                    // src={card?.style?.profileSection?.profileImgUrl}
                    src={
                      card?.style?.profileSection?.profileImgUrl
                        ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                        : "/assets/images/allCard/profile.png"
                    }
                    
                    alt={card?.about?.basicdetails?.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <h3 className="font-semibold" style={{ color: textColor }}>
                    {card?.about?.basicdetails?.name}
                  </h3>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {["home", "bio", "certificate", "new"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setDrawerOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg ${
                        activeTab === tab ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                      }`}
                      style={{ color: textColor }}
                    >
                      {tab === "home"
                        ? "Home"
                        :
                         tab === "bio"
                        ? "My Bio"
                        : tab === "certificate"
                        ? "Certificate"
                        : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )} */}

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
        <h3 className="font-semibold" style={{ color: textColor }}>
          {card?.about?.basicdetails?.name}
        </h3>
      </div>

      {/* Tabs */}
      <div className="p-4 flex flex-col gap-3">
        {["home", "certificate"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setDrawerOpen(false);
            }}
            className={`text-left px-3 py-2 rounded-lg ${
              activeTab === tab ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`}
            style={{ color: textColor }}
          >
            {tab === "home"
              ? "Home"
              : tab === "bio"
              ? "Bio"
              : "Certificate"}
          </button>
        ))}
      </div>
    </div>
  </div>
)}


          {/* Tab Content */}
          {/* Home Tab */}
          {activeTab === "home" && (
            <>
              {/* ✅ Text Section */}
              {card?.content?.textSection?.isEnabled && (
                <div className="mt-6 text-left space-y-2">
                  {card.content.textSection.heading && (
                    <h3
                      className="text-lg sm:text-xl font-semibold"
                      style={{ color: textColor }}
                    >
                      {card.content.textSection.heading}
                    </h3>
                  )}
                  {card.content.textSection.title && (
                    <h4
                      className="text-sm sm:text-md font-medium mt-1"
                      style={{ color: textColor }}
                    >
                      {card.content.textSection.title}
                    </h4>
                  )}
                  {card.content.textSection.content && (
                    <p
                      className="mt-2 text-sm sm:text-base"
                      style={{ color: textColor }}
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
                    style={{ color: textColor }}
                  >
                    {card.content.linksSection.title}
                  </a>
                </div>
              )}

              {/* ✅ YouTube Section */}
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
          )}

          {/* Bio Tab */}
          {/* {activeTab === "bio" && (
            <div className="mt-6 text-left space-y-4">
            
              {card?.content?.textSection?.isEnabled && (
                <div>
                  {card.content.textSection.heading && (
                    <h3
                      className="text-lg sm:text-xl font-semibold"
                      style={{ color: textColor }}
                    >
                      {card.content.textSection.heading}
                    </h3>
                  )}
                  {card.content.textSection.title && (
                    <h4
                      className="text-sm sm:text-md font-medium mt-1"
                      style={{ color: textColor }}
                    >
                      {card.content.textSection.title}
                    </h4>
                  )}
                  {card.content.textSection.content && (
                    <p
                      className="mt-2 text-sm sm:text-base"
                      style={{ color: textColor }}
                    >
                      {card.content.textSection.content}
                    </p>
                  )}
                </div>
              )}

              
              {card?.content?.linksSection?.isEnabled && card.content.linksSection.link && (
                <div className="mt-4">
                  <a
                    href={card.content.linksSection.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base hover:underline block"
                    style={{ color: textColor }}
                  >
                    {card.content.linksSection.title || card.content.linksSection.link}
                  </a>
                </div>
              )}
            </div>
          )} */}

          {/* Certificate Tab */}
{/* Certificate Tab (Static Images Full Width with Buttons Below) */}
{activeTab === "certificate" && (
  <div className="mt-6 space-y-8">
    {[
      "/assets/images/certificates/aron.jpg",
      "/assets/images/certificates/1.png",
      "/assets/images/certificates/3.jpg",
      "/assets/images/certificates/4.jpg",
    ].map((cert, idx) => (
      <div key={idx} className="w-full">
        {/* Certificate Image Full Width */}
        <img
          src={cert}
          alt={`Certificate ${idx + 1}`}
          className="w-full h-60 sm:h-80 object-cover rounded-lg shadow cursor-pointer"
          onClick={() => setPreviewCert(cert)}
        />

        {/* Buttons Below */}
        <div className="mt-4 flex justify-center gap-4">
       
          <button
            onClick={() => openShareModal(cert)}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: card?.style.themesSection.primaryColor }}
          >
            <FiShare2 /> Send
          </button>

          <a
            href={cert}
            download
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: card?.style.themesSection.primaryColor }}
          >
            <FiDownload /> Download
          </a>
        </div>
      </div>
    ))}
  </div>
)}


          {/* Certificate Preview Modal */}
          {previewCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="relative max-w-3xl w-full p-4 bg-white rounded-lg">
                <button
                  className="absolute top-2 right-2 text-gray-700 font-bold text-lg"
                  onClick={() => setPreviewCert(null)}
                >
                  ×
                </button>
                <img src={previewCert} alt="Certificate Preview" className="w-full h-auto rounded-lg" />
                {/* <div className="mt-4 flex gap-3 justify-center">
                  <a
                    href={previewCert}
                    download
                    className="px-4 py-2 rounded-lg text-white flex items-center"
                    style={{ backgroundColor: card?.style.themesSection.secondaryColor }}
                  >
                    <FiDownload className="inline mr-2" />
                    Download
                  </a>
                  <button
                    onClick={() => openShareModal(previewCert)}
                    className="px-4 py-2 rounded-lg text-white flex items-center"
                    style={{ backgroundColor: card?.style.themesSection.secondaryColor }}
                  >
                    <FiShare2 className="inline mr-2" />
                    Share
                  </button>
                </div> */}
              </div>
            </div>
          )}

          {/* ✅ Send & Save Buttons at the bottom */}
          <div className="mt-8 flex justify-center gap-4">
     
             <button
              onClick={() => openShareModal()}
              className="px-6 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: card?.style.themesSection.secondaryColor }}
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
              style={{ backgroundColor: card?.style.themesSection.secondaryColor }}
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