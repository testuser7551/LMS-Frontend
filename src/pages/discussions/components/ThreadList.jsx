// // src/pages/Discussion/components/ThreadList.jsx
// import React from "react";
// import {
//   MessageSquare,
//   ThumbsUp,
//   Pin,
//   Users,
//   Calendar,
//   Plus,
// } from "lucide-react";
// import UserRole from "./UserRole";

// const ThreadList = ({
//   threads,
//   currentUser,
//   onThreadSelect,
//   onNewThread,
//   onLike,
//   searchQuery,
// }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));

//     if (days === 0) return "Today";
//     if (days === 1) return "Yesterday";
//     if (days < 7) return `${days} days ago`;
//     return date.toLocaleDateString();
//   };

//   const isAvailable = (thread) => {
//     const now = new Date();
//     const availableFrom = thread.availableFrom
//       ? new Date(thread.availableFrom)
//       : null;
//     const availableTo = thread.availableTo
//       ? new Date(thread.availableTo)
//       : null;

//     if (availableFrom && now < availableFrom) return false;
//     if (availableTo && now > availableTo) return false;
//     return true;
//   };

//   const shouldShowThread = (thread) => {
//     if (thread.group && currentUser.group && thread.group !== currentUser.group) {
//       return false;
//     }
//     return true;
//   };

