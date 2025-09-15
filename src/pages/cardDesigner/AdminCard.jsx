// // // import React, { useState } from "react";
// // // import { Header } from "./components/Header";
// // // import { Edit, Eye, Share2 } from "lucide-react";
// // // import { ShareModal } from "./components/ShareModal"
// // // import { useNavigate } from "react-router-dom";


// // // const AdminCard = () => {
// // //     const navigate = useNavigate();

// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const [batch, setBatch] = useState("all");
// // //     const [selectedCard, setSelectedCard] = useState(null);

// // //     const savedCards = [
// // //         {
// // //             id: "i9h9ma",
// // //             name: "Michael Johnson",
// // //             profileImg: "/assets/images/allCard/profile.png",
// // //             backgroundColor: "#000000",
// // //             textColor: "#FFFFFF",
// // //             isPublic: true,
// // //             createdAt: new Date("2025-04-08"),
// // //             batch: "Student",
// // //         },
// // //         {
// // //             id: "2",
// // //             name: "Emily Davis",
// // //             profileImg: "/assets/images/allCard/profile1.png",
// // //             backgroundColor: "#0f6c7d",
// // //             textColor: "#FFFFFF",
// // //             isPublic: true,
// // //             createdAt: new Date("2025-04-08"),
// // //             batch: "Mentor",
// // //         },
// // //         {
// // //             id: "3",
// // //             name: "Christopher Miller",
// // //             profileImg: "/assets/images/allCard/profile2.png",
// // //             backgroundColor: "#2563EB",
// // //             textColor: "#FFFFFF",
// // //             isPublic: false,
// // //             createdAt: new Date("2025-03-20"),
// // //             batch: "Instructor",
// // //         },
// // //         {
// // //             id: "4",
// // //             name: "Zyla",
// // //             profileImg: "/assets/images/allCard/profile5.jpeg",
// // //             backgroundColor: "#f8716cff",
// // //             textColor: "#FFFFFF",
// // //             isPublic: false,
// // //             createdAt: new Date("2025-03-20"),
// // //             batch: "Instructor",
// // //         },
// // //         {
// // //             id: "5",
// // //             name: "Morris",
// // //             profileImg: "/assets/images/allCard/profile6.jpeg",
// // //             backgroundColor: "#ec01cdff",
// // //             textColor: "#FFFFFF",
// // //             isPublic: false,
// // //             createdAt: new Date("2025-04-20"),
// // //             batch: "Student",
// // //         },
// // //         {
// // //             id: "6",
// // //             name: "Sophia Lee",
// // //             profileImg: "/assets/images/allCard/profile3.png",
// // //             backgroundColor: "#22c55e",
// // //             textColor: "#FFFFFF",
// // //             isPublic: true,
// // //             createdAt: new Date("2025-05-01"),
// // //             batch: "Mentor",
// // //         },
// // //         {
// // //             id: "7",
// // //             name: "David Brown",
// // //             profileImg: "/assets/images/allCard/profile.png",
// // //             backgroundColor: "#9333ea",
// // //             textColor: "#FFFFFF",
// // //             isPublic: true,
// // //             createdAt: new Date("2025-05-10"),
// // //             batch: "Instructor",
// // //         },
// // //         {
// // //             id: "8",
// // //             name: "Olivia Wilson",
// // //             profileImg: "/assets/images/allCard/profile2.png",
// // //             backgroundColor: "#f59e0b",
// // //             textColor: "#000000",
// // //             isPublic: false,
// // //             createdAt: new Date("2025-04-28"),
// // //             batch: "Student",
// // //         },
// // //     ];

// // //     // Filter + Sort
// // //     let filteredCards = savedCards.filter((card) => {
// // //         const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());

// // //         const matchesBatch = batch === "all" || card.batch === batch;
// // //         return matchesSearch && matchesBatch;
// // //     });

// // //     const [showShareModal, setShowShareModal] = useState(false);
// // //     const viewCard = (card) => {
// // //         let shareUrl = `${window.location.origin}/cardview?id=${card.id}`;
// // //         window.open(`${shareUrl}`, "_blank");
// // //     }

