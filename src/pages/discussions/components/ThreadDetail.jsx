// // src/pages/Discussion/components/ThreadDetail.jsx
// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   ThumbsUp,
//   MessageSquare,
//   Award,
//   Calendar,
//   Users,
// } from "lucide-react";
// import UserRole from "./UserRole";
// import ReplyForm from "./ReplyForm";
// import GradingPanel from "./GradingPanel";
// import LikeButton from "./LikeButton";

// const ThreadDetail = ({
//   thread,
//   replies,
//   currentUser,
//   onBack,
//   onLike,
//   onReplyLike,
//   onReply,
//   onGrade,
// }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyingTo, setReplyingTo] = useState(null);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const isAvailable = () => {
//     const now = new Date();
//     const availableFrom = thread.availableFrom
//       ? new Date(thread.availableFrom)
//       : null;
//     const availableTo = thread.availableTo ? new Date(thread.availableTo) : null;

//     if (availableFrom && now < availableFrom) return false;
//     if (availableTo && now > availableTo) return false;
//     return true;
//   };

//   const handleReply = (content) => {
//     onReply(content, replyingTo || undefined);
//     setShowReplyForm(false);
//     setReplyingTo(null);
//   };

//   const available = isAvailable();

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={onBack}
//           className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5" />
//         </button>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{thread.title}</h1>
//           <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//             <div className="flex items-center space-x-2">
//               <img
//                 src={thread.author.avatar}
//                 alt={thread.author.name}
//                 className="h-6 w-6 rounded-full object-cover"
//               />
//               <span>{thread.author.name}</span>
//               <UserRole role={thread.author.role} />
//             </div>
//             <span>•</span>
//             <span>{formatDate(thread.createdAt)}</span>
//           </div>
//         </div>
//       </div>

//       {/* Thread metadata */}
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <div className="flex items-center space-x-4 mb-4">
//           {thread.group && (
//             <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
//               <Users className="h-4 w-4" />
//               <span>{thread.group}</span>
//             </div>
//           )}

//           {!available && (
//             <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
//               <Calendar className="h-4 w-4" />
//               <span>Discussion Closed</span>
//             </div>
//           )}

//           <div className="flex items-center space-x-2">
//             {thread.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         {thread.availableFrom && thread.availableTo && (
//           <div className="text-sm text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
//             <div className="flex items-center space-x-1 mb-1">
//               <Calendar className="h-4 w-4" />
//               <span className="font-medium">Discussion Period</span>
//             </div>
//             <p>
//               Available from {formatDate(thread.availableFrom)} to{" "}
//               {formatDate(thread.availableTo)}
//             </p>
//           </div>
//         )}

//         {/* Thread content */}
//         <div
//           className="prose prose-sm max-w-none mb-6"
//           dangerouslySetInnerHTML={{ __html: thread.content }}
//         />

//         {/* Thread actions */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//           <div className="flex items-center space-x-4">
//             <LikeButton
//               isLiked={thread.isLiked}
//               count={thread.likes}
//               onClick={() => onLike(thread.id)}
//             />

//             <div className="flex items-center space-x-1 text-gray-500">
//               <MessageSquare className="h-4 w-4" />
//               <span>{replies.length} replies</span>
//             </div>

//             {currentUser.role === "instructor" &&
//               thread.grade !== undefined && (
//                 <div className="flex items-center space-x-1 text-green-600">
//                   <Award className="h-4 w-4" />
//                   <span>
//                     Grade: {thread.grade}/{thread.maxGrade}
//                   </span>
//                 </div>
//               )}
//           </div>

//           {available && (
//             <button
//               onClick={() => setShowReplyForm(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Reply
//             </button>
//           )}
//         </div>

//         {/* Instructor grading panel */}
//         {currentUser.role === "instructor" && (
//           <GradingPanel
//             targetId={thread.id}
//             currentGrade={thread.grade}
//             maxGrade={thread.maxGrade || 10}
//             isThread={true}
//             onGrade={onGrade}
//           />
//         )}
//       </div>

//       {/* Replies */}
//       <div className="space-y-4">
//         {replies.map((reply) => (
//           <div
//             key={reply.id}
//             className="bg-white rounded-lg border border-gray-200 p-6"
//           >
//             <div className="flex items-start space-x-4">
//               <img
//                 src={reply.author.avatar}
//                 alt={reply.author.name}
//                 className="h-10 w-10 rounded-full object-cover flex-shrink-0"
//               />

