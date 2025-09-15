// // // import React from "react";
// // // import { useLocation } from "react-router-dom";

// // // function SingleCardView() {
// // //   const savedCards = [
// // //     {
// // //         id: "i9h9ma",
// // //         name: "Michael Johnson",
// // //         profileImg: "/assets/images/allCard/profile.png",
// // //         backgroundColor: "#000000",
// // //         textColor: "#FFFFFF",
// // //         isPublic: true,
// // //         createdAt: new Date("2025-04-08"),
// // //         batch: "Student",
// // //     },
// // //     {
// // //         id: "2",
// // //         name: "Emily Davis",
// // //         profileImg: "/assets/images/allCard/profile1.png",
// // //         backgroundColor: "#0f6c7d",
// // //         textColor: "#FFFFFF",
// // //         isPublic: true,
// // //         createdAt: new Date("2025-04-08"),
// // //         batch: "Mentor",
// // //     },
// // //     {
// // //         id: "3",
// // //         name: "Christopher Miller",
// // //         profileImg: "/assets/images/allCard/profile2.png",
// // //         backgroundColor: "#2563EB",
// // //         textColor: "#FFFFFF",
// // //         isPublic: false,
// // //         createdAt: new Date("2025-03-20"),
// // //         batch: "Instructor",
// // //     },
// // //     {
// // //         id: "4",
// // //         name: "Zyla",
// // //         profileImg: "/assets/images/allCard/profile5.jpeg",
// // //         backgroundColor: "#f8716cff",
// // //         textColor: "#FFFFFF",
// // //         isPublic: false,
// // //         createdAt: new Date("2025-03-20"),
// // //         batch: "Instructor",
// // //     },
// // //     {
// // //         id: "5",
// // //         name: "Morris",
// // //         profileImg: "/assets/images/allCard/profile5.jpeg",
// // //         backgroundColor: "#ec01cdff",
// // //         textColor: "#FFFFFF",
// // //         isPublic: false,
// // //         createdAt: new Date("2025-04-20"),
// // //         batch: "Student",
// // //     },
// // //     {
// // //         id: "6",
// // //         name: "Sophia Lee",
// // //         profileImg: "/assets/images/allCard/profile6.png",
// // //         backgroundColor: "#22c55e",
// // //         textColor: "#FFFFFF",
// // //         isPublic: true,
// // //         createdAt: new Date("2025-05-01"),
// // //         batch: "Mentor",
// // //     },
// // //     {
// // //         id: "7",
// // //         name: "David Brown",
// // //         profileImg: "/assets/images/allCard/profile7.png",
// // //         backgroundColor: "#9333ea",
// // //         textColor: "#FFFFFF",
// // //         isPublic: true,
// // //         createdAt: new Date("2025-05-10"),
// // //         batch: "Instructor",
// // //     },
// // //     {
// // //         id: "8",
// // //         name: "Olivia Wilson",
// // //         profileImg: "/assets/images/allCard/profile8.png",
// // //         backgroundColor: "#f59e0b",
// // //         textColor: "#000000",
// // //         isPublic: false,
// // //         createdAt: new Date("2025-04-28"),
// // //         batch: "Student",
// // //     },
// // // ];
// // //   // Get query param
// // //   const location = useLocation();
// // //   const query = new URLSearchParams(location.search);
// // //   const cardId = query.get("id");

// // //   // Find card by ID
// // //   const card = savedCards.find((c) => c.id === cardId);

// // //   if (!card) {
// // //     return (
// // //       <div className="h-screen flex items-center justify-center text-gray-600 text-xl">
// // //         Card not found
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div
// // //       className="h-screen flex items-center justify-center"
// // //       style={{ backgroundColor: card.backgroundColor }}
// // //     >
// // //       <div className="w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden text-center p-6">
// // //         <div className="flex justify-center">
// // //           <img
// // //             src={card.profileImg}
// // //             alt={card.name}
// // //             className="w-28 h-28 rounded-full border-4 border-white shadow-md bg-gray-200"
// // //           />
// // //         </div>
// // //         <h2 className="mt-6 text-2xl font-bold text-gray-900">{card.name}</h2>
// // //         <p className="text-gray-500">{card.batch}</p>
        

// // //         <div className="mt-6">
// // //           <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
// // //             Contact
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export { SingleCardView };


// // import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { FaWhatsapp } from "react-icons/fa";

// // function SingleCardView() {
// //   // ✅ Get query + state
// //   const location = useLocation();
// //   const query = new URLSearchParams(location.search);
// //   const cardId = query.get("id");
// //   const card = location.state?.card;

// //   // ✅ YouTube embed converter
// //   const getYouTubeEmbedUrl = (url) => {
// //     if (!url) return null;
// //     try {
// //       const yt = new URL(url);
// //       if (yt.hostname === "youtu.be") {
// //         return `https://www.youtube.com/embed/${yt.pathname.slice(1)}`;
// //       }
// //       if (yt.searchParams.get("v")) {
// //         return `https://www.youtube.com/embed/${yt.searchParams.get("v")}`;
// //       }
// //       if (yt.pathname.startsWith("/embed/")) {
// //         return url;
// //       }
// //     } catch {
// //       return null;
// //     }
// //     return null;
// //   };

// //   // ✅ Tabs + Drawer state
// //   const [activeTab, setActiveTab] = useState("home");
// //   const [drawerOpen, setDrawerOpen] = useState(false);

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center px-4"
// //       style={{ backgroundColor: card?.backgroundColor || "#1f2937" }}
// //     >
// //       {/* Responsive container */}
// //       <div className="my-6 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden text-center relative">
// //         {/* Banner */}
// //         <div className="relative">
// //           <img
// //             src={card?.style?.bannerImgSection?.bannerImgUrl}
// //             alt="Banner"
// //             className="w-full h-32 sm:h-40 md:h-48 object-cover"
// //           />
// //           <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2">
// //             <img
// //               src={card?.style?.profileSection?.profileImgUrl}
// //               alt={card?.about?.basicdetails?.name}
// //               className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md bg-gray-200"
// //             />
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
// //           {/* Name + Job + Company */}
// //           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
// //             {card?.about?.basicdetails?.name}
// //           </h2>
// //           <p className="text-gray-600 mt-1 text-sm sm:text-base">
// //             {card?.about?.basicdetails?.jobTitle} -{" "}
// //             {card?.about?.basicdetails?.organization}
// //           </p>
// //           <p className="text-gray-500 text-xs sm:text-sm">
// //             {card?.about?.basicdetails?.location}
// //           </p>

// //           {/* Contact + WhatsApp */}
// //           <div className="mt-6 flex justify-center gap-3 flex-wrap">
// //             {card?.about?.mainButton?.isEnabled !== false && (
// //               <a
// //                 href={card?.about?.mainButton?.buttonInput}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition inline-block text-sm sm:text-base"
// //               >
// //                 {card?.about?.mainButton?.buttonText}
// //               </a>
// //             )}
// //             {card?.about?.whatsappButton?.isEnabled && (
// //               <a
// //                 href={`https://wa.me/${card.about.whatsappButton.whatsappNumber}?text=${encodeURIComponent(
// //                   card.about.whatsappButton.message
// //                 )}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
// //               >
// //                 <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
// //               </a>
// //             )}
// //           </div>

// //           {/* ✅ Tabs */}
// //           <div className="mt-6 flex justify-start gap-4 border-b border-gray-300">
// //             {["home", "bio", "certificate", "new"].map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`pb-2 text-sm sm:text-base font-medium ${
// //                   activeTab === tab
// //                     ? "text-gray-900 border-b-2 border-gray-900"
// //                     : "text-gray-500 hover:text-gray-800"
// //                 }`}
// //               >
// //                 {tab === "home"
// //                   ? "Home"
// //                   : tab === "bio"
// //                   ? "My Bio"
// //                   : tab === "certificate"
// //                   ? "Certificate"
// //                   : "New Tab"}
// //               </button>
// //             ))}