// // //     return (
// // //         <div className="p-4 sm:p-6 lg:p-4 xl:p-8 ">
// // //             <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
// // //                 {/* Header with filters */}
// // //                 <div className="border-b mb-5 border-gray-200 flex justify-between items-center p-5">
// // //                     <h1 className="text-[30px] font-bold font-outfit text-headcolor">Web Cards</h1>

// // //                     <Header
// // //                         onSearch={setSearchTerm}
// // //                         onBatchChange={setBatch}
// // //                         onNewCard={() => navigate("/dashboard/editcard")}
// // //                     />

// // //                 </div>

// // //                 {/* Cards */}
// // //                 <div className="flex flex-wrap gap-6 justify-center p-6">
// // //                     {filteredCards.map((card) => (
// // //                         <div
// // //                             key={card.id}
// // //                             className="rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-500 ease-in-out hover:scale-105"
// // //                             style={{ backgroundColor: card.backgroundColor }}
// // //                         >
// // //                             {/* Profile */}
// // //                             <div className="flex justify-center mt-10">
// // //                                 <img
// // //                                     src={card.profileImg}
// // //                                     alt={card.name}
// // //                                     className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
// // //                                 />
// // //                             </div>

// // //                             {/* Card Content */}
// // //                             <div className="bg-white mt-10 p-6 text-center">
// // //                                 <h4 className="font-semibold text-lg text-primary font-outfit">
// // //                                     {card.name}
// // //                                 </h4>
// // //                                 <p className="text-subtext font-medium font-poppins">
// // //                                     {card.batch}
// // //                                 </p>

// // //                                 {/* Buttons */}
// // //                                 <div className="flex flex-wrap justify-center gap-3 mt-5">
// // //                                     <button
// // //                                         onClick={() => { viewCard(card) }}
// // //                                         className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins">
// // //                                         <Eye size={16} /> View
// // //                                     </button>
// // //                                     <button 
// // //                                     onClick={() => navigate("/dashboard/editcard")}
// // //                                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins">
// // //                                         <Edit size={16} /> Edit
// // //                                     </button>
// // //                                     <button
// // //                                         onClick={() => setSelectedCard(card)}
// // //                                         className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
// // //                                     >
// // //                                         <Share2 size={16} /> Share 
// // //                                     </button>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     ))}

// // //                     {/* Show modal for selected card */}
// // //                     {selectedCard && (
// // //                         <ShareModal card={selectedCard} onClose={() => setSelectedCard(null)} />
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export { AdminCard };





// // import React, { useState } from "react";
// // import { Header } from "./components/Header";
// // import { Edit, Eye, Share2 } from "lucide-react";
// // import { ShareModal } from "./components/ShareModal";
// // import { useNavigate } from "react-router-dom";

// // const AdminCard = () => {
// //   const navigate = useNavigate();

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [batch, setBatch] = useState("all");
// //   const [selectedCard, setSelectedCard] = useState(null);

// //   // ✅ Utility: Convert YouTube links to embed
// //   const getYouTubeEmbedUrl = (url) => {
// //     if (!url) return "";
// //     let videoId = "";
// //     if (url.includes("youtu.be/")) {
// //       videoId = url.split("youtu.be/")[1].split("?")[0];
// //     } else if (url.includes("watch?v=")) {
// //       videoId = url.split("watch?v=")[1].split("&")[0];
// //     }
// //     return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
// //   };