//               <div className="flex-1">
//                 <div className="flex items-center space-x-2 mb-3">
//                   <span className="font-medium text-gray-900">
//                     {reply.author.name}
//                   </span>
//                   <UserRole role={reply.author.role} />
//                   <span className="text-sm text-gray-500">•</span>
//                   <span className="text-sm text-gray-500">
//                     {formatDate(reply.createdAt)}
//                   </span>
//                 </div>

//                 <div
//                   className="prose prose-sm max-w-none mb-4"
//                   dangerouslySetInnerHTML={{ __html: reply.content }}
//                 />

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <LikeButton
//                       isLiked={reply.isLiked}
//                       count={reply.likes}
//                       onClick={() => onReplyLike(reply.id)}
//                       size="sm"
//                     />

//                     {available && (
//                       <button
//                         onClick={() => {
//                           setReplyingTo(reply.id);
//                           setShowReplyForm(true);
//                         }}
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         Reply
//                       </button>
//                     )}

//                     {currentUser.role === "instructor" &&
//                       reply.grade !== undefined && (
//                         <div className="flex items-center space-x-1 text-green-600 text-sm">
//                           <Award className="h-4 w-4" />
//                           <span>
//                             Grade: {reply.grade}/{reply.maxGrade}
//                           </span>
//                         </div>
//                       )}
//                   </div>
//                 </div>

//                 {/* Instructor grading panel for reply */}
//                 {currentUser.role === "instructor" && (
//                   <GradingPanel
//                     targetId={reply.id}
//                     currentGrade={reply.grade}
//                     maxGrade={reply.maxGrade || 10}
//                     isThread={false}
//                     onGrade={onGrade}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Unavailable notice */}
//       {!available && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
//           <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
//           <h3 className="text-lg font-medium text-yellow-800 mb-2">
//             Discussion Unavailable
//           </h3>
//           <p className="text-yellow-700">
//             This discussion is currently outside its available time period. You
//             can view the content but cannot reply.
//           </p>
//           {thread.availableFrom && thread.availableTo && (
//             <p className="text-sm text-yellow-600 mt-2">
//               Available: {formatDate(thread.availableFrom)} -{" "}
//               {formatDate(thread.availableTo)}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Reply form */}
//       {showReplyForm && (
//         <ReplyForm
//           onSubmit={handleReply}
//           onCancel={() => {
//             setShowReplyForm(false);
//             setReplyingTo(null);
//           }}
//           replyingTo={replyingTo}
//         />
//       )}
//     </div>
//   );
// };

// export default ThreadDetail;

// src/pages/Discussion/components/ThreadDetail.jsx
import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Award,
  Calendar,
  Users,
} from "lucide-react";
import UserRole from "./UserRole";
import ReplyForm from "./ReplyForm";
import GradingPanel from "./GradingPanel";
import LikeButton from "./LikeButton";

