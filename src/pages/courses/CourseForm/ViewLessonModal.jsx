// import React, { useState } from "react";
// import {
//   Play,
//   Eye,
//   Download,
//   HelpCircle,
//   BookOpen,
//   Video,
//   Music,
//   File,
//   FileText,
//   Clock,
// } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_BASE;

// const lectureIcons = {
//   Video: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
//   Audio: <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
//   PDF: <File className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
//   Text: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
//   Quiz: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
// };

// const ViewLessonModal = ({ open, onClose, lesson, chapterTitle }) => {
//   const [showAudioPlayer, setShowAudioPlayer] = useState(false);
//   const [activeTabs, setActiveTabs] = useState(() => {
//     const tabs = {};
//     lesson?.sections?.forEach((sec) => {
//       if (sec.type === "Tab" && sec.contents.length > 0) {
//         tabs[sec._id] = 0; // default first tab
//       }
//     });
//     return tabs;
//   });

//   if (!open || !lesson) return null;

//   const handleTabClick = (secId, index) => {
//     setActiveTabs((prev) => ({ ...prev, [secId]: index }));
//   };

//   const handleDownload = async (file) => {
//     if (!file) return;
//     const confirmDownload = window.confirm(
//       "Do you want to download this lesson?"
//     );
//     if (!confirmDownload) return;
//     try {
//       const response = await fetch(`${API_BASE}/uploads/courses/${file}`);
//       if (!response.ok) throw new Error("Failed to fetch file");
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = file;
//       link.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert("Failed to download the file.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Lesson Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 font-bold text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Lesson Basic Info */}
//         <div className="mb-4">
//           <p className="text-xl mb-2">
//             <strong>Title:</strong> {lesson.lessonName}
//           </p>
//           <p className="text-xl mb-2">
//             <strong>Description:</strong> {lesson.lessonDescription}
//           </p>
//           <p>
//             <strong>Lecture Type:</strong> {lesson.lectureType}
//           </p>
//           <p>
//             <strong>Duration:</strong> {lesson.duration?.value}{" "}
//             {lesson.duration?.unit}
//           </p>
//           <p>
//             <strong>Status:</strong> {lesson.published ? "Published" : "Draft"}
//           </p>
//         </div>

//         {/* Lecture Type Sections */}
//         {/* Video */}
//         {lesson.lectureType === "Video" && lesson.file && (
//           <video
//             controls
//             className="w-full aspect-video rounded-lg shadow-md mb-4"
//           >
//             <source
//               src={`${API_BASE}/uploads/courses/${lesson.file}`}
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         )}

//         {/* Audio */}
//         {lesson.lectureType === "Audio" && (
//           <div className="mb-4">
//             <button
//               onClick={() => setShowAudioPlayer((prev) => !prev)}
//               className="flex items-center gap-2 mb-2 text-secondary hover:opacity-80 transition"
//             >
//               <Play className="w-5 h-5 sm:w-6 sm:h-6" />
//               {showAudioPlayer ? "Hide Player" : "Play Audio"}
//             </button>
//             {showAudioPlayer && lesson.file && (
//               <audio
//                 controls
//                 autoPlay
//                 className="w-full mt-2 rounded-lg shadow-md"
//                 src={`${API_BASE}/uploads/courses/${lesson.file}`}
//               />
//             )}
//           </div>
//         )}

//         {/* PDF */}
//         {lesson.lectureType === "PDF" && lesson.file && (
//           <div className="mb-4 flex gap-2">
//             <button
//               onClick={() => handleDownload(lesson.file)}
//               className="flex items-center gap-2 text-secondary hover:opacity-80 transition"
//             >
//               <Download className="w-5 h-5 sm:w-6 sm:h-6" /> Download PDF
//             </button>
//             <button
//               onClick={() =>
//                 window.open(`${API_BASE}/uploads/courses/${lesson.file}`, "_blank")
//               }
//               className="flex items-center gap-2 text-secondary hover:opacity-80 transition"
//             >
//               <Eye className="w-5 h-5 sm:w-6 sm:h-6" /> Preview PDF
//             </button>
//           </div>
//         )}

//         {/* Resource / URL */}
//         {lesson.resourceURL && (
//           <div className="mb-4">
//             <strong>Resource URL:</strong>
//             <p className="text-blue-600 break-words">{lesson.resourceURL}</p>
//           </div>
//         )}