// //             {/* Sidebar Trigger */}
// //             <button
// //               onClick={() => setDrawerOpen(true)}
// //               className="ml-auto pb-2 text-sm sm:text-base font-medium text-gray-500 hover:text-gray-800"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           {/* Drawer */}
// //           {drawerOpen && (
// //             <div className="fixed inset-0 z-50 flex">
// //               <div
// //                 className="fixed inset-0 bg-black/60"
// //                 onClick={() => setDrawerOpen(false)}
// //               ></div>
// //               <div className="relative bg-white w-64 max-w-full h-full shadow-lg transform transition-transform duration-300">
// //                 <div className="p-4 border-b border-gray-300 flex items-center gap-3">
// //                   <img
// //                     src={card?.style?.profileSection?.profileImgUrl}
// //                     alt={card?.about?.basicdetails?.name}
// //                     className="w-12 h-12 rounded-full border"
// //                   />
// //                   <h3 className="font-semibold text-gray-900">
// //                     {card?.about?.basicdetails?.name}
// //                   </h3>
// //                 </div>
// //                 <div className="p-4 flex flex-col gap-3">
// //                   {["home", "bio", "certificate", "new"].map((tab) => (
// //                     <button
// //                       key={tab}
// //                       onClick={() => {
// //                         setActiveTab(tab);
// //                         setDrawerOpen(false);
// //                       }}
// //                       className={`text-left px-3 py-2 rounded-lg ${
// //                         activeTab === tab
// //                           ? "bg-gray-200 text-gray-900 font-medium"
// //                           : "text-gray-600 hover:bg-gray-100"
// //                       }`}
// //                     >
// //                       {tab === "home"
// //                         ? "Home"
// //                         : tab === "bio"
// //                         ? "My Bio"
// //                         : tab === "certificate"
// //                         ? "Certificate"
// //                         : "New Tab"}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* ✅ Tab Contents */}
// //           {activeTab === "home" && (
// //             <>
// //               {/* Links */}
// //               {card?.content?.linksSection?.isEnabled && (
// //                 <div className="mt-6 space-y-2 text-left">
// //                   <a
// //                     href={card.content.linksSection.link}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="block text-blue-600 hover:underline text-sm sm:text-base"
// //                   >
// //                     {card.content.linksSection.title}
// //                   </a>
// //                 </div>
// //               )}

// //               {/* Photo */}
// //               {card?.content?.photoSections?.isEnabled && (
// //                 <div className="mt-6">
// //                   <h3 className="text-gray-900 text-lg font-semibold mb-2 text-left">
// //                     Player
// //                   </h3>
// //                   <div className="flex justify-center bg-black py-4 rounded-lg">
// //                     <img
// //                       src={card.content.photoSections.imgUrls[0]}
// //                       alt="Photo"
// //                       className="w-[80%] sm:w-[60%] md:w-[50%] rounded-lg shadow-md"
// //                     />
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Gallery */}
// //               {card?.content?.gallerySections?.isEnabled && (
// //                 <div className="mt-6">
// //                   <h3 className="text-gray-900 text-lg font-semibold mb-3 text-left">
// //                     Gallery Section
// //                   </h3>
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
// //                     {card.content.photoSections.imgUrls.map((img, idx) => (
// //                       <img
// //                         key={idx}
// //                         src={img}
// //                         alt={`Gallery ${idx}`}
// //                         className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-lg"
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}

// //           {activeTab === "bio" && card?.content?.textSection?.isEnabled && (
// //             <div className="mt-6 text-left">
// //               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
// //                 {card.content.textSection.heading}
// //               </h3>
// //               <h4 className="text-sm sm:text-md font-medium text-gray-700 mt-1">
// //                 {card.content.textSection.title}
// //               </h4>
// //               <p className="mt-2 text-gray-700 text-sm">
// //                 {card.content.textSection.content}
// //               </p>
// //             </div>
// //           )}

// //           {/* ✅ CERTIFICATE TAB (buttons same row, primary color, no border line) */}
// //           {activeTab === "certificate" && (
// //             <div className="mt-6 text-left">
// //               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
// //                 Certificates
// //               </h3>
// //               {card?.certificates?.length > 0 ? (
// //                 <div className="space-y-4">
// //                   {card.certificates.map((cert, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="border rounded-lg overflow-hidden shadow-md"
// //                     >
// //                       <img
// //                         src={cert.imgUrl}
// //                         alt={`Certificate ${idx + 1}`}
// //                         className="w-full h-48 object-cover"
// //                       />
// //                       <div className="flex justify-center gap-3 p-3 bg-white">
// //                         <button className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-primary">
// //                           View
// //                         </button>
// //                         <button className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-primary">
// //                           Send
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <p className="text-gray-600 text-sm">No certificates found.</p>
// //               )}
// //             </div>
// //           )}

// //           {activeTab === "new" && (
// //             <div className="mt-6 text-left">
// //               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
// //                 New Tab Content
// //               </h3>
// //               <p className="mt-2 text-gray-700 text-sm">
// //                 This is placeholder content for the new tab. You can update it
// //                 later as needed.
// //               </p>
// //             </div>
// //           )}

// //           {/* ✅ YouTube */}
// //           {activeTab !== "certificate" &&
// //             card?.content?.youtubeSections?.isEnabled && (
// //               <div className="mt-6 text-left">
// //                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
// //                   {card.content.youtubeSections.title}
// //                 </h3>
// //                 <div className="mt-3">
// //                   <iframe
// //                     className="w-full h-48 sm:h-64 md:h-72 rounded-lg"
// //                     src={getYouTubeEmbedUrl(card.content.youtubeSections.link)}
// //                     title="YouTube video"
// //                     frameBorder="0"
// //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                     allowFullScreen
// //                   ></iframe>
// //                 </div>
// //               </div>
// //             )}

// //           {/* Action buttons (bottom of card) */}
// //           <div className="mt-8 flex justify-center gap-3 flex-wrap">
// //             <button className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition text-sm sm:text-base">
// //               Send
// //             </button>
// //             <button className="px-5 sm:px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition text-sm sm:text-base">
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export { SingleCardView };



// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";
// import { FiDownload, FiCopy, FiFacebook, FiTwitter, FiLinkedin, FiExternalLink } from "react-icons/fi";

// function SingleCardView() {
//   // ✅ Get query + state
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const cardId = query.get("id");

//   // ✅ State for card
//   const [card, setCard] = useState(location.state?.card || null);

//   // ✅ YouTube embed converter
//   const getYouTubeEmbedUrl = (url) => {
//     if (!url) return null;
//     try {
//       const yt = new URL(url);
//       if (yt.hostname === "youtu.be") {
//         return `https://www.youtube.com/embed/${yt.pathname.slice(1)}`;
//       }
//       if (yt.searchParams.get("v")) {
//         return `https://www.youtube.com/embed/${yt.searchParams.get("v")}`;
//       }
//       if (yt.pathname.startsWith("/embed/")) {
//         return url;
//       }
//     } catch {
//       return null;
//     }
//     return null;
//   };


//   const staticData = [
//     {
//       id: "1",
//       about: {
//         basicdetails: {
//           name: "Michael Johnson",
//           email: "michael@example.com",
//           mobilenumber: 11234567890,
//           jobTitle: "Software Engineer",
//           organization: "TechCorp Pvt Ltd",
//           location: "New York, USA",
//           cardVisibility: true,
//         },
//         mainButton: {
//           buttonType: "email",
//           buttonText: "Email Me",
//           buttonInput: "mailto:michael@example.com",
//         },
//         whatsappButton: {
//           whatsappNumber: "11234567890",
//           message: "Hi Michael, I’d like to connect with you.",
//           isEnabled: true,
//         },
//       },
//       content: {
//         textSection: {
//           heading: "About Me",
//           title: "Who I Am",
//           content:
//             "Passionate software engineer with experience in building scalable web applications and working with modern JavaScript frameworks.",
//           isEnabled: true,
//         },
//         linksSection: {
//           title: "My Linkedin Profile",
//           link: "https://linkedin.com/in/michael",
//           isEnabled: true,
//         },
//         gallerySections: {
//           imgUrl: "/assets/images/courses/2.jpg",
//           isEnabled: true,
//         },
//         photoSections: {
//           imgUrls: [
//             "/assets/images/courses/2.jpg",
//             "/assets/images/courses/3.jpg",
//             "/assets/images/courses/4.jpg",
//           ],
//           isEnabled: true,
//         },
//         youtubeSections: {
//           title: "Throw Ball",
//           link: getYouTubeEmbedUrl(
//             "https://youtu.be/6cPiayn8E9c?si=wAIkPT-mtarr9iqq"
//           ),
//           isEnabled: true,
//         },
//       },
//       certificates: [
//         { imgUrl: "/assets/images/certificates/aron.jpg" },
//         { imgUrl: "/assets/images/certificates/1.png" },
//         { imgUrl: "/assets/images/certificates/3.jpg" },
//       ],
//       style: {
//         profileSection: {
//           profileImgUrl: "/assets/images/courses/1.jpg",
//           profileShapes: "circle",
//           profileRingOnPhoto: true,
//           profileVerified: true,
//         },
//         bannerImgSection: {
//           bannerImgUrl: "/assets/images/courses/6.jpg",
//         },
//       },
//       backgroundColor: "#000000",
//       textColor: "#FFFFFF",
//       isPublic: true,
//       createdAt: new Date("2025-04-08"),
//       batch: "Student",
//     },