// //   // ✅ All static cards here
// //   const savedCards = [
// //     {
// //       id: "1",
// //       about: {
// //         basicdetails: {
// //           name: "Michael Johnson",
// //           email: "michael@example.com",
// //           mobilenumber: 11234567890,
// //           jobTitle: "Software Engineer",
// //           organization: "TechCorp Pvt Ltd",
// //           location: "New York, USA",
// //           cardVisibility: true,
// //         },
// //         mainButton: {
// //           buttonType: "email",
// //           buttonText: "Email Me",
// //           buttonInput: "mailto:michael@example.com",
// //         },
// //         whatsappButton: {
// //           whatsappNumber: "11234567890",
// //           message: "Hi Michael, I’d like to connect with you.",
// //           isEnabled: true,
// //         },
// //       },
// //       content: {
// //         textSection: {
// //           heading: "About Me",
// //           title: "Who I Am",
// //           content:
// //             "Passionate software engineer with experience in building scalable web applications and working with modern JavaScript frameworks.",
// //           isEnabled: true,
// //         },
// //         linksSection: {
// //           title: "My Linkedin Profile",
// //           link: "https://linkedin.com/in/michael",
// //           isEnabled: true,
// //         },
// //         gallerySections: {
// //           imgUrl: "/assets/images/courses/2.jpg",
// //           isEnabled: true,
// //         },
// //         photoSections: {
// //           imgUrls: [
// //             "/assets/images/courses/2.jpg",
// //             "/assets/images/courses/3.jpg",
// //             "/assets/images/courses/4.jpg",
// //           ],
// //           isEnabled: true,
// //         },
// //         youtubeSections: {
// //           title: "Throw Ball",
// //           link: getYouTubeEmbedUrl(
// //             "https://youtu.be/6cPiayn8E9c?si=wAIkPT-mtarr9iqq"
// //           ),
// //           isEnabled: true,
// //         },
// //       },
// //       certificates: [
// //         { 
// //           imgUrl: "/assets/images/certificates/aron.jpg" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/1.png" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/3.jpg" 
// //         },
// //       ],
      
// //       style: {
// //         profileSection: {
// //           profileImgUrl: "/assets/images/courses/1.jpg",
// //           profileShapes: "circle",
// //           profileRingOnPhoto: true,
// //           profileVerified: true,
// //         },
// //         bannerImgSection: {
// //           bannerImgUrl: "/assets/images/courses/6.jpg",
// //         },
// //       },
// //       backgroundColor: "#000000",
// //       textColor: "#FFFFFF",
// //       isPublic: true,
// //       createdAt: new Date("2025-04-08"),
// //       batch: "Student",
// //     },

// //     {
// //       id: "2",
// //       about: {
// //         basicdetails: {
// //           name: "David Carter",
// //           email: "david.carter@sportsclub.com",
// //           mobilenumber: 919123456789,
// //           jobTitle: "Football Coach",
// //           organization: "Global Sports Academy",
// //           location: "Manchester, UK",
// //           cardVisibility: true,
// //         },
// //         mainButton: {
// //           buttonType: "Phone",
// //           buttonText: "Call Me",
// //           buttonInput: "9874563210",
// //         },
// //         whatsappButton: {
// //           whatsappNumber: "919123456789",
// //           message: "Hi Coach! Loved your training session on football ⚽🔥",
// //           isEnabled: true,
// //         },
// //       },
// //       content: {
// //         textSection: {
// //           heading: "About Me",
// //           title: "Sports Enthusiast",
// //           content:
// //             "I’m passionate about sports like football, volleyball, and throwball. I enjoy coaching, playing, and promoting teamwork both on and off the field.",
// //           isEnabled: true,
// //         },
// //         linksSection: {
// //           title: "My Sports Club",
// //           link: "https://sportsclub.com",
// //           isEnabled: true,
// //         },
// //         gallerySections: {
// //           imgUrl: "/assets/images/courses/8.jpg",
// //           isEnabled: true,
// //         },
// //         photoSections: {
// //           imgUrls: [
// //             "/assets/images/courses/1.jpg",
// //             "/assets/images/courses/9.jpg",
// //             "/assets/images/courses/10.jpg",
// //           ],
// //           isEnabled: true,
// //         },
// //         youtubeSections: {
// //           title: "Top Football Training Drills",
// //           link: getYouTubeEmbedUrl("https://youtu.be/LRskVBm_eiw?si=qiStjHrwQDKnYBtu"),
// //           isEnabled: true,
// //         },
// //       },
// //       certificates: [
// //         { 
// //           imgUrl: "/assets/images/certificates/aron.jpg" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/1.png" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/3.jpg" 
// //         },
// //       ],
// //       style: {
// //         profileSection: {
// //           profileImgUrl: "/assets/images/courses/2.jpg",
// //           profileShapes: "circle",
// //           profileRingOnPhoto: false,
// //           profileVerified: true,
// //         },
// //         bannerImgSection: {
// //           bannerImgUrl: "/assets/images/courses/2.jpg",
// //         },
// //       },
// //       backgroundColor: "#dc2626",
// //       textColor: "#FFFFFF",
// //       isPublic: true,
// //       createdAt: new Date("2025-08-25"),
// //       batch: "Student",
// //     },