const ThreadDetail = ({
  thread,
  replies,
  currentUser,
  onBack,
  onLike,
  onReplyLike,
  onReply,
  onGrade,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isAvailable = () => {
    const now = new Date();
    const availableFrom = thread.availableFrom
      ? new Date(thread.availableFrom)
      : null;
    const availableTo = thread.availableTo ? new Date(thread.availableTo) : null;

    if (availableFrom && now < availableFrom) return false;
    if (availableTo && now > availableTo) return false;
    return true;
  };

  const handleReply = (content) => {
    onReply(content, replyingTo || undefined);
    setShowReplyForm(false);
    setReplyingTo(null);
  };

  const available = isAvailable();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-md text-gray-600 hover:text-gray-900 transition font-poppins cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all discussions
      </button>

      {/* Thread Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[var(--color-btn-primary-hover)] transition-colors cursor-pointer font-poppins">{thread.title}</h1>

        {/* Author + Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className=" text-gray-900 font-bold font-poppins">{thread.author.name}</span>
            <UserRole role={thread.author.role} />
          </div>
          <span className="font-poppins">Created on {formatDate(thread.createdAt)}</span>
        </div>

        {/* Tags + Group + Availability */}
        <div className="flex flex-wrap gap-2 mb-6">
          {thread.group && (
            <span className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
              <Users className="h-3 w-3" />
              <span>{thread.group}</span>
            </span>
          )}
          {thread.tags.map((tag) => (
            <span
              key={tag}
              className="bg-activecolor text-primary text-xs px-3 py-1 rounded-full font-poppins"
            >
              #{tag}
            </span>
          ))}
          {/* {thread.availableFrom && thread.availableTo && (
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium font-poppins">
              {new Date(thread.availableFrom).toLocaleDateString()} –{" "}
              {new Date(thread.availableTo).toLocaleDateString()}
            </span>
          )} */}
          {!available && (
            <span className="bg-primary text-border px-3  rounded-full text-xs font-medium flex items-center space-x-1 font-poppins">
              <Calendar className="h-3 w-3" />
              <span>Closed</span>
            </span>
          )}
        </div>

        {/* Thread content */}
        <div
          className="prose prose-sm max-w-none text-gray-800 mb-6 font-poppins"
          dangerouslySetInnerHTML={{ __html: thread.content }}
        />

        {/* Thread footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6 text-gray-600 text-sm">
            <LikeButton
              isLiked={thread.isLiked}
              count={thread.likes}
              onClick={() => onLike(thread.id)}
            />
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{replies.length} replies</span>
            </div>
            {currentUser.role === "instructor" &&
              thread.grade !== undefined && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Award className="h-4 w-4" />
                  <span>
                    Grade: {thread.grade}/{thread.maxGrade}
                  </span>
                </div>
              )}
          </div>
          {available && (
            <button
              onClick={() => setShowReplyForm(true)}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
             text-[var(--color-bgcolor)] rounded-lg 
             hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)]  transition font-poppins  px-4 py-2 cursor-pointer"
            >
              Reply
            </button>
          )}
        </div>

        {/* Grading Panel */}
        {currentUser.role === "instructor" && (
          <GradingPanel
            targetId={thread.id}
            currentGrade={thread.grade}
            maxGrade={thread.maxGrade || 10}
            isThread={true}
            onGrade={onGrade}
          />
        )}
      </div>

      {/* Replies */}
      <div className="space-y-4">
        {replies.map((reply) => (
          <div
            key={reply.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <img
                src={reply.author.avatar}
                alt={reply.author.name}
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                {/* Reply header */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-900 font-bold font-poppins">
                    {reply.author.name}
                  </span>
                  <UserRole role={reply.author.role} />
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500 font-poppins">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>

                {/* Reply content */}
                <div
                  className="prose prose-sm max-w-none text-gray-800 mb-4 font-poppins"
                  dangerouslySetInnerHTML={{ __html: reply.content }}
                />

                {/* Reply actions */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 font-poppins">
                  <LikeButton
                    isLiked={reply.isLiked}
                    count={reply.likes}
                    onClick={() => onReplyLike(reply.id)}
                    size="sm"
                  />
                  {available && (
                    <button
                      onClick={() => {
                        setReplyingTo(reply.id);
                        setShowReplyForm(true);
                      }}
                      className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
                    >
                      Reply
                    </button>
                  )}
                  {currentUser.role === "instructor" &&
                    reply.grade !== undefined && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Award className="h-4 w-4" />
                        <span>
                          Grade: {reply.grade}/{reply.maxGrade}
                        </span>
                      </div>
                    )}
                </div>

                {/* Grading Panel */}
                {currentUser.role === "instructor" && (
                  <GradingPanel
                    targetId={reply.id}
                    currentGrade={reply.grade}
                    maxGrade={reply.maxGrade || 10}
                    isThread={false}
                    onGrade={onGrade}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Unavailable Notice */}
      {!available && (
        <div className="bg-activecolor border border-border rounded-xl p-6 text-center shadow-sm font-outfit">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-primary">
            Discussion Unavailable
          </h3>
          <p className="text-primary mt-1">
            This discussion is outside its available time. You can view the
            content but cannot reply.
          </p>
        </div>
      )}

      {/* Reply form */}
      {showReplyForm && (
        <ReplyForm
          onSubmit={handleReply}
          onCancel={() => {
            setShowReplyForm(false);
            setReplyingTo(null);
          }}
          replyingTo={replyingTo}
        />
      )}
    </div>
  );
};

export default ThreadDetail;

