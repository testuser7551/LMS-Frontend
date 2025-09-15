// // src/pages/Discussion/components/Sidebar.jsx
// import React from "react";
// import {
//   MessageSquare,
//   BookOpen,
//   HelpCircle,
//   FolderOpen,
//   Plus,
// } from "lucide-react";
// import { forums } from "../data/mockData";

// const iconMap = {
//   MessageSquare,
//   BookOpen,
//   HelpCircle,
//   FolderOpen,
// };

// const Sidebar = ({ selectedForum, onForumSelect, isOpen, onClose }) => {
//   const handleForumSelect = (forumId) => {
//     onForumSelect(forumId);
//     // Close mobile menu after selection
//     if (window.innerWidth < 768) {
//       onClose();
//     }
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//         fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//       `}
//       >
//         <div className="flex flex-col h-screen">
//           {/* Sidebar header */}
//           <div className="p-4 border-b border-gray-200">
//             <button
//               onClick={() => handleForumSelect(null)}
//               className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
//                 selectedForum === null
//                   ? "bg-blue-100 text-blue-700 border border-blue-200"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <MessageSquare className="h-5 w-5" />
//               <span className="font-medium">All Discussions</span>
//             </button>
//           </div>

//           {/* Forums list */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-sm font-semibold text-gray-900">Forums</h2>
//                 <button className="p-1 rounded hover:bg-gray-100 transition-colors">
//                   <Plus className="h-4 w-4 text-gray-600" />
//                 </button>
//               </div>

//               {forums.map((forum) => {
//                 const IconComponent = iconMap[forum.icon];
//                 return (
//                   <button
//                     key={forum.id}
//                     onClick={() => handleForumSelect(forum.id)}
//                     className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
//                       selectedForum === forum.id
//                         ? "bg-blue-100 text-blue-700 border border-blue-200"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <div className={`p-2 rounded-lg ${forum.color}`}>
//                       <IconComponent className="h-4 w-4 text-white" />
//                     </div>
//                     <div className="flex-1 text-left">
//                       <div className="font-medium">{forum.name}</div>
//                       <div className="text-sm text-gray-500">
//                         {forum.threadCount} threads
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Sidebar footer */}
//           <div className="p-4 border-t border-gray-200">
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
//               <h3 className="text-sm font-semibold text-gray-900 mb-2">
//                 Need Help?
//               </h3>
//               <p className="text-xs text-gray-600 mb-3">
//                 Check out our FAQ section or contact support.
//               </p>
//               <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
//                 View FAQ →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// src/pages/Discussion/components/Sidebar.jsx
import React from "react";
import { forums } from "../data/mockData";

const Sidebar = ({ selectedForum, onForumSelect, isOpen, onClose }) => {
  const handleForumSelect = (forumId) => {
    onForumSelect(forumId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          fixed md:static inset-y-0 right-0 z-30 w-64 bg-white border-l border-gray-200 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Forums header */}
          <h2 className="text-sm font-semibold text-gray-900 mb-4 font-poppins">FORUMS</h2>

          {/* Forums list */}
          <div className="space-y-2">
            {/* All Discussions */}
            <button
              onClick={() => handleForumSelect(null)}
              className={`w-full flex items-center justify-between px-3 py-2 font-poppins rounded-lg text-sm font-medium transition-colors ${
                selectedForum === null
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>All Discussions</span>
              <span className="text-xs font-semibold bg-gray-800 text-white rounded-full px-2 py-0.5">
                {forums.reduce((acc, f) => acc + f.threadCount, 0)}
              </span>
            </button>

            {/* Individual forums */}
            {forums.map((forum) => (
              <button
                key={forum.id}
                onClick={() => handleForumSelect(forum.id)}
                className={`w-full flex items-center justify-between px-3 py-2 font-poppins  rounded-lg text-sm transition-colors ${
                  selectedForum === forum.id
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{forum.name}</span>
                <span className="text-xs text-gray-500 font-medium">
                  {forum.threadCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

