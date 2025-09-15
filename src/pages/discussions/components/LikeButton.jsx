// src/pages/Discussion/components/LikeButton.jsx
import React from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ isLiked, count, onClick, size = "md" }) => {
  const sizeClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const textSizeClasses = size === "sm" ? "text-sm" : "text-base";

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 transition-all duration-200 hover:scale-105 ${
        isLiked
          ? "text-primary hover:text-primary"
                          : "hover:text-gray-900 text-gray-600"
      }`}
    >
      <Heart
        className={`${sizeClasses} transition-all duration-200 ${
          isLiked ? "fill-current scale-110" : ""
        }`}
      />
      <span className={`font-medium ${textSizeClasses}`}>{count}</span>
    </button>
  );
};

export default LikeButton;
