import React, { useState, useEffect } from "react";
import { getCardDesign } from "../../../api/card-design";

const MyCard = ({ onCardIdFetched }) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  // Fetch user's card on component mount
  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await getCardDesign();
        if (res) {
          setCard(res);
          if (onCardIdFetched) {
            onCardIdFetched(res._id);
          }
        } else {
          setError("No card found for this user");
        }
      } catch (err) {
        console.error("Error fetching card:", err);
        setError("Failed to load card.");
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, []);
//   console.log("Fetched Card:", card?._id);
  if (loading) return <p className="text-center py-10">Loading your card...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to Load Card</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-4 xl:p-8">
      <div
        className="rounded-2xl shadow-[0_2px_35px_rgba(0,0,0,0.25)] overflow-hidden relative max-w-md mx-auto"
        style={{
          backgroundColor: card?.style?.themesSection?.backgroundColor || "#b6b6b6ff",
          backgroundImage:
            card?.style?.bannerImgUrl?.trim() !== ""
              ? `url(${card?.style?.bannerImgUrl?.startsWith("/")
                  ? card?.style?.bannerImgUrl
                  : `${API_BASE}${card?.style?.bannerImgUrl}`})`
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Profile Image */}
        <div
          className="flex justify-center py-10"
          style={{
            backgroundColor: card?.style?.themesSection?.territoryColor || "#b6b6b6ff",
          }}
        >
          <img
            src={
              card?.style?.profileSection?.profileImgUrl
                ? `${API_BASE}${card.style.profileSection.profileImgUrl}`
                : "/assets/images/sidebar/profile.png"
            }
            alt={card?.name || card?.about?.basicdetails?.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-200"
          />
        </div>

        {/* Card Content */}
        <div className="bg-white text-center pb-5 pt-5">
          <h4 className="font-semibold text-lg text-primary font-outfit">
            {card?.name || card?.about?.basicdetails?.name}
          </h4>
          {card?.about?.basicdetails?.cardVisibility && (
            <>
              <p className="break-all">
                {card?.about?.basicdetails?.organization || ""}-
                {card?.about?.basicdetails?.jobTitle || ""}
              </p>
              <p className="break-all">{card?.about?.basicdetails?.email || ""}</p>
              <p className="break-all">{card?.about?.basicdetails?.location || ""}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCard;