//   const filteredThreads = threads.filter((thread) => {
//     if (!shouldShowThread(thread)) return false;

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return (
//         thread.title.toLowerCase().includes(query) ||
//         thread.content.toLowerCase().includes(query) ||
//         thread.author.name.toLowerCase().includes(query) ||
//         thread.tags.some((tag) => tag.toLowerCase().includes(query))
//       );
//     }

//     return true;
//   });

//   const sortedThreads = [...filteredThreads].sort((a, b) => {
//     if (a.isPinned && !b.isPinned) return -1;
//     if (!a.isPinned && b.isPinned) return 1;
//     return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             {searchQuery
//               ? `Search Results (${sortedThreads.length})`
//               : "Discussions"}
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {searchQuery
//               ? `Showing results for "${searchQuery}"`
//               : "Join the conversation"}
//           </p>
//         </div>
//         <button
//           onClick={onNewThread}
//           className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
//         >
//           <Plus className="h-5 w-5" />
//           <span>New Thread</span>
//         </button>
//       </div>

//       {/* Threads */}
//       <div className="space-y-4">
//         {sortedThreads.length === 0 ? (
//           <div className="text-center py-12">
//             <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchQuery ? "No results found" : "No discussions yet"}
//             </h3>
//             <p className="text-gray-500 mb-4">
//               {searchQuery
//                 ? "Try adjusting your search terms"
//                 : "Be the first to start a conversation"}
//             </p>
//             {!searchQuery && (
//               <button
//                 onClick={onNewThread}
//                 className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Plus className="h-5 w-5" />
//                 <span>Start Discussion</span>
//               </button>
//             )}
//           </div>
//         ) : (
//           sortedThreads.map((thread) => {
//             const available = isAvailable(thread);

//             return (
//               <div
//                 key={thread.id}
//                 className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 ${
//                   !available ? "opacity-60" : "hover:border-gray-300"
//                 }`}
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-2">
//                         {thread.isPinned && (
//                           <Pin className="h-4 w-4 text-blue-600" />
//                         )}
//                         {thread.group && (
//                           <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
//                             <Users className="h-3 w-3" />
//                             <span>{thread.group}</span>
//                           </div>
//                         )}
//                         {!available && (
//                           <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
//                             <Calendar className="h-3 w-3" />
//                             <span>Unavailable</span>
//                           </div>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => onThreadSelect(thread.id)}
//                         className="text-left"
//                       >
//                         <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
//                           {thread.title}
//                         </h3>
//                       </button>

//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
//                         <div className="flex items-center space-x-2">
//                           <img
//                             src={thread.author.avatar}
//                             alt={thread.author.name}
//                             className="h-6 w-6 rounded-full object-cover"
//                           />
//                           <span>{thread.author.name}</span>
//                           <UserRole role={thread.author.role} />
//                         </div>
//                         <span>•</span>
//                         <span>{formatDate(thread.createdAt)}</span>
//                       </div>

//                       <div className="flex items-center space-x-2 mb-4">
//                         {thread.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
//                           >
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>

//                       {thread.availableFrom && thread.availableTo && (
//                         <div className="text-xs text-gray-500 mb-3">
//                           Available:{" "}
//                           {new Date(thread.availableFrom).toLocaleDateString()} -{" "}
//                           {new Date(thread.availableTo).toLocaleDateString()}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                     <div className="flex items-center space-x-6 text-sm text-gray-500">
//                       <div className="flex items-center space-x-1">
//                         <MessageSquare className="h-4 w-4" />
//                         <span>{thread.replyCount} replies</span>
//                       </div>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onLike(thread.id);
//                         }}
//                         className={`flex items-center space-x-1 transition-colors ${
//                           thread.isLiked
//                             ? "text-red-600 hover:text-red-700"
//                             : "hover:text-red-600"
//                         }`}
//                       >
//                         <ThumbsUp
//                           className={`h-4 w-4 ${
//                             thread.isLiked ? "fill-current" : ""
//                           }`}
//                         />
//                         <span>{thread.likes}</span>
//                       </button>

//                       {currentUser.role === "instructor" &&
//                         thread.grade !== undefined && (
//                           <div className="flex items-center space-x-1 text-green-600">
//                             <span>
//                               Grade: {thread.grade}/{thread.maxGrade}
//                             </span>
//                           </div>
//                         )}
//                     </div>

//                     <button
//                       onClick={() => onThreadSelect(thread.id)}
//                       className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
//                     >
//                       View Discussion →
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default ThreadList;

// src/pages/Discussion/components/ThreadList.jsx
import React, { useContext, useState } from "react";
import { MessageSquare, Heart, TriangleAlert, Trash2 } from "lucide-react";
import UserRole from "./UserRole";
import SearchBar from "./SearchBar";
import LikeButton from "./LikeButton";
import { AuthContext } from "../../../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

const ThreadList = ({
  threads,
  currentUser,
  onThreadSelect,
  onNewThread,
  onLike,
  searchQuery,
  onDelete
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const { user } = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);


  const isAvailable = (thread) => {
    const now = new Date();
    const availableFrom = thread.availableFrom
      ? new Date(thread.availableFrom)
      : null;
    const availableTo = thread.availableTo
      ? new Date(thread.availableTo)
      : null;

    if (availableFrom && now < availableFrom) return false;
    if (availableTo && now > availableTo) return false;
    return true;
  };

  const filteredThreads = threads.filter((thread) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        thread.title.toLowerCase().includes(query) ||
        thread.content.toLowerCase().includes(query) ||
        thread.author.name.toLowerCase().includes(query) ||
        thread.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Title + subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-poppins ">
            {searchQuery
              ? `Search Results (${filteredThreads.length})`
              : "Discussions"}
          </h2>
          <p className="text-gray-600 mt-1 font-poppins ">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Join the conversation"}
          </p>
        </div>

        {/* Right: SearchBar + Button (stack on mobile, inline on desktop) */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto md:max-w-2xl">
          <div className="flex-1 md:flex-none">
            <SearchBar />
          </div>
          <button
            onClick={onNewThread}
            className="inline-flex items-center space-x-2 bg-[var(--color-btn-primary)] text-[var(--color-bgcolor)] px-4 py-2 rounded-md hover:bg-[var(--color-btn-primary-hover)] transition-colors cursor-pointer font-poppins "
          >
            <span>New Thread</span>
          </button>
        </div>
      </div>

      {/* Threads */}
      <div className="space-y-4">
        {filteredThreads.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No results found" : "No discussions yet"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Be the first to start a conversation"}
            </p>
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const available = isAvailable(thread);

            return (
              <div
                key={thread._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Unavailable badge */}
                {!available && (
                  <div className="mb-2">
                    <span className="inline-flex items-center text-xs font-medium bg-activecolor text-primary px-2.5 py-1 rounded-full font-poppins">
                      <TriangleAlert className="h-3.5 w-3.5 mr-1 " />{" "}
                      Unavailable
                    </span>
                  </div>
                )}

                {/* Title */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onThreadSelect(thread.id)}
                    className="text-left block"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[var(--color-btn-primary-hover)] transition-colors cursor-pointer font-poppins">
                      {thread.title}
                    </h3>
                  </button>
{/* onDelete(thread._id) */}
                  <button onClick={()=> {setShowConfirm(true); onDelete(thread._id)} } className="p-2 bg-red-400 rounded-full shadow-md hover:bg-red-500 hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <Trash2 className="text-white w-5 h-5" />
                  </button>
                </div>
      {showConfirm && (
        <ConfirmModal
          title="Delete Discussion"
          message="Are you sure you want to delete this discussion? This action cannot be undone."
          // onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

                {/* Author info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 font-poppins">
                  <img
                    src={thread?.user?.avatar || '/assets/images/sidebar/profile.png'}
                    alt={thread?.user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-bold font-poppins">
                    {thread?.user?.name}
                  </span>
                  <UserRole role={thread?.user?.role} />
                  <span className="text-gray-400">•</span>
                  <span>{formatDate(thread.createdAt)}</span>
                </div>

                {/* Tags */}
                {thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {thread.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-activecolor text-primary text-xs px-3 py-1 rounded-full font-poppins"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Availability */}
                {thread.availableFrom && thread.availableTo && (
                  <div className="bg-activecolor border border-border rounded-md p-2 text-xs text-primary mb-4 font-poppins p-4">
                    Available:{" "}
                    {new Date(thread.availableFrom).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      }
                    )}{" "}
                    –{" "}
                    {new Date(thread.availableTo).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <MessageSquare className="h-4 w-4" />
                      <span>{thread.replyCount} replies</span>
                    </div>
                    <LikeButton
                      isLiked={thread?.likes?.length > 0 ? thread?.likes?.includes(user._id) : false}
                      count={thread?.likes?.length || 0}
                      onClick={() => onLike(thread._id)}
                      size="sm"
                    />
                  </div>

                  <button
                    onClick={() => onThreadSelect(thread._id)}
                    className="text-sm font-medium text-gray-800 hover:text-gray-900 transition cursor-pointer"
                  >
                    View Discussion →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ThreadList;