//         {/* Quiz */}
//         {lesson.lectureType === "Quiz" && lesson.quiz?.length > 0 && (
//           <div className="mb-4">
//             <h3 className="font-semibold mb-2">Quiz Questions:</h3>
//             {lesson.quiz.map((q, i) => (
//               <div key={i} className="border p-3 rounded mb-2 bg-gray-50">
//                 <p>
//                   <strong>Q{i + 1}:</strong> {q.question}
//                 </p>
//                 <p>
//                   <strong>Type:</strong> {q.type}
//                 </p>
//                 {q.type === "Fill in the Blanks" && (
//                   <p>
//                     <strong>Answer:</strong> {q.answer}
//                   </p>
//                 )}
//                 {q.type === "Multiple Choice" && (
//                   <ul className="list-disc ml-5">
//                     {q.options.map((opt, oi) => (
//                       <li
//                         key={oi}
//                         className={
//                           q.correctAnswer === opt
//                             ? "text-green-600 font-semibold"
//                             : ""
//                         }
//                       >
//                         {opt}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {q.type === "True/False" && (
//                   <p>
//                     <strong>Correct Answer:</strong> {q.correctAnswer}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Text Sections */}
//         {lesson.sections?.length > 0 && (
//           <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-100">
//             {lesson.sections.map((sec) => (
//               <div
//                 key={sec._id}
//                 className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4"
//               >
//                 {sec.type === "Normal" ? (
//                   <div className="p-3 sm:p-4 rounded-lg bg-white shadow-lg hover:shadow-md transition-shadow mb-2">
//                     <h3 className="font-semibold mb-2 text-primary text-base sm:text-lg md:text-xl">
//                       {sec.title}
//                     </h3>
//                     <p className="text-xs sm:text-sm md:text-base text-gray-600">
//                       {sec.description}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="border border-gray-500 bg-white shadow-sm hover:shadow-md transition-shadow mb-2">
//                     {/* Tabs */}
//                     <div className="flex flex-wrap border-b border-gray-200 bg-gray-100">
//                       {sec.contents.map((tab, i) => (
//                         <button
//                           key={tab._id}
//                           onClick={() => handleTabClick(sec._id, i)}
//                           className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer ${
//                             activeTabs[sec._id] === i
//                               ? "bg-secondary text-white border-b-2 border-primary"
//                               : "bg-gray-100 text-gray-500 hover:text-primary"
//                           }`}
//                         >
//                           {i + 1}. {tab.contentTitle}
//                         </button>
//                       ))}
//                     </div>
//                     {/* Tab Content */}
//                     <div className="p-2 sm:p-4 text-xs sm:text-sm md:text-base text-gray-700">
//                       {sec.contents.map(
//                         (tab, i) =>
//                           activeTabs[sec._id] === i && (
//                             <p key={tab._id}>{tab.contentDescription}</p>
//                           )
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewLessonModal;