// //     {
// //       id: "3",
// //       about: {
// //         basicdetails: {
// //           name: "Daniel Smith",
// //           email: "daniel@example.com",
// //           mobilenumber: 19870001234,
// //           jobTitle: "Volleyball Player",
// //           organization: "Chicago Spikers",
// //           location: "Chicago, USA",
// //           cardVisibility: true,
// //         },
// //         mainButton: {
// //           buttonType: "link",
// //           buttonText: "Player Profile",
// //           buttonInput: "https://sports.example.com/players/daniel-smith",
// //         },
// //         whatsappButton: {
// //           whatsappNumber: "19870001234",
// //           message: "Hey Daniel, interested in joining a volleyball match?",
// //           isEnabled: true,
// //         },
// //       },
// //       content: {
// //         textSection: {
// //           heading: "About Me",
// //           title: "Volleyball Enthusiast",
// //           content:
// //             "Competitive volleyball player — spiker, blocker and team player. Available for tournaments and coaching clinics.",
// //           isEnabled: true,
// //         },
// //         linksSection: {
// //           title: "Match Stats",
// //           link: "https://sports.example.com/stats/daniel-smith-volleyball",
// //           isEnabled: true,
// //         },
// //         gallerySections: {
// //           imgUrl: "/assets/images/courses/6.jpg",
// //           isEnabled: true,
// //         },
// //         photoSections: {
// //           imgUrls: [
// //             "/assets/images/courses/8.jpg",
// //             "/assets/images/courses/9.jpg",
// //             "/assets/images/courses/10.jpg",
// //           ],
// //           isEnabled: true,
// //         },
// //         youtubeSections: {
// //           title: "Volleyball Highlights",
// //           link: getYouTubeEmbedUrl("https://youtu.be/vjbJ67Ox88w?si=w5Jlw9h1lY-kIheG"),
// //           isEnabled: true,
// //         },
// //       },
// //       certificates: [
// //         { 
// //           imgUrl: "/assets/images/certificates/aron.jpg" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/1.png" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/3.jpg" 
// //         },
// //       ],
// //       style: {
// //         profileSection: {
// //           profileImgUrl: "/assets/images/courses/3.jpg",
// //           profileShapes: "circle",
// //           profileRingOnPhoto: true,
// //           profileVerified: false,
// //         },
// //         bannerImgSection: {
// //           bannerImgUrl: "/assets/images/courses/7.jpg",
// //         },
// //       },
// //       backgroundColor: "#1e3a8a",
// //       textColor: "#FFFFFF",
// //       isPublic: true,
// //       createdAt: new Date("2025-06-01"),
// //       batch: "Student",
// //     },
    
