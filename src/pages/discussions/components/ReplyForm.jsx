// // src/pages/Discussion/components/ReplyForm.jsx
// import React, { useState } from "react";
// import { X } from "lucide-react";
// import RichTextEditor from "./RichTextEditor";
// import { addReply } from "../discussionApi";

// const ReplyForm = ({ threadId, parentId, currentUser, onReplyAdded, onSubmit, onCancel, replyingTo }) => {
//   const [content, setContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!content.trim()) return;
//   //   console.log("Reply content:", content);
//   //   setIsSubmitting(true);
//   //   await onSubmit(content);
//   //   setContent("");
//   //   setIsSubmitting(false);
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const replyData = {
//       discussionId: threadId,           // from props
//       parentId: parentId || null,  // null if main reply
//       userId: currentUser._id,     // current logged-in user
//       message: content,            // your reply content
//     };

//     const response = await addReply(replyData);
//     console.log("✅ Reply added:", response);

//     // Clear input
//     setContent("");

//     // Notify parent to refresh replies
//     if (onReplyAdded) onReplyAdded();

//   } catch (err) {
//     console.error("❌ Error adding reply:", err);
//   }
// };


//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-medium text-gray-900">
//           {replyingTo ? "Reply to Comment" : "Add Your Reply"}
//         </h3>
//         <button
//           onClick={onCancel}
//           className="p-1 hover:bg-gray-100 rounded transition-colors"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <RichTextEditor
//             value={content}
//             onChange={setContent}
//             placeholder="Write your reply..."
//             height="200px"
//           />
//         </div>

//         <div className="flex items-center justify-end space-x-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-poppins cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!content.trim() || isSubmitting}
//             className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-bgcolor)] rounded-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] transition font-poppins px-4 py-2 cursor-pointer"
//           >
//             {isSubmitting ? "Posting..." : "Post Reply"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReplyForm;



// src/pages/Discussion/components/ReplyForm.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { addReply } from "../discussionApi";

const ReplyForm = ({ threadId, parentId, currentUser, onReplyAdded, onSubmit, onCancel, replyingTo }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!content.trim()) return;
  
  setIsSubmitting(true);
  
  try {
    // If onSubmit prop is provided, use it (parent handles the logic)
    if (onSubmit) {
      await onSubmit(content);
    } else {
      // Fallback: handle API call directly in component
      const replyData = {
        discussionId: threadId,
        parentReplyId: parentId || null, // Use parentReplyId instead of parentId
        userId: currentUser._id,
        message: content,
      };

      const response = await addReply(replyData);
      console.log("✅ Reply added:", response);

      // Notify parent to refresh replies
      if (onReplyAdded) onReplyAdded();
    }
    
    // Clear input after successful submission
    setContent("");
    
  } catch (err) {
    console.error("❌ Error adding reply:", err);
  } finally {
    setIsSubmitting(false);
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!content.trim()) return;
    
  //   setIsSubmitting(true);
    
  //   try {
  //     // If onSubmit prop is provided, use it (parent handles the logic)
  //     if (onSubmit) {
  //       await onSubmit(content);
  //     } else {
  //       // Fallback: handle API call directly in component
  //       const replyData = {
  //         discussionId: threadId,
  //         parentReplyId: parentId || null,
  //         userId: currentUser._id,
  //         message: content,
  //       };

  //       const response = await addReply(replyData);
  //       console.log("✅ Reply added:", response);

  //       // Notify parent to refresh replies
  //       if (onReplyAdded) onReplyAdded();
  //     }
      
  //     // Clear input after successful submission
  //     setContent("");
      
  //   } catch (err) {
  //     console.error("❌ Error adding reply:", err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {replyingTo ? "Reply to Comment" : "Add Your Reply"}
        </h3>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write your reply..."
            height="200px"
          />
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-poppins cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-bgcolor)] rounded-lg hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] transition font-poppins px-4 py-2 cursor-pointer"
          >
            {isSubmitting ? "Posting..." : "Post Reply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;