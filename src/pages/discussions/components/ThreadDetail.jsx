// import React, { useState , useEffect} from "react";
// import { ArrowLeft, MessageSquare, Award, Calendar, Users } from "lucide-react";
// import UserRole from "./UserRole";
// import ReplyForm from "./ReplyForm";
// import GradingPanel from "./GradingPanel";
// import LikeButton from "./LikeButton";
// import { fetchReplies } from "../discussionApi";

// const ThreadDetail = ({
//   thread,
//   replies,
//   currentUser,
//   onBack,
//   onLike,
//   onReplyLike,
//   onReply,
//   onReplyAdded,
//   onGrade,
// }) => {
//   console.log("ThreadDetail props:", { thread, replies, currentUser });
  
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyingTo, setReplyingTo] = useState(null);
//   const API_BASE = import.meta.env.VITE_API_BASE;
//   const [replyList, setReplyList] = useState(replies || []);

//   const loadReplies = async () => {
//   try {
//     if (!thread?._id) return;
//     const response = await fetchReplies(thread._id);
//     console.log("Fetched Replies:", response);
//     setReplyList(response.replies || []);
//   } catch (err) {
//     console.error("Error fetching replies:", err);
//   }
// };
// useEffect(() => {
//   loadReplies();
// }, [thread]);



//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const isAvailable = () => {
//     const now = new Date();
//     const availableFrom = thread.availableFrom ? new Date(thread.availableFrom) : null;
//     const availableTo = thread.availableTo ? new Date(thread.availableTo) : null;
//     if (availableFrom && now < availableFrom) return false;
//     if (availableTo && now > availableTo) return false;
//     return true;
//   };

//   const handleReply = (content) => {
//     onReply(content, replyingTo || undefined);
//     console.log("Reply content parent:", content);
//     setShowReplyForm(false);
//     setReplyingTo(null);
//   };

//   const available = isAvailable();

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       {/* Back button */}
//       <button
//         onClick={onBack}
//         className="flex items-center text-md text-gray-600 hover:text-gray-900 transition font-poppins cursor-pointer"
//       >
//         <ArrowLeft className="h-4 w-4 mr-1" />
//         Back to all discussions
//       </button>

//       {/* Thread Card */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
//         {/* Title */}
//         <h1 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[var(--color-btn-primary-hover)] transition-colors cursor-pointer font-poppins">
//           {thread.title}
//         </h1>

//         {/* Author + Date */}
//         <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//           <div className="flex items-center space-x-2">
//             <div className="relative flex items-center gap-2">
//               <img
//                 src={
//                   thread?.user?.avatar
//                     ? `${API_BASE}${thread?.user?.avatar}`
//                     : "/assets/images/sidebar/profile.png"
//                 }
//                 alt={thread?.user?.name || "User Avatar"}
//                 className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//               />
//               <span className="font-bold font-poppins">
//                 {thread?.user?.fname && thread?.user?.lname
//                   ? `${thread.user.fname} ${thread.user.lname}`
//                   : thread?.user?.name || "Anonymous"}
//               </span>
//             </div>
//             <UserRole role={thread?.user?.role} />
//           </div>
//           <span className="font-poppins">Created on {formatDate(thread.createdAt)}</span>
//         </div>

//         {/* Tags + Group + Availability */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {thread.group && (
//             <span className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
//               <Users className="h-3 w-3" />
//               <span>{thread.group}</span>
//             </span>
//           )}
//           {thread.tags.map((tag) => (
//             <span
//               key={tag}
//               className="bg-activecolor text-primary text-xs px-3 py-1 rounded-full font-poppins"
//             >
//               #{tag}
//             </span>
//           ))}
//           {/* {thread.availableFrom && thread.availableTo && (
//             <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium font-poppins">
//               {new Date(thread.availableFrom).toLocaleDateString()} –{" "}
//               {new Date(thread.availableTo).toLocaleDateString()}
//             </span>
//           )} */}
//           {!available && (
//             <span className="bg-primary text-border px-3 rounded-full text-xs font-medium flex items-center space-x-1 font-poppins">
//               <Calendar className="h-3 w-3" />
//               <span>Closed</span>
//             </span>
//           )}
//         </div>

//         {/* Thread content */}
//         <div
//           className="prose prose-sm max-w-none text-gray-800 mb-6 font-poppins"
//           dangerouslySetInnerHTML={{ __html: thread.content }}
//         />

//         {/* Thread footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//           <div className="flex items-center space-x-6 text-gray-600 text-sm">
//             <LikeButton
//               isLiked={thread.isLiked}
//               count={thread.likes}
//               onClick={() => onLike(thread.id)}
//             />
//             <div className="flex items-center space-x-1">
//               <MessageSquare className="h-4 w-4" />
//               <span>{replies.length} replies</span>
//             </div>
//             {currentUser.role === "instructor" && thread.grade !== undefined && (
//               <div className="flex items-center space-x-1 text-green-600">
//                 <Award className="h-4 w-4" />
//                 <span>
//                   Grade: {thread.grade}/{thread.maxGrade}
//                 </span>
//               </div>
//             )}
//           </div>
//           {available && (
//             <button
//               onClick={() => setShowReplyForm(true)}
//               className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-bgcolor)] rounded-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] transition font-poppins px-4 py-2 cursor-pointer"
//             >
//               Reply
//             </button>
//           )}
//         </div>