// //     {
// //       id: "4",
// //       about: {
// //         basicdetails: {
// //           name: "Sophia Wilson",
// //           email: "sophia@example.com",
// //           mobilenumber: 19870004567,
// //           jobTitle: "Throwball Player",
// //           organization: "Bay Area Throwers",
// //           location: "San Francisco, USA",
// //           cardVisibility: true,
// //         },
// //         mainButton: {
// //           buttonType: "link",
// //           buttonText: "Register",
// //           buttonInput: "https://sports.example.com/register/throwball/sophia-wilson",
// //         },
// //         whatsappButton: {
// //           whatsappNumber: "19870004567",
// //           message: "Hi Sophia, interested in throwball practice sessions?",
// //           isEnabled: true,
// //         },
// //       },
// //       content: {
// //         textSection: {
// //           heading: "About Me",
// //           title: "Throwball Specialist",
// //           content: "Passionate throwball player — focused on speed, catching and teamwork.",
// //           isEnabled: true,
// //         },
// //         linksSection: {
// //           title: "Match Results",
// //           link: "https://sports.example.com/results/sophia-wilson",
// //           isEnabled: true,
// //         },
// //         gallerySections: {
// //           imgUrl: "/assets/images/courses/3.jpg",
// //           isEnabled: true,
// //         },
// //         photoSections: {
// //           imgUrls: [
// //             "/assets/images/courses/4.jpg",
// //             "/assets/images/courses/5.jpg",
// //             "/assets/images/courses/6.jpg",
// //           ],
// //           isEnabled: true,
// //         },
// //         youtubeSections: {
// //           title: "Throwball Drills",
// //           link: getYouTubeEmbedUrl("https://youtu.be/6cPiayn8E9c?si=uph-WOmY3eKACrKN"),
// //           isEnabled: true,
// //         },
// //       },
// //       certificates: [
// //         { 
// //           imgUrl: "/assets/images/certificates/aron.jpg" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/1.png" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/3.jpg" 
// //         },
// //       ],
// //       style: {
// //         profileSection: {
// //           profileImgUrl: "/assets/images/courses/4.jpg",
// //           profileShapes: "circle",
// //           profileRingOnPhoto: true,
// //           profileVerified: true,
// //         },
// //         bannerImgSection: {
// //           bannerImgUrl: "/assets/images/courses/8.jpg",
// //         },
// //       },
// //       backgroundColor: "#9d174d",
// //       textColor: "#FFFFFF",
// //       isPublic: true,
// //       createdAt: new Date("2025-07-15"),
// //       batch: "Mentor",
// //     },
    
// //     {
// //       id: "6",
// //       about: {
// //         basicdetails: {
// //           name: "Daniel Smith",
// //           email: "daniel.smith@sportszone.com",
// //           mobilenumber: 19870012345,
// //           jobTitle: "Basketball Player",
// //           organization: "London Hoops United",
// //           location: "London, UK",
// //           cardVisibility: true,
// //         },
// //         mainButton: {
// //           buttonType: "link",
// //           buttonText: "Match Highlights",
// //           buttonInput: "https://sports.example.com/highlights/daniel-smith-basketball",
// //         },
// //         whatsappButton: {
// //           whatsappNumber: "19870012345",
// //           message: "Hi Daniel, love your basketball plays — any upcoming games?",
// //           isEnabled: true,
// //         },
// //       },
// //       content: {
// //         textSection: {
// //           heading: "About Me",
// //           title: "Basketball Player",
// //           content:
// //             "Guard/Forward — focused on ball-handling, shooting and fast-break plays. Available for team tryouts and coaching.",
// //           isEnabled: true,
// //         },
// //         linksSection: {
// //           title: "Match Highlights",
// //           link: "https://sports.example.com/highlights/daniel-smith",
// //           isEnabled: true,
// //         },
// //         gallerySections: {
// //           imgUrl: "/assets/images/courses/8.jpg",
// //           isEnabled: true,
// //         },
// //         photoSections: {
// //           imgUrls: [
// //             "/assets/images/courses/9.jpg",
// //             "/assets/images/courses/10.jpg",
// //             "/assets/images/courses/1.jpg",
// //           ],
// //           isEnabled: true,
// //         },
// //         youtubeSections: {
// //           title: "Basketball Drills",
// //           link: getYouTubeEmbedUrl("https://youtu.be/mai8kYTxXQQ?si=OZ96mTYAGzrolGLP"),
// //           isEnabled: true,
// //         },
// //       },
// //       certificates: [
// //         { 
// //           imgUrl: "/assets/images/certificates/aron.jpg" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/1.png" 
// //         },
// //         { 
// //           imgUrl: "/assets/images/certificates/3.jpg" 
// //         },
// //       ],
// //       style: {
// //         profileSection: {
// //           profileImgUrl: "/assets/images/courses/5.jpg",
// //           profileShapes: "circle",
// //           profileRingOnPhoto: false,
// //           profileVerified: true,
// //         },
// //         bannerImgSection: {
// //           bannerImgUrl: "/assets/images/courses/2.jpg",
// //         },
// //       },
// //       backgroundColor: "#2563eb",
// //       textColor: "#FFFFFF",
// //       isPublic: true,
// //       createdAt: new Date("2025-08-18"),
// //       batch: "Student",
// //     }
    