//     {
//       id: "2",
//       about: {
//         basicdetails: {
//           name: "David Carter",
//           email: "david.carter@sportsclub.com",
//           mobilenumber: 919123456789,
//           jobTitle: "Football Coach",
//           organization: "Global Sports Academy",
//           location: "Manchester, UK",
//           cardVisibility: true,
//         },
//         mainButton: {
//           buttonType: "Phone",
//           buttonText: "Call Me",
//           buttonInput: "9874563210",
//         },
//         whatsappButton: {
//           whatsappNumber: "919123456789",
//           message: "Hi Coach! Loved your training session on football ⚽🔥",
//           isEnabled: true,
//         },
//       },
//       content: {
//         textSection: {
//           heading: "About Me",
//           title: "Sports Enthusiast",
//           content:
//             "I’m passionate about sports like football, volleyball, and throwball. I enjoy coaching, playing, and promoting teamwork both on and off the field.",
//           isEnabled: true,
//         },
//         linksSection: {
//           title: "My Sports Club",
//           link: "https://sportsclub.com",
//           isEnabled: true,
//         },
//         gallerySections: {
//           imgUrl: "/assets/images/courses/8.jpg",
//           isEnabled: true,
//         },
//         photoSections: {
//           imgUrls: [
//             "/assets/images/courses/1.jpg",
//             "/assets/images/courses/9.jpg",
//             "/assets/images/courses/10.jpg",
//           ],
//           isEnabled: true,
//         },
//         youtubeSections: {
//           title: "Top Football Training Drills",
//           link: getYouTubeEmbedUrl("https://youtu.be/LRskVBm_eiw?si=qiStjHrwQDKnYBtu"),
//           isEnabled: true,
//         },
//       },
//       certificates: [
//         { 
//           imgUrl: "/assets/images/certificates/aron.jpg" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/1.png" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/3.jpg" 
//         },
//       ],
//       style: {
//         profileSection: {
//           profileImgUrl: "/assets/images/courses/2.jpg",
//           profileShapes: "circle",
//           profileRingOnPhoto: false,
//           profileVerified: true,
//         },
//         bannerImgSection: {
//           bannerImgUrl: "/assets/images/courses/2.jpg",
//         },
//       },
//       backgroundColor: "#dc2626",
//       textColor: "#FFFFFF",
//       isPublic: true,
//       createdAt: new Date("2025-08-25"),
//       batch: "Student",
//     },

//     {
//       id: "3",
//       about: {
//         basicdetails: {
//           name: "Daniel Smith",
//           email: "daniel@example.com",
//           mobilenumber: 19870001234,
//           jobTitle: "Volleyball Player",
//           organization: "Chicago Spikers",
//           location: "Chicago, USA",
//           cardVisibility: true,
//         },
//         mainButton: {
//           buttonType: "link",
//           buttonText: "Player Profile",
//           buttonInput: "https://sports.example.com/players/daniel-smith",
//         },
//         whatsappButton: {
//           whatsappNumber: "19870001234",
//           message: "Hey Daniel, interested in joining a volleyball match?",
//           isEnabled: true,
//         },
//       },
//       content: {
//         textSection: {
//           heading: "About Me",
//           title: "Volleyball Enthusiast",
//           content:
//             "Competitive volleyball player — spiker, blocker and team player. Available for tournaments and coaching clinics.",
//           isEnabled: true,
//         },
//         linksSection: {
//           title: "Match Stats",
//           link: "https://sports.example.com/stats/daniel-smith-volleyball",
//           isEnabled: true,
//         },
//         gallerySections: {
//           imgUrl: "/assets/images/courses/6.jpg",
//           isEnabled: true,
//         },
//         photoSections: {
//           imgUrls: [
//             "/assets/images/courses/8.jpg",
//             "/assets/images/courses/9.jpg",
//             "/assets/images/courses/10.jpg",
//           ],
//           isEnabled: true,
//         },
//         youtubeSections: {
//           title: "Volleyball Highlights",
//           link: getYouTubeEmbedUrl("https://youtu.be/vjbJ67Ox88w?si=w5Jlw9h1lY-kIheG"),
//           isEnabled: true,
//         },
//       },
//       certificates: [
//         { 
//           imgUrl: "/assets/images/certificates/aron.jpg" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/1.png" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/3.jpg" 
//         },
//       ],
//       style: {
//         profileSection: {
//           profileImgUrl: "/assets/images/courses/3.jpg",
//           profileShapes: "circle",
//           profileRingOnPhoto: true,
//           profileVerified: false,
//         },
//         bannerImgSection: {
//           bannerImgUrl: "/assets/images/courses/7.jpg",
//         },
//       },
//       backgroundColor: "#1e3a8a",
//       textColor: "#FFFFFF",
//       isPublic: true,
//       createdAt: new Date("2025-06-01"),
//       batch: "Student",
//     },
    
//     {
//       id: "4",
//       about: {
//         basicdetails: {
//           name: "Sophia Wilson",
//           email: "sophia@example.com",
//           mobilenumber: 19870004567,
//           jobTitle: "Throwball Player",
//           organization: "Bay Area Throwers",
//           location: "San Francisco, USA",
//           cardVisibility: true,
//         },
//         mainButton: {
//           buttonType: "link",
//           buttonText: "Register",
//           buttonInput: "https://sports.example.com/register/throwball/sophia-wilson",
//         },
//         whatsappButton: {
//           whatsappNumber: "19870004567",
//           message: "Hi Sophia, interested in throwball practice sessions?",
//           isEnabled: true,
//         },
//       },
//       content: {
//         textSection: {
//           heading: "About Me",
//           title: "Throwball Specialist",
//           content: "Passionate throwball player — focused on speed, catching and teamwork.",
//           isEnabled: true,
//         },
//         linksSection: {
//           title: "Match Results",
//           link: "https://sports.example.com/results/sophia-wilson",
//           isEnabled: true,
//         },
//         gallerySections: {
//           imgUrl: "/assets/images/courses/3.jpg",
//           isEnabled: true,
//         },
//         photoSections: {
//           imgUrls: [
//             "/assets/images/courses/4.jpg",
//             "/assets/images/courses/5.jpg",
//             "/assets/images/courses/6.jpg",
//           ],
//           isEnabled: true,
//         },
//         youtubeSections: {
//           title: "Throwball Drills",
//           link: getYouTubeEmbedUrl("https://youtu.be/6cPiayn8E9c?si=uph-WOmY3eKACrKN"),
//           isEnabled: true,
//         },
//       },
//       certificates: [
//         { 
//           imgUrl: "/assets/images/certificates/aron.jpg" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/1.png" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/3.jpg" 
//         },
//       ],
//       style: {
//         profileSection: {
//           profileImgUrl: "/assets/images/courses/4.jpg",
//           profileShapes: "circle",
//           profileRingOnPhoto: true,
//           profileVerified: true,
//         },
//         bannerImgSection: {
//           bannerImgUrl: "/assets/images/courses/8.jpg",
//         },
//       },
//       backgroundColor: "#9d174d",
//       textColor: "#FFFFFF",
//       isPublic: true,
//       createdAt: new Date("2025-07-15"),
//       batch: "Mentor",
//     },
    