//         {/* Grading Panel */}
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

//      <div className="space-y-4">
//   {replyList.map((reply) => (
//     <div
//       key={reply._id}
//       className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
//     >
//       <div className="flex items-start space-x-4">
//         {/* User Avatar */}
//         <img
//           src={
//             reply?.user?.avatar
//               ? `${API_BASE}${reply.user.avatar}`
//               : "/assets/images/sidebar/profile.png"
//           }
//           alt={reply?.user?.fname || "User Avatar"}
//           className="h-10 w-10 rounded-full object-cover flex-shrink-0"
//         />

//         <div className="flex-1">
//           {/* Reply header */}
//           <div className="flex items-center space-x-2 mb-2">
//             <span className="text-gray-900 font-bold font-poppins">
//               {reply?.user?.fname && reply?.user?.lname
//                 ? `${reply.user.fname} ${reply.user.lname}`
//                 : reply?.user?.name || "Anonymous"}
//             </span>
//             <UserRole role={reply?.user?.role} />
//             <span className="text-gray-400">•</span>
//             <span className="text-sm text-gray-500 font-poppins">
//               {formatDate(reply.createdAt)}
//             </span>
//           </div>

//           {/* Reply content */}
//           <div
//             className="prose prose-sm max-w-none text-gray-800 mb-4 font-poppins"
//             dangerouslySetInnerHTML={{
//               __html: reply.message || reply.content,
//             }}
//           />

//           {/* Reply actions */}
//           <div className="flex items-center space-x-4 text-sm text-gray-600 font-poppins">
//             <LikeButton
//               isLiked={reply.isLiked}
//               count={reply.likes}
//               onClick={() => onReplyLike(reply._id)}
//               size="sm"
//             />
//             {available && (
//               <button
//                 onClick={() => {
//                   setReplyingTo(reply._id);
//                   setShowReplyForm(true);
//                 }}
//                 className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
//               >
//                 Reply
//               </button>
//             )}

//             {currentUser.role === "instructor" && reply.grade !== undefined && (
//               <div className="flex items-center space-x-1 text-green-600">
//                 <Award className="h-4 w-4" />
//                 <span>
//                   Grade: {reply.grade}/{reply.maxGrade}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Grading Panel */}
//           {currentUser.role === "instructor" && (
//             <GradingPanel
//               targetId={reply._id}
//               currentGrade={reply.grade}
//               maxGrade={reply.maxGrade || 10}
//               isThread={false}
//               onGrade={onGrade}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>


//       {/* Unavailable Notice */}
//       {!available && (
//         <div className="bg-activecolor border border-border rounded-xl p-6 text-center shadow-sm font-outfit">
//           <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-primary">Discussion Unavailable</h3>
//           <p className="text-primary mt-1">
//             This discussion is outside its available time. You can view the content but cannot reply.
//           </p>
//         </div>
//       )}
//       {showReplyForm && (
//   <ReplyForm
//     threadId={thread._id}
//     parentId={replyingTo?._id || null}
//     currentUser={currentUser}
//     onReplyAdded={onReplyAdded}
//     onSubmit={handleReply}
//     onCancel={() => {
//       setShowReplyForm(false);
//       setReplyingTo(null);
//     }}
//     replyingTo={replyingTo}
//   />
// )}

//     </div>
//   );
// };

// export default ThreadDetail;

import React, { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, Award, Calendar, Users } from "lucide-react";
import UserRole from "./UserRole";
import ReplyForm from "./ReplyForm";
import GradingPanel from "./GradingPanel";
import LikeButton from "./LikeButton";
import { fetchReplies, addReply } from "../discussionApi"; // Import addReply