// //   ];

// //   // ✅ Search + Filter
// //   let filteredCards = savedCards.filter((card) => {
// //     const matchesSearch = (card.name || card.about?.basicdetails?.name || "")
// //       .toLowerCase()
// //       .includes(searchTerm.toLowerCase());
// //     const matchesBatch = batch === "all" || card.batch === batch;
// //     return matchesSearch && matchesBatch;
// //   });

// //   const viewCard = (card) => {
// //     navigate(`/cardview?id=${card.id}`, { state: { card } });
// //   };

// //   return (
// //     <div className="p-4 sm:p-6 lg:p-4 xl:p-8 ">
// //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
// //         {/* Header */}
// //         <div className="border-b mb-5 border-gray-200 flex justify-between items-center p-5">
// //           <h1 className="text-[30px] font-bold font-outfit text-headcolor">
// //             Web Cards
// //           </h1>

// //           <Header
// //             onSearch={setSearchTerm}
// //             onBatchChange={setBatch}
// //             onNewCard={() => navigate("/dashboard/editcard")}
// //           />
// //         </div>

// //         {/* Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// //           {filteredCards.map((card) => (
// //             <div
// //               key={card.id}
// //               className="rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-500 ease-in-out hover:scale-105"
// //               style={{ backgroundColor: card.backgroundColor }}
// //             >
// //               {/* Profile */}
// //               <div className="flex justify-center mt-10">
// //                 <img
// //                   src={
// //                     card.profileImg || card.style?.profileSection?.profileImgUrl
// //                   }
// //                   alt={card.name || card.about?.basicdetails?.name}
// //                   className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
// //                 />
// //               </div>

// //               {/* Card Content */}
// //               <div className="bg-white mt-10 p-6 text-center">
// //                 <h4 className="font-semibold text-lg text-primary font-outfit">
// //                   {card.name || card.about?.basicdetails?.name}
// //                 </h4>
// //                 <p className="text-subtext font-medium font-poppins">
// //                   {card.batch}
// //                 </p>

// //                 {/* Buttons */}
// //                 <div className="flex flex-wrap justify-center gap-3 mt-5">
// //                   <button
// //                     onClick={() => viewCard(card)}
// //                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
// //                   >
// //                     <Eye size={16} /> View
// //                   </button>
// //                   <button
// //                     onClick={() => navigate("/dashboard/editcard")}
// //                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
// //                   >
// //                     <Edit size={16} /> Edit
// //                   </button>
// //                   <button
// //                     onClick={() => setSelectedCard(card)}
// //                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
// //                   >
// //                     <Share2 size={16} /> Share
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}

// //           {/* Show modal */}
// //           {selectedCard && (
// //             <ShareModal
// //               card={selectedCard}
// //               onClose={() => setSelectedCard(null)}
// //             />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export { AdminCard };


// import React, { useState } from "react";
// import { Header } from "./components/Header";
// import { Edit, Eye, Share2 } from "lucide-react";
// import { ShareModal } from "./components/ShareModal";
// import { useNavigate } from "react-router-dom";

// const AdminCard = () => {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [batch, setBatch] = useState("all");
//   const [selectedCard, setSelectedCard] = useState(null);

//   // ✅ Utility: Convert YouTube links to embed
//   const getYouTubeEmbedUrl = (url) => {
//     if (!url) return "";
//     let videoId = "";
//     if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1].split("?")[0];
//     } else if (url.includes("watch?v=")) {
//       videoId = url.split("watch?v=")[1].split("&")[0];
//     }
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
//   };

//   // ✅ All static cards here
//   const savedCards = [
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

//   // ✅ Search + Filter
//   let filteredCards = savedCards.filter((card) => {
//     const matchesSearch = (card.name || card.about?.basicdetails?.name || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesBatch = batch === "all" || card.batch === batch;
//     return matchesSearch && matchesBatch;
//   });

