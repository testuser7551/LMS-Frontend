import React, { useState, useEffect } from "react";
import { Eye, Edit, Share2 } from "lucide-react";
import { ShareModal } from "./components/ShareModal";
import { useNavigate } from "react-router-dom";
import { getCardDesign } from "../../api/card-design";
//import { getAllCardDesign } from "../../api/card-design";
const MyCard = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  // ✅ Utility: Convert YouTube links to embed
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // ✅ Fetch logged-in user's card
  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await getCardDesign();
        console.log("Response",res);
        const data = res;
        if (data) {
          const updatedCard = {
            ...data,
            content: {
              ...data.content,
              youtubeSections: data.content?.youtubeSections
                ? {
                    ...data.content.youtubeSections,
                    link: getYouTubeEmbedUrl(
                      data.content.youtubeSections.link
                    ),
                  }
                : null,
            },
          };
          setCard(data);
        } else {
          setError("No card found for this user");
        }
      } catch (err) {
        console.error("Error fetching card:", err.response || err.message);
        setError("Failed to load card. Please check API & CORS.");
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, []);

  const viewCard = (card) => {
    navigate(`/cardview?id=${card._id}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-4 xl:p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12">
        {/* Header */}
        <div className="border-b mb-5 border-gray-200 flex justify-between items-center p-5">
          <h1 className="text-[30px] font-bold font-outfit text-headcolor">
            My Web Card
          </h1>
        </div>

        {/* Loader / Error */}
        {loading && <p className="text-center py-10">Loading your card...</p>}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}

        {/* User Card */}
        {!loading && !error && card && (
          <div
            key={card._id}
            className="rounded-2xl shadow-[0_2px_35px_rgba(0,0,0,0.25)] overflow-hidden relative max-w-md mx-auto"
            style={{
              backgroundColor:
                card.style?.themesSection?.backgroundColor || "#e1e1e1",
            }}
          >
            {/* Profile */}
            <div className="flex justify-center py-6">
              <img
                src={card.style?.profileSection?.profileImgUr || `/assets/images/sidebar/profile.png`}
                alt={card.name || card.about?.basicdetails?.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-200"
              />
            </div>

            {/* Card Content */}
            <div className="bg-white mt-10 p-6 text-center">
              <h4 className="font-semibold text-lg text-primary font-outfit">
                {card.name || card.about?.basicdetails?.name}
              </h4>
              <p className="text-subtext font-medium font-poppins">
                {card.location || card.about?.basicdetails?.location}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-5">
                <button
                  onClick={() => viewCard(card)}
                  className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
                >
                  <Eye size={16} /> View
                </button>
                <button
                  onClick={() => navigate("/dashboard/editcard")}
                  className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => setSelectedCard(card)}
                  className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
                >
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {selectedCard && (
          <ShareModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MyCard;
