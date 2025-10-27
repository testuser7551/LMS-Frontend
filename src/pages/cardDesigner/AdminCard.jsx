import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Edit, Eye, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { ShareModal } from "./components/ShareModal";
import { useNavigate } from "react-router-dom";
import { getAllCardDesign } from "../../api/card-design";

const AdminCard = () => {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [batch, setBatch] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]); // ✅ dynamic cards
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);  // Total number of cards

  const limit = 6;
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

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const res = await getAllCardDesign({ page, limit, searchTerm, batch });
        const fetchedCards = res?.data || [];
        setTotalCount(res?.total || 0);
        const updatedCards = fetchedCards.map((card) => ({
          ...card,
          content: {
            ...card.content,
            youtubeSections: card.content?.youtubeSections
              ? {
                ...card.content.youtubeSections,
                link: getYouTubeEmbedUrl(card.content.youtubeSections.link),
              }
              : null,
          },
        }));
        setCards(updatedCards);
        setError("");
      } catch (err) {
        console.error("❌ Error fetching cards:", err.response || err.message);
        setError("Failed to load cards. Please check API & CORS.");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [page, searchTerm, batch]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleBatchChange = (value) => {
    setBatch(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / limit)) return;
    setPage(newPage);
  };

  const viewCard = (card) => {
    navigate(`/cardview?id=${card._id}`, { state: { card } });
  };
  return (
    <div className="p-4 sm:p-6 lg:p-4 xl:p-8 ">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="border-b mb-5 border-gray-200 flex justify-between items-center p-5">
          <h1 className="text-[30px] font-bold font-outfit text-headcolor">
            Web Cards
          </h1>
          <Header
            searchTerm={searchTerm}
            batch={batch}
            onSearch={handleSearchChange}
            onBatchChange={handleBatchChange}
            onNewCard={() => navigate("/courses/mycard")}
          />
        </div>

        {/* Loader / Error */}
        {loading && <p className="text-center py-10">Loading cards...</p>}
        {error && <p className="text-center py-10 ">No Card Found...</p>}

        {/* Cards */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {cards.map((card) => (
                <div
                  key={card._id}
                  className="rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-500 ease-in-out hover:scale-105"
                  style={{
                    backgroundColor:
                      card.style?.themesSection?.backgroundColor || "#FFFFFF",
                  }}
                >
                  {/* Profile */}
                  <div className="flex justify-center mt-10">
                    <img

                      src={
                        card?.style?.profileSection?.profileImgUrl
                          ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                          : "/assets/images/allCard/profile.png"
                      }
                      alt={card.name || card.about?.basicdetails?.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="bg-white mt-10 p-6 text-center">
                    <h4 className="font-semibold text-lg text-primary font-outfit">
                      {card.name || card.about?.basicdetails?.name}
                    </h4>
                    <p className="text-subtext font-medium font-poppins">
                      {card.location || card.about?.basicdetails?.email}
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
                        onClick={() => navigate("/courses/editcard", { state: { cardId: card._id } })}
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
              ))}

              {/* ✅ Show modal inside the grid */}
              {selectedCard && (
                <ShareModal
                  card={selectedCard}
                  onClose={() => setSelectedCard(null)}
                />
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-end items-center m-4 gap-6 ">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-2 py-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft size={20} className="text-white"/>
              </button>
          
              <span className="text-sm text-secondary">
                Page {page} of {page * limit >= totalCount ? page : Math.ceil(totalCount / limit)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page * limit >= totalCount}
                className="px-2 py-2 bg-black rounded-lg disabled:opacity-50 cursor-pointer "
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export { AdminCard };