//   // const viewCard = (card) => {
//   //   navigate(`cardview?id=${card.id}`, { state: { card } });
//   // };

//   const viewCard = (card) => {
//     navigate(`/cardview?id=${card.id}`, { state: { card } });
//   };


//   return (
//     <div className="p-4 sm:p-6 lg:p-4 xl:p-8 ">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
//         {/* Header */}
//         <div className="border-b mb-5 border-gray-200 flex justify-between items-center p-5">
//           <h1 className="text-[30px] font-bold font-outfit text-headcolor">
//             Web Cards
//           </h1>

//           <Header
//             onSearch={setSearchTerm}
//             onBatchChange={setBatch}
//             // onNewCard={() => navigate("")}
//           />
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//           {filteredCards.map((card) => (
//             <div
//               key={card.id}
//               className="rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-500 ease-in-out hover:scale-105"
//               style={{ backgroundColor: card.backgroundColor }}
//             >
//               {/* Profile */}
//               <div className="flex justify-center mt-10">
//                 <img
//                   src={
//                     card.profileImg || card.style?.profileSection?.profileImgUrl
//                   }
//                   alt={card.name || card.about?.basicdetails?.name}
//                   className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-200"
//                 />
//               </div>

//               {/* Card Content */}
//               <div className="bg-white mt-10 p-6 text-center">
//                 <h4 className="font-semibold text-lg text-primary font-outfit">
//                   {card.name || card.about?.basicdetails?.name}
//                 </h4>
//                 <p className="text-subtext font-medium font-poppins">
//                   {card.batch}
//                 </p>

//                 {/* Buttons */}
//                 <div className="flex flex-wrap justify-center gap-3 mt-5">
//                   <button
//                     onClick={() => viewCard(card)}
//                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
//                   >
//                     <Eye size={16} /> View
//                   </button>
//                   <button
//                     // onClick={() => navigate("/dashboard/editcard")}
//                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
//                   >
//                     <Edit size={16} /> Edit
//                   </button>
//                   <button
//                     onClick={() => setSelectedCard(card)}
//                     className="flex items-center cursor-pointer gap-1 px-4 py-2 rounded-full border border-primary text-primary bg-white hover:bg-primary hover:text-white transition text-sm font-poppins"
//                   >
//                     <Share2 size={16} /> Share
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Show modal */}
//           {selectedCard && (
//             <ShareModal
//               card={selectedCard}
//               onClose={() => setSelectedCard(null)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { AdminCard };





import React, { useState } from "react";
import { Header } from "./components/Header";
import { Edit, Eye, Share2 } from "lucide-react";
import { ShareModal } from "./components/ShareModal";
import { useNavigate } from "react-router-dom";

const AdminCard = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [batch, setBatch] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);

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

  // ✅ All static cards here
 
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
          message: "Hi Coach! Loved your training session on football",
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
          // themeId: null,
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
  // ✅ Search + Filter
  let filteredCards = savedCards.filter((card) => {
    const matchesSearch = (card.name || card.about?.basicdetails?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBatch = batch === "all" || card.batch === batch;
    return matchesSearch && matchesBatch;
  });

  // const viewCard = (card) => {
  //   navigate(`cardview?id=${card.id}`, { state: { card } });
  // };

  const viewCard = (card) => {
    navigate(`/cardview?id=${card.id}`, { state: { card } });
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
            onSearch={setSearchTerm}
            onBatchChange={setBatch}
            onNewCard={() => navigate("/dashboard/editcard")}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl shadow-md overflow-hidden relative transform transition-transform duration-500 ease-in-out hover:scale-105"
              style={{ backgroundColor: card.style.themesSection.backgroundColor }}
            >
              {/* Profile */}
              <div className="flex justify-center mt-10">
                <img
                  src={
                    card.profileImg || card.style?.profileSection?.profileImgUrl
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
                  {card.batch}
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
                    onClick={() => navigate("/dashboard/editcard")}
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

          {/* Show modal */}
          {selectedCard && (
            <ShareModal
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { AdminCard };