import React, { useState, useEffect } from "react";
import {
  Play,
  Eye,
  Download,
  HelpCircle,
  BookOpen,
  Video,
  Music,
  File,
  FileText,
  Clock,
  FileAudio,
} from "lucide-react";
import { CheckCircle2, FileWarning } from "lucide-react";
import { X, Edit, Trash2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const lectureIcons = {
  Video: <Video className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Audio: <Music className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  PDF: <File className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Text: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
  Quiz: <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />,
};

const ViewLessonModal = ({ open, onClose, lesson, chapterTitle }) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [activeTabs, setActiveTabs] = useState(() => {
    const tabs = {};
    lesson?.sections?.forEach((sec) => {
      if (sec.type === "Tab" && sec.contents.length > 0) {
        tabs[sec._id] = 0; // default first tab
      }
    });
    return tabs;
  });

  useEffect(() => {
    if (lesson && lesson.sections?.length > 0) {
      const initialTabs = {};
      lesson.sections.forEach((sec) => {
        if (sec.type !== "Normal" && sec.contents?.length > 0) {
          initialTabs[sec._id] = 0; // first tab active
        }
      });
      setActiveTabs(initialTabs);
    }
  }, [lesson]);

  if (!open || !lesson) return null;

  const handleTabClick = (secId, index) => {
    setActiveTabs((prev) => ({ ...prev, [secId]: index }));
  };

  const handleDownload = async (file) => {
    if (!file) return;
    const confirmDownload = window.confirm(
      "Do you want to download this lesson?"
    );
    if (!confirmDownload) return;
    try {
      const response = await fetch(`${API_BASE}/uploads/courses/${file}`);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download the file.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full sm:w-[90%] md:w-[75%] max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 sm:px-6 md:px-10 py-5 font-outfit font-bold bg-white ">
          <p className="text-lg sm:text-xl md:text-2xl truncate pr-4">
            {lesson.lessonName}
          </p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 md:px-10">
          {/* Lesson Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm md:text-base mb-5 font-poppins">
            <div
              className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-md"
              style={{ backgroundColor: "#E5E7EB" }}
            >
              <BookOpen className="w-4 h-4 text-gray-700" />
              <span className="font-medium text-gray-800">
                {lesson.lectureType}
              </span>
            </div>
            <div className="flex items-center gap-2 font-poppins">
              <Clock className="w-4 h-4 text-gray-600" />
              <span>
                {lesson.duration?.value} {lesson.duration?.unit}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 px-2 sm:px-3 py-1 font-poppins rounded-md ${
                lesson.published === "Published"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              {lesson.published === "Published" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 font-medium">Published</span>
                </>
              ) : (
                <>
                  <FileWarning className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-700 font-medium">Draft</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-base sm:text-lg md:text-xl mb-2 font-outfit font-bold">
              <strong>Lesson Description:</strong>
            </p>
            <p className="text-sm sm:text-base md:text-lg font-poppins">
              {lesson.lessonDescription}
            </p>
          </div>

          {/* Lecture Content Preview */}
          <p className="text-base sm:text-lg md:text-xl mb-2 font-outfit font-bold">
            <strong>Content Preview</strong>
          </p>

          {/* Video */}
          {lesson.lectureType === "Video" && lesson.file && (
            <video
              controls
              className="w-full aspect-video rounded-lg shadow-md mb-4"
            >
              <source
                src={`${API_BASE}/uploads/courses/${lesson.file}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Audio */}
          {lesson.lectureType === "Audio" && lesson.file && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                    <FileAudio className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg font-poppins font-medium text-gray-900 break-all">
                      {lesson.file}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base font-poppins text-gray-500">
                      {lesson.lectureType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAudioPlayer((prev) => !prev)}
                    className="p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    <Play className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDownload(lesson.file)}
                    className="p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
              {showAudioPlayer && (
                <audio
                  controls
                  autoPlay
                  className="w-full mt-4 rounded-lg shadow-md"
                  src={`${API_BASE}/uploads/courses/${lesson.file}`}
                />
              )}
            </div>
          )}

          {/* PDF */}
          {lesson.lectureType === "PDF" && lesson.file && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 rounded-lg mb-4 p-3 gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base md:text-lg font-poppins font-medium text-gray-900 truncate">
                    {lesson.file}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base font-poppins text-gray-500">
                    {lesson.lectureType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `${API_BASE}/uploads/courses/${lesson.file}`,
                      "_blank"
                    )
                  }
                  className="p-2 rounded-md hover:bg-gray-200 transition"
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => handleDownload(lesson.file)}
                  className="p-2 rounded-md hover:bg-gray-200 transition"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz */}
          {lesson.lectureType === "Quiz" && lesson.quiz?.length > 0 && (
            <div className="mb-4">
              {lesson.quiz.map((q, i) => (
                <div key={i} className="mb-4">
                  <p className="font-medium text-gray-800 mb-2 text-sm sm:text-base md:text-lg">
                    Q{i + 1}: {q.question}
                  </p>

                  {/* Multiple Choice */}
                  {q.type === "Multiple Choice" && (
                    <div className="flex flex-col gap-2">
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          className={`text-left px-3 py-2 rounded-md border text-xs sm:text-sm md:text-base ${
                            q.correctAnswer === opt
                              ? "bg-green-100 border-green-400"
                              : "bg-white border-gray-300"
                          } hover:bg-gray-100 transition`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* True/False */}
                  {q.type === "True/False" && (
                    <div className="flex flex-col gap-2">
                      {["True", "False"].map((opt) => (
                        <button
                          key={opt}
                          className={`text-left px-3 py-2 rounded-md border text-xs sm:text-sm md:text-base ${
                            q.correctAnswer === opt
                              ? "bg-green-100 border-green-400"
                              : "bg-white border-gray-300"
                          } hover:bg-gray-100 transition`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fill in the blanks */}
                  {q.type === "Fill in the Blanks" && (
                    <input
                      type="text"
                      value={`Answer: ${q.answer}`}
                      readOnly
                      className="w-full mt-2 px-3 py-2 rounded-md bg-white text-green-700 text-xs sm:text-sm md:text-base"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Text Sections */}
          {lesson.sections?.length > 0 && (
            <div className="mt-4 border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-gray-100">
              {lesson.sections.map((sec) => (
                <div
                  key={sec._id}
                  className="px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4"
                >
                  {sec.type === "Normal" ? (
                    <div className="p-3 sm:p-4 rounded-lg bg-white shadow-lg hover:shadow-md transition-shadow mb-2">
                      <h3 className="font-semibold mb-2 text-primary text-sm sm:text-lg md:text-xl">
                        {sec.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        {sec.description}
                      </p>
                    </div>
                  ) : (
                    <div className="border border-gray-500 bg-white shadow-sm hover:shadow-md transition-shadow mb-2">
                      {/* Tabs */}
                      <div className="flex flex-wrap border-gray-200 bg-gray-100">
                        {sec.contents.map((tab, i) => (
                          <button
                            key={tab._id}
                            onClick={() => handleTabClick(sec._id, i)}
                            className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer ${
                              activeTabs[sec._id] === i
                                ? "bg-secondary text-white border-primary"
                                : "bg-gray-100 text-gray-500 hover:text-primary"
                            }`}
                          >
                            {i + 1}. {tab.contentTitle}
                          </button>
                        ))}
                      </div>
                      {/* Tab Content */}
                      <div className="p-2 sm:p-4 text-xs sm:text-sm md:text-base text-gray-700">
                        {sec.contents.map(
                          (tab, i) =>
                            activeTabs[sec._id] === i && (
                              <p key={tab._id}>{tab.contentDescription}</p>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Close Button */}
          <div className="flex items-center justify-end w-full p-3 rounded-md">
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1 rounded-md cursor-pointer"
            >
              <span className="text-gray-700 text-sm sm:text-base font-poppins font-normal">
                Close
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLessonModal;