const ThreadDetail = ({
  thread,
  replies,
  currentUser,
  onBack,
  onLike,
  onReplyLike,
  onReply,
  onReplyAdded,
  onGrade,
}) => {
  console.log("ThreadDetail props:", { thread, replies, currentUser });
  
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [replyList, setReplyList] = useState(replies || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReplies = async () => {
    try {
      if (!thread?._id) return;
      const response = await fetchReplies(thread._id);
      console.log("Fetched Replies:", response);
      setReplyList(response.replies || []);
    } catch (err) {
      console.error("Error fetching replies:", err);
    }
  };

  useEffect(() => {
    loadReplies();
  }, [thread]);

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
    const availableFrom = thread.availableFrom ? new Date(thread.availableFrom) : null;
    const availableTo = thread.availableTo ? new Date(thread.availableTo) : null;
    if (availableFrom && now < availableFrom) return false;
    if (availableTo && now > availableTo) return false;
    return true;
  };

  // Updated handleReply function to handle API call
  // const handleReply = async (content) => {
  //   if (!content.trim() || !thread?._id) return;
    
  //   setIsSubmitting(true);
    
  //   try {
  //     const replyData = {
  //       discussionId: thread._id,
  //       parentReplyId: replyingTo || null,
  //       userId: currentUser._id,
  //       message: content,
  //     };

  //     console.log("Submitting reply:", replyData);
  //     const response = await addReply(replyData);
  //     console.log("✅ Reply added:", response);

  //     // Refresh replies list
  //     await loadReplies();
      
  //     // Notify parent component if needed
  //     if (onReplyAdded) onReplyAdded();
      
  //     // Reset form state
  //     setShowReplyForm(false);
  //     setReplyingTo(null);
      
  //   } catch (err) {
  //     console.error("❌ Error adding reply:", err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  // Updated handleReply function
const handleReply = async (content) => {
  if (!content.trim() || !thread?._id) return;
  
  setIsSubmitting(true);
  
  try {
    const replyData = {
      discussionId: thread._id,
      parentReplyId: replyingTo || null, // Use parentReplyId instead of parentId
      userId: currentUser._id,
      message: content,
    };

    console.log("Submitting reply:", replyData);
    const response = await addReply(replyData);
    console.log("✅ Reply added:", response);

    // Refresh replies list
    await loadReplies();
    
    // Notify parent component if needed
    if (onReplyAdded) onReplyAdded();
    
    // Reset form state
    setShowReplyForm(false);
    setReplyingTo(null);
    
  } catch (err) {
    console.error("❌ Error adding reply:", err);
  } finally {
    setIsSubmitting(false);
  }
};

  // Remove the old handleReply function since we're using the new one above
  // const handleReply = (content) => {
  //   onReply(content, replyingTo || undefined);
  //   console.log("Reply content parent:", content);
  //   setShowReplyForm(false);
  //   setReplyingTo(null);
  // };

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
        <h1 className="text-lg font-semibold text-gray-900 mb-3 hover:text-[var(--color-btn-primary-hover)] transition-colors cursor-pointer font-poppins">
          {thread.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center gap-2">
              <img
                src={
                  thread?.user?.avatar
                    ? `${API_BASE}${thread?.user?.avatar}`
                    : "/assets/images/sidebar/profile.png"
                }
                alt={thread?.user?.name || "User Avatar"}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span className="font-bold font-poppins">
                {thread?.user?.fname && thread?.user?.lname
                  ? `${thread.user.fname} ${thread.user.lname}`
                  : thread?.user?.name || "Anonymous"}
              </span>
            </div>
            <UserRole role={thread?.user?.role} />
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
          {!available && (
            <span className="bg-primary text-border px-3 rounded-full text-xs font-medium flex items-center space-x-1 font-poppins">
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
              onClick={() => onLike(thread._id)} 
            />
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{replyList.length} replies</span> {/* Use replyList.length */}
            </div>
            {currentUser.role === "instructor" && thread.grade !== undefined && (
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
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-bgcolor)] rounded-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] transition font-poppins px-4 py-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Reply"}
            </button>
          )}
        </div>

        {/* Grading Panel */}
        {currentUser.role === "instructor" && (
          <GradingPanel
            targetId={thread._id} 
            currentGrade={thread.grade}
            maxGrade={thread.maxGrade || 10}
            isThread={true}
            onGrade={onGrade}
          />
        )}
      </div>

      {/* Replies List */}
      <div className="space-y-4">
        {replyList.map((reply) => (
          <div
            key={reply._id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <img
                src={
                  reply?.user?.avatar
                    ? `${API_BASE}${reply.user.avatar}`
                    : "/assets/images/sidebar/profile.png"
                }
                alt={reply?.user?.fname || "User Avatar"}
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1">
                {/* Reply header */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-900 font-bold font-poppins">
                    {reply?.user?.fname && reply?.user?.lname
                      ? `${reply.user.fname} ${reply.user.lname}`
                      : reply?.user?.name || "Anonymous"}
                  </span>
                  <UserRole role={reply?.user?.role} />
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500 font-poppins">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>

                {/* Reply content */}
                <div
                  className="prose prose-sm max-w-none text-gray-800 mb-4 font-poppins"
                  dangerouslySetInnerHTML={{
                    __html: reply.message || reply.content,
                  }}
                />

                {/* Reply actions */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 font-poppins">
                  <LikeButton
                    isLiked={reply.isLiked}
                    count={reply.likes}
                    onClick={() => onReplyLike(reply._id)}
                    size="sm"
                  />
                  {available && (
                    <button
                      onClick={() => {
                        setReplyingTo(reply._id);
                        setShowReplyForm(true);
                      }}
                      className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
                    >
                      Reply
                    </button>
                  )}

                  {currentUser.role === "instructor" && reply.grade !== undefined && (
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
                    targetId={reply._id}
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
          <h3 className="text-lg font-semibold text-primary">Discussion Unavailable</h3>
          <p className="text-primary mt-1">
            This discussion is outside its available time. You can view the content but cannot reply.
          </p>
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <ReplyForm
          threadId={thread._id}
          parentId={replyingTo} 
          currentUser={currentUser}
          onReplyAdded={onReplyAdded}
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