//     {
//       id: "6",
//       about: {
//         basicdetails: {
//           name: "Daniel Smith",
//           email: "daniel.smith@sportszone.com",
//           mobilenumber: 19870012345,
//           jobTitle: "Basketball Player",
//           organization: "London Hoops United",
//           location: "London, UK",
//           cardVisibility: true,
//         },
//         mainButton: {
//           buttonType: "link",
//           buttonText: "Match Highlights",
//           buttonInput: "https://sports.example.com/highlights/daniel-smith-basketball",
//         },
//         whatsappButton: {
//           whatsappNumber: "19870012345",
//           message: "Hi Daniel, love your basketball plays — any upcoming games?",
//           isEnabled: true,
//         },
//       },
//       content: {
//         textSection: {
//           heading: "About Me",
//           title: "Basketball Player",
//           content:
//             "Guard/Forward — focused on ball-handling, shooting and fast-break plays. Available for team tryouts and coaching.",
//           isEnabled: true,
//         },
//         linksSection: {
//           title: "Match Highlights",
//           link: "https://sports.example.com/highlights/daniel-smith",
//           isEnabled: true,
//         },
//         gallerySections: {
//           imgUrl: "/assets/images/courses/8.jpg",
//           isEnabled: true,
//         },
//         photoSections: {
//           imgUrls: [
//             "/assets/images/courses/9.jpg",
//             "/assets/images/courses/10.jpg",
//             "/assets/images/courses/1.jpg",
//           ],
//           isEnabled: true,
//         },
//         youtubeSections: {
//           title: "Basketball Drills",
//           link: getYouTubeEmbedUrl("https://youtu.be/mai8kYTxXQQ?si=OZ96mTYAGzrolGLP"),
//           isEnabled: true,
//         },
//       },
//       certificates: [
//         { 
//           imgUrl: "/assets/images/certificates/aron.jpg" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/1.png" 
//         },
//         { 
//           imgUrl: "/assets/images/certificates/3.jpg" 
//         },
//       ],
//       style: {
//         profileSection: {
//           profileImgUrl: "/assets/images/courses/5.jpg",
//           profileShapes: "circle",
//           profileRingOnPhoto: false,
//           profileVerified: true,
//         },
//         bannerImgSection: {
//           bannerImgUrl: "/assets/images/courses/2.jpg",
//         },
//       },
//       backgroundColor: "#2563eb",
//       textColor: "#FFFFFF",
//       isPublic: true,
//       createdAt: new Date("2025-08-18"),
//       batch: "Student",
//     }
    
//   ];
//   // ✅ Fetch data by id if not passed from state
//   useEffect(() => {
//     if (!card && cardId) {
//       const found = staticData.find((c) => c.id === cardId);
//       setCard(found || null);
//     }
//   }, [cardId, card]);

//   // ✅ Tabs + Drawer state
//   const [activeTab, setActiveTab] = useState("home");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // ✅ Certificate preview modal state
//   const [previewCert, setPreviewCert] = useState(null);

//   // ========== SHARE MODAL STATE ==========
//   const [shareModalOpen, setShareModalOpen] = useState(false);
//   const [shareLink, setShareLink] = useState("");
//   const [shareInputUrl, setShareInputUrl] = useState("");
//   const [activeShareTab, setActiveShareTab] = useState("whatsapp");
//   const [whatsappNumber, setWhatsappNumber] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [copied, setCopied] = useState(false);

//   // helper to open share modal with a link
//   // const openShareModal = (link) => {
//   //   const finalLink = link
//   //     ? `${window.location.origin}/certificate?url=${encodeURIComponent(link)}`
//   //     : card?.certificates?.[0]?.imgUrl
//   //     ? `${window.location.origin}/certificate?url=${encodeURIComponent(card.certificates[0].imgUrl)}`
//   //     : "";

//   //   setShareLink(finalLink);
//   //   setShareInputUrl(finalLink);
//   //   setActiveShareTab("whatsapp");
//   //   setWhatsappNumber("");
//   //   setEmailAddress("");
//   //   setCopied(false);
//   //   setShareModalOpen(true);
//   // };

//   const closeShareModal = () => setShareModalOpen(false);


//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(shareInputUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (e) {
//       const el = document.createElement("textarea");
//       el.value = shareInputUrl;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand("copy");
//       document.body.removeChild(el);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   // const handleDownload = () => {
//   //   try {
//   //     const u = new URL(shareInputUrl);
//   //     const certUrl = u.searchParams.get("url") || shareInputUrl;
//   //     const a = document.createElement("a");
//   //     a.href = certUrl;
//   //     const parts = certUrl.split("/");
//   //     const file = parts[parts.length - 1] || "certificate.jpg";
//   //     a.download = file;
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     document.body.removeChild(a);
//   //   } catch {
//   //     console.error("Invalid download URL");
//   //   }
//   // };


//   // helper to open share modal with a link
//   const openShareModal = (link) => {
//     const finalLink = link
//       ? `${window.location.origin}/certificate?url=${encodeURIComponent(link)}`
//       : `${window.location.origin}/certificate?id=${cardId}`;
    
//     setShareLink(finalLink);
//     setShareInputUrl(finalLink);
//     setActiveShareTab("whatsapp");
//     setWhatsappNumber("");
//     setEmailAddress("");
//     setCopied(false);
//     setShareModalOpen(true);
//   };
  
// const handleDownload = () => {
//   const a = document.createElement("a");
//   a.href = shareInputUrl;   // ✅ now directly the certificate image URL
//   try {
//     const parts = new URL(shareInputUrl).pathname.split("/");
//     const file = parts[parts.length - 1] || "certificate.jpg";
//     a.download = file;
//   } catch {
//     a.download = "certificate.jpg";
//   }
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// };

//   const handleSendWhatsapp = () => {
//     const num = whatsappNumber.replace(/[^0-9]/g, "");
//     if (!num) return alert("Please enter a WhatsApp number.");
//     const text = encodeURIComponent(`Here's the certificate: ${shareInputUrl}`);
//     const waUrl = `https://wa.me/${num}?text=${text}`;
//     window.open(waUrl, "_blank");
//     setShareModalOpen(false);
//   };

//   const handleSendEmail = () => {
//     if (!emailAddress) return alert("Please enter an email address.");
//     const subject = encodeURIComponent("Certificate shared with you");
//     const body = encodeURIComponent(`Hi,\n\nPlease find the certificate here: ${shareInputUrl}\n\nBest regards`);
//     const mailto = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
//     window.location.href = mailto;
//     setShareModalOpen(false);
//   };

//   const openSocialShare = (platform) => {
//     const url = encodeURIComponent(shareInputUrl);
//     let shareUrl = "";
//     if (platform === "linkedin") {
//       shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//     } else if (platform === "facebook") {
//       shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//     } else if (platform === "twitter") {
//       shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
//     }
//     if (shareUrl) window.open(shareUrl, "_blank");
//     setShareModalOpen(false);
//   };

//   if (!card) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600">Card not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{ backgroundColor: card?.backgroundColor || "#1f2937" }}
//     >
//       {/* Responsive container */}
//       <div className="my-6 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden text-center relative">
//         {/* Banner */}
//         <div className="relative">
//           <img
//             src={card?.style?.bannerImgSection?.bannerImgUrl}
//             alt="Banner"
//             className="w-full h-32 sm:h-40 md:h-48 object-cover"
//           />
//           <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2">
//             <img
//               src={card?.style?.profileSection?.profileImgUrl}
//               alt={card?.about?.basicdetails?.name}
//               className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md bg-gray-200"
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
//           {/* Name + Job + Company */}
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//             {card?.about?.basicdetails?.name}
//           </h2>
//           <p className="text-gray-600 mt-1 text-sm sm:text-base">
//             {card?.about?.basicdetails?.jobTitle} - {" "}
//             {card?.about?.basicdetails?.organization}
//           </p>
//           <p className="text-gray-500 text-xs sm:text-sm">
//             {card?.about?.basicdetails?.location}
//           </p>

//           {/* Contact + WhatsApp */}
//           <div className="mt-6 flex justify-center gap-3 flex-wrap">
//             {card?.about?.mainButton?.isEnabled !== false && (
//               <a
//                 href={card?.about?.mainButton?.buttonInput}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition inline-block text-sm sm:text-base"
//               >
//                 {card?.about?.mainButton?.buttonText}
//               </a>
//             )}
//             {card?.about?.whatsappButton?.isEnabled && (
//               <a
//                 href={`https://wa.me/${card.about.whatsappButton.whatsappNumber}?text=${encodeURIComponent(
//                   card.about.whatsappButton.message
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
//               >
//                 <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
//               </a>
//             )}
//           </div>

//           {/* ✅ Tabs */}
//           <div className="mt-6 flex justify-start gap-4 border-b border-gray-300">
//             {['home', 'bio', 'certificate', 'new'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-2 text-sm sm:text-base font-medium ${
//                   activeTab === tab
//                     ? 'text-gray-900 border-b-2 border-gray-900'
//                     : 'text-gray-500 hover:text-gray-800'
//                 }`}
//               >
//                 {tab === 'home'
//                   ? 'Home'
//                   : tab === 'bio'
//                   ? 'My Bio'
//                   : tab === 'certificate'
//                   ? 'Certificate'
//                   : 'New Tab'}
//               </button>
//             ))}

//             {/* Sidebar Trigger */}
//             <button
//               onClick={() => setDrawerOpen(true)}
//               className="ml-auto pb-2 text-sm sm:text-base font-medium text-gray-500 hover:text-gray-800"
//             >
//               ☰
//             </button>
//           </div>

//           {/* Drawer */}
//           {drawerOpen && (
//             <div className="fixed inset-0 z-50 flex">
//               <div
//                 className="fixed inset-0 bg-black/60"
//                 onClick={() => setDrawerOpen(false)}
//               ></div>
//               <div className="relative bg-white w-64 max-w-full h-full shadow-lg transform transition-transform duration-300">
//                 <div className="p-4 border-b border-gray-300 flex items-center gap-3">
//                   <img
//                     src={card?.style?.profileSection?.profileImgUrl}
//                     alt={card?.about?.basicdetails?.name}
//                     className="w-12 h-12 rounded-full border"
//                   />
//                   <h3 className="font-semibold text-gray-900">
//                     {card?.about?.basicdetails?.name}
//                   </h3>
//                 </div>
//                 <div className="p-4 flex flex-col gap-3">
//                   {['home', 'bio', 'certificate', 'new'].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => {
//                         setActiveTab(tab);
//                         setDrawerOpen(false);
//                       }}
//                       className={`text-left px-3 py-2 rounded-lg ${
//                         activeTab === tab
//                           ? 'bg-gray-200 text-gray-900 font-medium'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {tab === 'home'
//                         ? 'Home'
//                         : tab === 'bio'
//                         ? 'My Bio'
//                         : tab === 'certificate'
//                         ? 'Certificate'
//                         : 'New Tab'}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ✅ Tab Contents */}
//           {activeTab === 'home' && (
//             <>
//               {/* Links */}
//               {card?.content?.linksSection?.isEnabled && (
//                 <div className="mt-6 space-y-2 text-left">
//                   <a
//                     href={card.content.linksSection.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block text-blue-600 hover:underline text-sm sm:text-base"
//                   >
//                     {card.content.linksSection.title}
//                   </a>
//                 </div>
//               )}

//               {/* Photo */}
//               {card?.content?.photoSections?.isEnabled && (
//                 <div className="mt-6">
//                   <h3 className="text-gray-900 text-lg font-semibold mb-2 text-left">
//                     Player
//                   </h3>
//                   <div className="flex justify-center bg-black py-4 rounded-lg">
//                     <img
//                       src={card.content.photoSections.imgUrls[0]}
//                       alt="Photo"
//                       className="w-[80%] sm:w-[60%] md:w-[50%] rounded-lg shadow-md"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Gallery */}
//               {card?.content?.gallerySections?.isEnabled && (
//                 <div className="mt-6">
//                   <h3 className="text-gray-900 text-lg font-semibold mb-3 text-left">
//                     Gallery Section
//                   </h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                     {card.content.photoSections.imgUrls.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={img}
//                         alt={`Gallery ${idx}`}
//                         className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-lg"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {activeTab === 'bio' && card?.content?.textSection?.isEnabled && (
//             <div className="mt-6 text-left">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {card.content.textSection.heading}
//               </h3>
//               <h4 className="text-sm sm:text-md font-medium text-gray-700 mt-1">
//                 {card.content.textSection.title}
//               </h4>
//               <p className="mt-2 text-gray-700 text-sm">
//                 {card.content.textSection.content}
//               </p>
//             </div>
//           )}

//           {/* ✅ CERTIFICATE TAB (Modal Preview) */}
//           {activeTab === 'certificate' && (
//             <div className="mt-6 text-left">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
//                 Certificates
//               </h3>
//               {card?.certificates?.length > 0 ? (
//                 <div className="space-y-4">
//                   {card.certificates.map((cert, idx) => (
//                     <div
//                       key={idx}
//                       className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
//                     >
//                       <div onClick={() => setPreviewCert(cert.imgUrl)}>
//                         <img
//                           src={cert.imgUrl}
//                           alt={`Certificate ${idx + 1}`}
//                           className="w-full h-48 object-cover"
//                         />
//                       </div>
//                       <div className="flex justify-center gap-3 p-3 bg-white">
//                         <button
//                           className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-primary"
//                           onClick={() => openShareModal(cert.imgUrl)}
//                         >
//                           Send
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-600 text-sm">No certificates found.</p>
//               )}
//             </div>
//           )}

//           {activeTab === 'new' && (
//             <div className="mt-6 text-left">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 New Tab Content
//               </h3>
//               <p className="mt-2 text-gray-700 text-sm">
//                 This is placeholder content for the new tab. You can update it
//                 later as needed.
//               </p>
//             </div>
//           )}

//           {/* ✅ YouTube */}
//           {activeTab !== 'certificate' &&
//             card?.content?.youtubeSections?.isEnabled && (
//               <div className="mt-6 text-left">
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
//                   {card.content.youtubeSections.title}
//                 </h3>
//                 <div className="mt-3">
//                   <iframe
//                     className="w-full h-48 sm:h-64 md:h-72 rounded-lg"
//                     src={getYouTubeEmbedUrl(card.content.youtubeSections.link)}
//                     title="YouTube video"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </div>
//             )}

//           {/* Action buttons (bottom of card) */}
//           <div className="mt-8 flex justify-center gap-3 flex-wrap">
//             <button
//               className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition text-sm sm:text-base"
//               onClick={() => openShareModal(null)}
//             >
//               Send
//             </button>
//             <button className="px-5 sm:px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition text-sm sm:text-base">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Certificate Preview Modal */}
//       {previewCert && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//           <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-[90%] p-4">
//             <button
//               onClick={() => setPreviewCert(null)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
//             >
//               ×
//             </button>
//             <img
//               src={previewCert}
//               alt="Certificate Preview"
//               className="w-full h-auto rounded-lg"
//             />
//           </div>
//         </div>
//       )}
 

//       {/* ========== SHARE MODAL ========== */}
//       {shareModalOpen && (
//         <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
//           <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-fadeIn">
//             <button
//               onClick={closeShareModal}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
//             >
//               ×
//             </button>

//             <h3 className="text-xl font-bold text-gray-900">Share Certificate</h3>
//             <p className="text-sm text-gray-500">Copy or share the generated certificate link</p>

//             {/* Input Row */}
//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 className="flex-1 border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                 value={shareInputUrl}
//                 onChange={(e) => setShareInputUrl(e.target.value)}
//               />
//               <button
//                 onClick={() => window.open(shareInputUrl, "_blank")}
//                 className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-gray-100"
//               >
//                 <FiExternalLink /> Open
//               </button>
//             </div>

//             {/* Copy & Download */}
//             <div className="flex gap-3">
//               <button
//                 onClick={handleCopyLink}
//                 className="flex-1 px-4 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
//               >
//                 <FiCopy /> {copied ? "Copied!" : "Copy"}
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="flex-1 px-4 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
//               >
//                 <FiDownload /> Download
//               </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-4 border-b">
//               {['whatsapp','email','social'].map(tab => (
//                 <button
//                   key={tab}
//                   className={`px-3 py-2 ${activeShareTab === tab ? 'border-b-2 border-primary font-medium text-primary' : 'text-gray-600'}`}
//                   onClick={() => setActiveShareTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* WhatsApp */}
//             {activeShareTab === 'whatsapp' && (
//               <div className="space-y-3">
//                 <label className="text-sm font-medium">Enter WhatsApp number</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     className="flex-1 border rounded px-3 py-2 text-sm"
//                     placeholder="e.g. 919999999999"
//                     value={whatsappNumber}
//                     onChange={(e) => setWhatsappNumber(e.target.value)}
//                   />
//                   <button
//                     onClick={handleSendWhatsapp}
//                     className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Email */}
//             {activeShareTab === 'email' && (
//               <div className="space-y-3">
//                 <label className="text-sm font-medium">Enter email address</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="email"
//                     className="flex-1 border rounded px-3 py-2 text-sm"
//                     placeholder="example@mail.com"
//                     value={emailAddress}
//                     onChange={(e) => setEmailAddress(e.target.value)}
//                   />
//                   <button
//                     onClick={handleSendEmail}
//                     className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Social */}
//             {activeShareTab === 'social' && (
//               <div className="flex items-center gap-4">
//                 <button onClick={() => openSocialShare('linkedin')} className="p-2 border rounded-lg hover:bg-gray-100"><FiLinkedin size={20} /></button>
//                 <button onClick={() => openSocialShare('facebook')} className="p-2 border rounded-lg hover:bg-gray-100"><FiFacebook size={20} /></button>
//                 <button onClick={() => openSocialShare('twitter')} className="p-2 border rounded-lg hover:bg-gray-100"><FiTwitter size={20} /></button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export { SingleCardView };




import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiDownload, FiCopy, FiFacebook, FiTwitter, FiLinkedin, FiExternalLink } from "react-icons/fi";

function SingleCardView() {
  // ✅ Get query + state
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const cardId = query.get("id");

  // ✅ State for card
  const [card, setCard] = useState(location.state?.card || null);

  // ✅ YouTube embed converter
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const yt = new URL(url);
      if (yt.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${yt.pathname.slice(1)}`;
      }
      if (yt.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${yt.searchParams.get("v")}`;
      }
      if (yt.pathname.startsWith("/embed/")) {
        return url;
      }
    } catch {
      return null;
    }
    return null;
  };


  const savedCards = [
    {
      id: "1",
      about: {
        basicdetails: {
          name: "Michael Johnson",
          email: "michael@example.com",
          mobilenumber: 11234567890,
          jobTitle: "Software Engineer",
          organization: "TechCorp Pvt Ltd",
          location: "New York, USA",
          cardVisibility: true,
        },
        mainButton: {
          buttonType: "email",
          buttonText: "Email Me",
          buttonInput: "mailto:michael@example.com",
        },
        whatsappButton: {
          whatsappNumber: "11234567890",
          message: "Hi Michael, I’d like to connect with you.",
          isEnabled: true,
        },
      },
      content: {
        textSection: {
          heading: "About Me",
          title: "Who I Am",
          content:
            "Passionate software engineer with experience in building scalable web applications and working with modern JavaScript frameworks.",
          isEnabled: true,
        },
        linksSection: {
          title: "My Linkedin Profile",
          link: "https://linkedin.com/in/michael",
          isEnabled: true,
        },
        gallerySections: {
          imgUrl: "/assets/images/courses/2.jpg",
          isEnabled: true,
        },
        photoSections: {
          imgUrls: [
            "/assets/images/courses/2.jpg",
            "/assets/images/courses/3.jpg",
            "/assets/images/courses/4.jpg",
          ],
          isEnabled: true,
        },
        youtubeSections: {
          title: "Throw Ball",
          link: getYouTubeEmbedUrl(
            "https://youtu.be/6cPiayn8E9c?si=wAIkPT-mtarr9iqq"
          ),
          isEnabled: true,
        },
      },
      certificates: [
        { imgUrl: "/assets/images/certificates/aron.jpg" },
        { imgUrl: "/assets/images/certificates/1.png" },
        { imgUrl: "/assets/images/certificates/3.jpg" },
      ],
      style: {
        profileSection: {
          profileImgUrl: "/assets/images/courses/1.jpg",
          profileShapes: "circle",
          profileRingOnPhoto: true,
          profileVerified: true,
        },
        bannerImgSection: {
          bannerImgUrl: "/assets/images/courses/6.jpg",
        },
        themesSection: {
          themeName: "Modern",
          themeId: null, // no DB reference for static data
          // primaryColor: "#1E90FF",
          primaryColor: "#FFFFFF",
          secondaryColor: "#FFD700",
          territoryColor: "#FF4500",
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        },
        headerStyleSection: {
          headerStyle: "bold",
        },
        fontStyleSection: {
          font: "Roboto",
        },
      },
    },

    
    {
      id: "2",
      about: {
        basicdetails: {
          name: "David Carter",
          email: "david.carter@sportsclub.com",
          mobilenumber: 919123456789,
          jobTitle: "Football Coach",
          organization: "Global Sports Academy",
          location: "Manchester, UK",
          cardVisibility: true,
        },
        mainButton: {
          buttonType: "phone",
          buttonText: "Call Me",
          buttonInput: "tel:9874563210",
        },
        whatsappButton: {
          whatsappNumber: "919123456789",
          message: "Hi Coach! Loved your training session on football ⚽🔥",
          isEnabled: true,
        },
      },
      content: {
        textSection: {
          heading: "About Me",
          title: "Sports Enthusiast",
          content:
            "I’m passionate about sports like football, volleyball, and throwball. I enjoy coaching, playing, and promoting teamwork both on and off the field.",
          isEnabled: true,
        },
        linksSection: {
          title: "My Sports Club",
          link: "https://sportsclub.com",
          isEnabled: true,
        },
        gallerySections: {
          imgUrl: "/assets/images/courses/8.jpg",
          isEnabled: true,
        },
        photoSections: {
          imgUrls: [
            "/assets/images/courses/1.jpg",
            "/assets/images/courses/9.jpg",
            "/assets/images/courses/10.jpg",
          ],
          isEnabled: true,
        },
        youtubeSections: {
          title: "Top Football Training Drills",
          link: getYouTubeEmbedUrl(
            "https://youtu.be/LRskVBm_eiw?si=qiStjHrwQDKnYBtu"
          ),
          isEnabled: true,
        },
      },
      certificates: [
        { imgUrl: "/assets/images/certificates/aron.jpg" },
        { imgUrl: "/assets/images/certificates/1.png" },
        { imgUrl: "/assets/images/certificates/3.jpg" },
      ],
      style: {
        profileSection: {
          profileImgUrl: "/assets/images/courses/2.jpg",
          profileShapes: "circle",
          profileRingOnPhoto: false,
          profileVerified: true,
        },
        bannerImgSection: {
          bannerImgUrl: "/assets/images/courses/2.jpg",
        },
        themesSection: {
          themeName: "Energetic",
          themeId: null,
          // primaryColor: "#dc2626",
          primaryColor: "#FFFFFF",
          secondaryColor: "#facc15",
          territoryColor: "#22c55e",
          backgroundColor: "#dc2626",
          textColor: "#FFFFFF",
        },
        headerStyleSection: {
          headerStyle: "italic",
        },
        fontStyleSection: {
          font: "Poppins",
        },
      },
      meta: {
        isPublic: true,
        createdAt: new Date("2025-08-25"),
        batch: "Student",
      },
    },
    
    {
      id: "3",
      about: {
        basicdetails: {
          name: "Daniel Smith",
          email: "daniel@example.com",
          mobilenumber: 19870001234,
          jobTitle: "Volleyball Player",
          organization: "Chicago Spikers",
          location: "Chicago, USA",
          cardVisibility: true,
        },
        mainButton: {
          buttonType: "link",
          buttonText: "Player Profile",
          buttonInput: "https://sports.example.com/players/daniel-smith",
        },
        whatsappButton: {
          whatsappNumber: "19870001234",
          message: "Hey Daniel, interested in joining a volleyball match?",
          isEnabled: true,
        },
      },
      content: {
        textSection: {
          heading: "About Me",
          title: "Volleyball Enthusiast",
          content:
            "Competitive volleyball player — spiker, blocker and team player. Available for tournaments and coaching clinics.",
          isEnabled: true,
        },
        linksSection: {
          title: "Match Stats",
          link: "https://sports.example.com/stats/daniel-smith-volleyball",
          isEnabled: true,
        },
        gallerySections: {
          imgUrl: "/assets/images/courses/6.jpg",
          isEnabled: true,
        },
        photoSections: {
          imgUrls: [
            "/assets/images/courses/8.jpg",
            "/assets/images/courses/9.jpg",
            "/assets/images/courses/10.jpg",
          ],
          isEnabled: true,
        },
        youtubeSections: {
          title: "Volleyball Highlights",
          link: getYouTubeEmbedUrl(
            "https://youtu.be/vjbJ67Ox88w?si=w5Jlw9h1lY-kIheG"
          ),
          isEnabled: true,
        },
      },
      certificates: [
        { imgUrl: "/assets/images/certificates/aron.jpg" },
        { imgUrl: "/assets/images/certificates/1.png" },
        { imgUrl: "/assets/images/certificates/3.jpg" },
      ],
      style: {
        profileSection: {
          profileImgUrl: "/assets/images/courses/3.jpg",
          profileShapes: "circle",
          profileRingOnPhoto: true,
          profileVerified: false,
        },
        bannerImgSection: {
          bannerImgUrl: "/assets/images/courses/7.jpg",
        },
        themesSection: {
          themeName: "Sporty Blue",
          themeId: null,
          // primaryColor: "#1e3a8a",
          primaryColor: "#FFFFFF",
          secondaryColor: "#3b82f6",
          territoryColor: "#facc15",
          backgroundColor: "#1e3a8a",
          textColor: "#FFFFFF",
        },
        headerStyleSection: {
          headerStyle: "uppercase",
        },
        fontStyleSection: {
          font: "Montserrat",
        },
      },
      meta: {
        isPublic: true,
        createdAt: new Date("2025-06-01"),
        batch: "Student",
      },
    }
,    
    
{
  id: "4",
  about: {
    basicdetails: {
      name: "Sophia Wilson",
      email: "sophia@example.com",
      mobilenumber: 19870004567,
      jobTitle: "Throwball Player",
      organization: "Bay Area Throwers",
      location: "San Francisco, USA",
      cardVisibility: true,
    },
    mainButton: {
      buttonType: "link",
      buttonText: "Register",
      buttonInput: "https://sports.example.com/register/throwball/sophia-wilson",
    },
    whatsappButton: {
      whatsappNumber: "19870004567",
      message: "Hi Sophia, interested in throwball practice sessions?",
      isEnabled: true,
    },
  },
  content: {
    textSection: {
      heading: "About Me",
      title: "Throwball Specialist",
      content:
        "Passionate throwball player — focused on speed, catching and teamwork.",
      isEnabled: true,
    },
    linksSection: {
      title: "Match Results",
      link: "https://sports.example.com/results/sophia-wilson",
      isEnabled: true,
    },
    gallerySections: {
      imgUrl: "/assets/images/courses/3.jpg",
      isEnabled: true,
    },
    photoSections: {
      imgUrls: [
        "/assets/images/courses/4.jpg",
        "/assets/images/courses/5.jpg",
        "/assets/images/courses/6.jpg",
      ],
      isEnabled: true,
    },
    youtubeSections: {
      title: "Throwball Drills",
      link: getYouTubeEmbedUrl(
        "https://youtu.be/6cPiayn8E9c?si=uph-WOmY3eKACrKN"
      ),
      isEnabled: true,
    },
  },
  certificates: [
    { imgUrl: "/assets/images/certificates/aron.jpg" },
    { imgUrl: "/assets/images/certificates/1.png" },
    { imgUrl: "/assets/images/certificates/3.jpg" },
  ],
  style: {
    profileSection: {
      profileImgUrl: "/assets/images/courses/4.jpg",
      profileShapes: "circle",
      profileRingOnPhoto: true,
      profileVerified: true,
    },
    bannerImgSection: {
      bannerImgUrl: "/assets/images/courses/8.jpg",
    },
    themesSection: {
      themeName: "Passion Pink",
      themeId: null,
      // primaryColor: "#9d174d",
      primaryColor: "#FFFFFF",
      secondaryColor: "#ec4899",
      territoryColor: "#f59e0b",
      backgroundColor: "#9d174d",
      textColor: "#FFFFFF",
    },
    headerStyleSection: {
      headerStyle: "bold",
    },
    fontStyleSection: {
      font: "Lato",
    },
  },
  meta: {
    isPublic: true,
    createdAt: new Date("2025-07-15"),
    batch: "Mentor",
  },
}
,
    
{
  id: "6",
  about: {
    basicdetails: {
      name: "Daniel Smith",
      email: "daniel.smith@sportszone.com",
      mobilenumber: 19870012345,
      jobTitle: "Basketball Player",
      organization: "London Hoops United",
      location: "London, UK",
      cardVisibility: true,
    },
    mainButton: {
      buttonType: "link",
      buttonText: "Match Highlights",
      buttonInput:
        "https://sports.example.com/highlights/daniel-smith-basketball",
    },
    whatsappButton: {
      whatsappNumber: "19870012345",
      message: "Hi Daniel, love your basketball plays — any upcoming games?",
      isEnabled: true,
    },
  },
  content: {
    textSection: {
      heading: "About Me",
      title: "Basketball Player",
      content:
        "Guard/Forward — focused on ball-handling, shooting and fast-break plays. Available for team tryouts and coaching.",
      isEnabled: true,
    },
    linksSection: {
      title: "Match Highlights",
      link: "https://sports.example.com/highlights/daniel-smith",
      isEnabled: true,
    },
    gallerySections: {
      imgUrl: "/assets/images/courses/8.jpg",
      isEnabled: true,
    },
    photoSections: {
      imgUrls: [
        "/assets/images/courses/9.jpg",
        "/assets/images/courses/10.jpg",
        "/assets/images/courses/1.jpg",
      ],
      isEnabled: true,
    },
    youtubeSections: {
      title: "Basketball Drills",
      link: getYouTubeEmbedUrl(
        "https://youtu.be/mai8kYTxXQQ?si=OZ96mTYAGzrolGLP"
      ),
      isEnabled: true,
    },
  },
  certificates: [
    { imgUrl: "/assets/images/certificates/aron.jpg" },
    { imgUrl: "/assets/images/certificates/1.png" },
    { imgUrl: "/assets/images/certificates/3.jpg" },
  ],
  style: {
    profileSection: {
      profileImgUrl: "/assets/images/courses/5.jpg",
      profileShapes: "circle",
      profileRingOnPhoto: false,
      profileVerified: true,
    },
    bannerImgSection: {
      bannerImgUrl: "/assets/images/courses/2.jpg",
    },
    themesSection: {
      themeName: "Court Blue",
      themeId: null,
      // primaryColor: "#2563eb",
      primaryColor: "#FFFFFF",
      secondaryColor: "#60a5fa",
      territoryColor: "#facc15",
      backgroundColor: "#2563eb",
      textColor: "#FFFFFF",
    },
    headerStyleSection: {
      headerStyle: "italic",
    },
    fontStyleSection: {
      font: "Oswald",
    },
  },
  meta: {
    isPublic: true,
    createdAt: new Date("2025-08-18"),
    batch: "Student",
  },
}

  ];
  // ✅ Fetch data by id if not passed from state
  useEffect(() => {
    if (!card && cardId) {
      const found = savedCards.find((c) => c.id === cardId);
      setCard(found || null);
    }
  }, [cardId, card]);

  // ✅ Tabs + Drawer state
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ✅ Certificate preview modal state
  const [previewCert, setPreviewCert] = useState(null);

  // ========== SHARE MODAL STATE ==========
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [shareInputUrl, setShareInputUrl] = useState("");
  const [activeShareTab, setActiveShareTab] = useState("whatsapp");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [copied, setCopied] = useState(false);



  const closeShareModal = () => setShareModalOpen(false);


  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareInputUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const el = document.createElement("textarea");
      el.value = shareInputUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };




  // helper to open share modal with a link
  const openShareModal = (link) => {
    const finalLink = link
      ? `${window.location.origin}${link}`
      : `${window.location.origin}/certificate?id=${cardId}`;
    
    setShareLink(finalLink);
    setShareInputUrl(finalLink);
    setActiveShareTab("whatsapp");
    setWhatsappNumber("");
    setEmailAddress("");
    setCopied(false);
    setShareModalOpen(true);
  };
  
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = shareInputUrl;   // ✅ now directly the certificate image URL
  try {
    const parts = new URL(shareInputUrl).pathname.split("/");
    const file = parts[parts.length - 1] || "certificate.jpg";
    a.download = file;
  } catch {
    a.download = "certificate.jpg";
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

  const handleSendWhatsapp = () => {
    const num = whatsappNumber.replace(/[^0-9]/g, "");
    if (!num) return alert("Please enter a WhatsApp number.");
    const text = encodeURIComponent(`Here's the certificate: ${shareInputUrl}`);
    const waUrl = `https://wa.me/${num}?text=${text}`;
    window.open(waUrl, "_blank");
    setShareModalOpen(false);
  };

  const handleSendEmail = () => {
    if (!emailAddress) return alert("Please enter an email address.");
    const subject = encodeURIComponent("Certificate shared with you");
    const body = encodeURIComponent(`Hi,\n\nPlease find the certificate here: ${shareInputUrl}\n\nBest regards`);
    const mailto = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setShareModalOpen(false);
  };

  const openSocialShare = (platform) => {
    const url = encodeURIComponent(shareInputUrl);
    let shareUrl = "";
    if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
    }
    if (shareUrl) window.open(shareUrl, "_blank");
    setShareModalOpen(false);
  };

  if (!card) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Card not found.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: card?.style.themesSection.backgroundColor || "#1f2937" }}
    >
      {/* Responsive container */}
      <div
        className="my-6 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] max-w-3xl rounded-2xl shadow-lg overflow-hidden text-center relative"
        style={{ background: card?.style.themesSection.primaryColor  }}
      >
        {/* Banner */}
        <div className="relative">
          <img
            src={card?.style?.bannerImgSection?.bannerImgUrl}
            alt="Banner"
            className="w-full h-32 sm:h-40 md:h-48 object-cover"
          />
          <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 transform -translate-x-1/2">
            <img
              src={card?.style?.profileSection?.profileImgUrl}
              alt={card?.about?.basicdetails?.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md bg-gray-200"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
          {/* Name + Job + Company */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {card?.about?.basicdetails?.name}
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {card?.about?.basicdetails?.jobTitle} - {" "}
            {card?.about?.basicdetails?.organization}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {card?.about?.basicdetails?.location}
          </p>

          {/* Contact + WhatsApp */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {card?.about?.mainButton?.isEnabled !== false && (
              <a
                href={card?.about?.mainButton?.buttonInput}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition inline-block text-sm sm:text-base"
              >
                {card?.about?.mainButton?.buttonText}
              </a>
            )}
            {card?.about?.whatsappButton?.isEnabled && (
              <a
                href={`https://wa.me/${card.about.whatsappButton.whatsappNumber}?text=${encodeURIComponent(
                  card.about.whatsappButton.message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
              >
                <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>

          {/* ✅ Tabs */}
          <div className="mt-6 flex justify-start gap-4 border-b border-gray-300">
            {['home', 'bio', 'certificate', 'new'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm sm:text-base font-medium ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab === 'home'
                  ? 'Home'
                  : tab === 'bio'
                  ? 'My Bio'
                  : tab === 'certificate'
                  ? 'Certificate'
                  : 'New Tab'}
              </button>
            ))}

            {/* Sidebar Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="ml-auto pb-2 text-sm sm:text-base font-medium text-gray-500 hover:text-gray-800"
            >
              ☰
            </button>
          </div>

          {/* Drawer */}
          {drawerOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black/60"
                onClick={() => setDrawerOpen(false)}
              ></div>
              <div className="relative bg-white w-64 max-w-full h-full shadow-lg transform transition-transform duration-300">
                <div className="p-4 border-b border-gray-300 flex items-center gap-3">
                  <img
                    src={card?.style?.profileSection?.profileImgUrl}
                    alt={card?.about?.basicdetails?.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <h3 className="font-semibold text-gray-900">
                    {card?.about?.basicdetails?.name}
                  </h3>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {['home', 'bio', 'certificate', 'new'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setDrawerOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg ${
                        activeTab === tab
                          ? 'bg-gray-200 text-gray-900 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab === 'home'
                        ? 'Home'
                        : tab === 'bio'
                        ? 'My Bio'
                        : tab === 'certificate'
                        ? 'Certificate'
                        : 'New Tab'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ✅ Tab Contents */}
          {activeTab === 'home' && (
            <>
              {/* Links */}
              {card?.content?.linksSection?.isEnabled && (
                <div className="mt-6 space-y-2 text-left">
                  <a
                    href={card.content.linksSection.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline text-sm sm:text-base"
                  >
                    {card.content.linksSection.title}
                  </a>
                </div>
              )}

              {/* Photo */}
              {card?.content?.photoSections?.isEnabled && (
                <div className="mt-6">
                  <h3 className="text-gray-900 text-lg font-semibold mb-2 text-left">
                    Player
                  </h3>
                  <div className="flex justify-center bg-black py-4 rounded-lg">
                    <img
                      src={card.content.photoSections.imgUrls[0]}
                      alt="Photo"
                      className="w-[80%] sm:w-[60%] md:w-[50%] rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}

              {/* Gallery */}
              {card?.content?.gallerySections?.isEnabled && (
                <div className="mt-6">
                  <h3 className="text-gray-900 text-lg font-semibold mb-3 text-left">
                    Gallery Section
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {card.content.photoSections.imgUrls.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx}`}
                        className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'bio' && card?.content?.textSection?.isEnabled && (
            <div className="mt-6 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {card.content.textSection.heading}
              </h3>
              <h4 className="text-sm sm:text-md font-medium text-gray-700 mt-1">
                {card.content.textSection.title}
              </h4>
              <p className="mt-2 text-gray-700 text-sm">
                {card.content.textSection.content}
              </p>
            </div>
          )}

          {/* ✅ CERTIFICATE TAB (Modal Preview) */}
          {activeTab === 'certificate' && (
            <div className="mt-6 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Certificates
              </h3>
              {card?.certificates?.length > 0 ? (
                <div className="space-y-4">
                  {card.certificates.map((cert, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
                    >
                      <div onClick={() => setPreviewCert(cert.imgUrl)}>
                        <img
                          src={cert.imgUrl}
                          alt={`Certificate ${idx + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="flex justify-center gap-3 p-3 bg-white">
                        <button
                          className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-primary"
                          onClick={() => openShareModal(cert.imgUrl)}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No certificates found.</p>
              )}
            </div>
          )}

          {activeTab === 'new' && (
            <div className="mt-6 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                New Tab Content
              </h3>
              <p className="mt-2 text-gray-700 text-sm">
                This is placeholder content for the new tab. You can update it
                later as needed.
              </p>
            </div>
          )}

          {/* ✅ YouTube */}
          {activeTab !== 'certificate' &&
            card?.content?.youtubeSections?.isEnabled && (
              <div className="mt-6 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {card.content.youtubeSections.title}
                </h3>
                <div className="mt-3">
                  <iframe
                    className="w-full h-48 sm:h-64 md:h-72 rounded-lg"
                    src={getYouTubeEmbedUrl(card.content.youtubeSections.link)}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

          {/* Action buttons (bottom of card) */}
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <button
              className="px-5 sm:px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition text-sm sm:text-base"
              onClick={() => openShareModal(null)}
            >
              Send
            </button>
            <button className="px-5 sm:px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition text-sm sm:text-base">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-[90%] p-4">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <img
              src={previewCert}
              alt="Certificate Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
 

      {/* ========== SHARE MODAL ========== */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-fadeIn">
            <button
              onClick={closeShareModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-gray-900">Share Certificate</h3>
            <p className="text-sm text-gray-500">Copy or share the generated certificate link</p>

            {/* Input Row */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={shareInputUrl}
                onChange={(e) => setShareInputUrl(e.target.value)}
              />
              <button
                onClick={() => window.open(shareInputUrl, "_blank")}
                className="px-3 py-2 border rounded-lg text-sm flex items-center gap-2 hover:bg-gray-100"
              >
                <FiExternalLink /> Open
              </button>
            </div>

            {/* Copy & Download */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 px-4 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <FiCopy /> {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-4 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <FiDownload /> Download
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b">
              {['whatsapp','email','social'].map(tab => (
                <button
                  key={tab}
                  className={`px-3 py-2 ${activeShareTab === tab ? 'border-b-2 border-primary font-medium text-primary' : 'text-gray-600'}`}
                  onClick={() => setActiveShareTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* WhatsApp */}
            {activeShareTab === 'whatsapp' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Enter WhatsApp number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded px-3 py-2 text-sm"
                    placeholder="e.g. 919999999999"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                  <button
                    onClick={handleSendWhatsapp}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Email */}
            {activeShareTab === 'email' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Enter email address</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    className="flex-1 border rounded px-3 py-2 text-sm"
                    placeholder="example@mail.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Social */}
            {activeShareTab === 'social' && (
              <div className="flex items-center gap-4">
                <button onClick={() => openSocialShare('linkedin')} className="p-2 border rounded-lg hover:bg-gray-100"><FiLinkedin size={20} /></button>
                <button onClick={() => openSocialShare('facebook')} className="p-2 border rounded-lg hover:bg-gray-100"><FiFacebook size={20} /></button>
                <button onClick={() => openSocialShare('twitter')} className="p-2 border rounded-lg hover:bg-gray-100"><FiTwitter size={20} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { SingleCardView };
