import React, { useState, useRef, useContext, useEffect } from "react";
import { LinkIcon, IdCard, Contact, Mail, Phone, MessageSquare, MessageCircle, FileText, Wifi, Check, Award } from "lucide-react";
import { QRCode } from 'react-qrcode-logo';
import { ArrowLeft } from "lucide-react";
import facebookLogo from "/assets/images/socialmedia/faceBook.png"
import instagramLogo from "/assets/images/socialmedia/insta.png";
import linkedinLogo from "/assets/images/socialmedia/linkIn.png";
import whatsappLogo from "/assets/images/socialmedia/whatsApp.png";
import twitterLogo from "/assets/images/socialmedia/xtwit.png";
import snapchatLogo from "/assets/images/socialmedia/snap.png";
import dotLogo from "/assets/images/QrCode/qrDots.png";
import fluidLogo from "/assets/images/QrCode/qrFluid.png";
import squareLogo from "/assets/images/QrCode/qrSquare.png";
import SuccessModal from "./Components/SuccessModal";
import ErrorModal from "./Components/ErrorModal";
const API_BASE = import.meta.env.VITE_API_BASE;
import { saveQrCodeAPI, getQrCodeById, updateQrCode } from "../../api/QrCode/QrCode"

import { AuthContext } from '../../context/AuthContext';
import QrForms from "./QrContentForms";
const AddQrCode = (props) => {
  const { user } = useContext(AuthContext);
  const [fileType, setFileType] = useState("png");
  const [addCont, setAddCont] = useState(false);
  const [dotColor, setDotColor] = useState("#000000");
  const [bkColor, setBkColor] = useState("#FFFFFF");
  const [cornerBoxColor, setCornerBoxColor] = useState("#000000");
  const [cornerDotColor, setCornerDotColor] = useState("#000000");
  const shapes = ["square", "circle", "rounded"];
  const [selectedShape, setSelectedShape] = useState("square");
  const [selectedDotShape, setSelectedDotShape] = useState("square");
  const dotShapes = ["square", "circle"];
  const [selectHead, setSelectHead] = useState("1");
  const [createQr, setCreateQr] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [qrType, setQrType] = useState("square");
  const [qrMode, setQrMode] = useState("Link"); // store type for backend (like "link", "email", etc.)
  const qrRef = useRef(null);
  const [content, setContent] = useState({});
  const [qrValue, setQrValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccess = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorOpen(true);
  };


  // Add this useEffect to fetch data when editQrId prop changes
  useEffect(() => {
    const fetchQrCodeData = async () => {
      if (!props.editQrId) return;

      try {
        const response = await getQrCodeById(props.editQrId);
        const qrData = response.data;

        // Set the QR mode and content
        setQrMode(qrData.qrMode);
        setContent(qrData.content || {});

        // Set design properties
        if (qrData.pattern) {
          setBkColor(qrData.pattern.backColor || "#FFFFFF");
          setDotColor(qrData.pattern.foreColor || "#000000");
          setQrType(qrData.pattern.type || "square");
        }

        if (qrData.corner) {
          setSelectedShape(qrData.corner.boxType || "square");
          setSelectedDotShape(qrData.corner.dotStyle || "square");
          setCornerBoxColor(qrData.corner.boxColor || "#000000");
          setCornerDotColor(qrData.corner.dotColor || "#000000");
        }

        setSelectedLogo(qrData.logoUrl || null);

        // Open the appropriate steps
        setAddCont(true);
        setSelectHead("2");

      } catch (err) {
        console.error("Error fetching QR code data:", err);
        showError("Failed to load QR code data");
      }
    };

    fetchQrCodeData();
  }, [props.editQrId]);



  const logos = {
    facebook: facebookLogo,
    instagram: instagramLogo,
    linkedin: linkedinLogo,
    whatsapp: whatsappLogo,
    twitter: twitterLogo,
    snapchat: snapchatLogo,
  };

  const qrLogos = {
    dots: dotLogo,
    fluid: fluidLogo,
    square: squareLogo
  };

  function ColorPickerInput({ label, color, setColor }) {
    return (
      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded-md px-2 py-2 w-28"
          />
        </div>
      </div>
    );
  }


  const QrForm = QrForms[qrMode];
  useEffect(() => {
    if (!qrMode) return;
    let value = "";

    switch (qrMode) {
      case "link":
        value = content.url || "";
        break;
      case "digitalCard":
        value = content.webCardId
          ? `${window.location.origin}/cardview?id=${content.webCardId}`
          : "";
        break;
      case "vCard":
        const address = content.address
          ? `;;${content.address.street || ""};${content.address.city || ""};${content.address.state || ""};${content.address.postalCode || ""};${content.address.country || ""}`
          : "";
        value = `BEGIN:VCARD
VERSION:3.0
FN:${content.firstName || ""} ${content.lastName || ""}
TEL:${content.phoneNumber || ""}
EMAIL:${content.emailAddress || ""}
ORG:${content.companyName || ""}
TITLE:${content.profession || ""}
URL:${content.personalWebsite || ""}
ADR;TYPE=home:${address}
END:VCARD`;
        break;
      case "email":
        value = `mailto:${content.email || ""}?subject=${content.subject || ""}&body=${content.message || ""}`;
        break;
      case "call":
        value = `tel:${content.phoneNumber || ""}`;
        break;
      case "sms":
        value = `sms:${content.phoneNumber || ""}?body=${content.message || ""}`;
        break;
      case "whatsApp":
        value = `https://wa.me/${content.phoneNumber || ""}?text=${content.message || ""}`;
        break;
      case "text":
        value = content.text || "";
        break;
      case "wifi":
        value = `WIFI:T:${content.encryption || ""};S:${content.networkName || ""};P:${content.password || ""};;`;
        break;
      case "certificate":
        value = content.certificateurl
          ? `${API_BASE}${content.certificateurl}`
          : "";
        break;
      default:
        value = "";
    }
    setQrValue(value);
  }, [qrMode, content]);

  const getQrContentForBackend = () => {
    switch (qrMode) {
      case "link":
        return {
          url: content.url || "",
          qrName: content.qrName || " ",
        };

      case "digitalCard":
        return {
          qrName: content.qrName || "",
          webCardId: content.webCardId || ""
        };
      case "vCard":
        return {
          qrName: content.qrName || "",
          firstName: content.firstName || "",
          lastName: content.lastName || "",
          phoneNumber: content.phoneNumber || "",
          altPhoneNumber: content.altPhoneNumber || "",
          email: content.emailAddress || "", // match schema key
          companyName: content.companyName || "",
          position: content.profession || "", // match schema key
          personalWebsite: content.personalWebsite || "",
          address: {
            heading: content.addressHeading || "",
            street: content.street || "",
            postalCode: content.postalCode || "",
            city: content.city || "",
            state: content.state || "",
            country: content.country || "",
          },
        };


      case "email":
        return {
          email: content.email || "",
          subject: content.subject || "",
          message: content.message || "",
          qrName: content.qrName || " ",
        };

      case "call":
        return {
          phoneNumber: content.phoneNumber || "",
          qrName: content.qrName || " ",
        };

      case "sms":
        return {
          phoneNumber: content.phoneNumber || "",
          message: content.message || "",
          qrName: content.qrName || " ",
        };

      case "whatsApp":
        return {
          qrName: content.qrName || "",
          phoneNumber: content.phoneNumber || "",
          message: content.message || "",
        };

      case "text":
        return {
          text: content.text || "",
          qrName: content.qrName || " ",
        };

      case "wifi":
        return {
          qrName: content.qrName || "",
          encryption: content.encryption || "",
          networkName: content.networkName || "",
          password: content.password || "",
        };
      case "certificate":
        return {
          certificateurl: content.certificateurl || "",
          qrName: content.qrName || " ",
        };


      default:
        return {};
    }
  };
;
  const saveQrCodeToBackend = async () => {
    if (!qrRef.current) return showError("QR Code not ready");

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return showError("Canvas not found");

    // Trigger download locally
    const image = canvas.toDataURL(`image/${fileType}`);
    const link = document.createElement("a");
    link.href = image;
    link.click();

    // Convert canvas to blob for backend - FIXED
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, `image/${fileType === 'jpg' ? 'jpeg' : fileType}`, 1.0);
    });

    if (!blob) return showError("Failed to generate QR blob");

    // Prepare FormData - FIXED
    const formData = new FormData();
    formData.append("qrImage", blob, `qrcode.${fileType}`); // This should work now
    formData.append("qrMode", qrMode);
    formData.append("userId", user._id);
    formData.append("content", JSON.stringify(getQrContentForBackend()));
    formData.append("pattern", JSON.stringify({ type: qrType, backColor: bkColor, foreColor: dotColor }));
    formData.append("corner", JSON.stringify({ boxType: selectedShape, boxColor: cornerBoxColor, dotStyle: selectedDotShape, dotColor: cornerDotColor }));
    formData.append("logoUrl", selectedLogo || "");

    try {
      let data;

      if (props.editQrId) {
        console.log("🔄 Updating QR code with ID:", props.editQrId);
        data = await updateQrCode(props.editQrId, formData);
        if (data.success) {
          showSuccess("QR code updated successfully!");
          props.closeQr();
        } else {
          showError("Error updating QR Code: " + data.message);
        }
      } else {
        // Create new QR code
        data = await saveQrCodeAPI(formData);
        if (data.success) {
          showSuccess("QR code saved successfully!");
          props.closeQr();
        } else {
          showError("Error saving QR Code: " + data.message);
        }
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      showError("Server error while processing QR code");
    }
  };

  // Function to download QR code
  const handleDownload = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) {
      showError("QR code not found");
      return;
    }

    const type = fileType || "png"; // selected type
    let link = document.createElement("a");

    if (type === "png" || type === "jpg") {
      // PNG or JPG
      const mime = type === "png" ? "image/png" : "image/jpeg";
      link.href = canvas.toDataURL(mime);
      link.download = `qr-code.${type}`;
    } else if (type === "svg") {
      // Convert canvas to SVG is tricky; better to re-render QR as SVG
      // We'll grab the SVG if rendered as SVG
      const svg = qrRef.current.querySelector("svg");
      if (!svg) {
        showError("SVG format not available. Please switch QR render to SVG.");
        return;
      }
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svg);
      const blob = new Blob([svgStr], { type: "image/svg+xml" });
      link.href = URL.createObjectURL(blob);
      link.download = "qr-code.svg";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // <div className="min-h-screen ">
    //   {/* Header */}
    //   {/* Top Header */}
    //   <div className="flex items-center justify-between sticky top-0 bg-white px-6 py-4 border-b border-gray-200 z-30 shadow-sm">
    //     <button
    //       onClick={props.closeQr}
    //       className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
    //       title="Back to Courses"
    //     >
    //       <ArrowLeft className="w-6 h-6 text-red-700" />
    //       <span className="font-medium text-red-700 hover:underline">
    //         Back to All QrCodes
    //       </span>
    //     </button>
    //   </div>
    //   {/* <div className="mb-6">
    //     <button
    //       className="text-2xl font-semibold text-black flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
    //       onClick={props.closeQr}
    //     >
    //       {"<-"} Back to QR Codes
    //     </button>

    //   </div> */}


    //   {/* Main Layout */}
    //   <div className="bg-white p-6 gap-6  m-6">
    //     <h2 className="text-3xl font-bold mb-2 pb-2">Create QR Code</h2>
    //     <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 pb-3">
    //       <span className={`font-medium text-gray ${selectHead == '1' ? "bg-black text-white rounded-xl p-1 w-30 text-center" : ''}`}>1. Choose Type</span>
    //       <span className="mx-2">›</span>
    //       <span className={`font-medium text-gray ${selectHead == '2' ? "bg-black text-white rounded-xl p-1 w-30 text-center" : ''}`}>2. Add Content</span>
    //       <span className="mx-2">›</span>
    //       <span className={`font-medium text-gray ${selectHead == '3' ? "bg-black text-white rounded-xl p-1 w-40 text-center" : ''}`}>3. Design QR Code</span>
    //     </div>
    //     <div className="flex flex-col lg:flex-row gap-6">
    //       {/* Left Side */}
    //       <div className="flex-1 bg-white rounded-2xl  w-3/4">

    //         {!addCont ? <div className="bg-gray-100 p-6 rounded-xl">
    //           <h3 className="text-lg font-medium mb-4">1. Choose QR code type</h3>

    //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //             {[
    //               { label: "Link", desc: "Link to website of your choice", icon: LinkIcon, type: "link" },
    //               { label: "Digital Business Card", desc: "Link to your web card", icon: IdCard, type: "digitalCard" },
    //               { label: "vCard", desc: "Share your contact", icon: Contact, type: "vCard" },
    //               { label: "Email", desc: "Share your email address", icon: Mail, type: "email" },
    //               { label: "Call", desc: "Scan QR code to call", icon: Phone, type: "call" },
    //               { label: "SMS", desc: "Scan QR code to send SMS", icon: MessageSquare, type: "sms" },
    //               { label: "WhatsApp", desc: "Send WhatsApp Message", icon: MessageCircle, type: "whatsApp" },
    //               { label: "Text", desc: "Display text on web page", icon: FileText, type: "text" },
    //               { label: "Wi-Fi", desc: "Connect to a wireless network", icon: Wifi, type: "wifi" },
    //               { label: "Certificate", desc: "Link to your Certificate", icon: Award, type: "certificate" },
    //             ].map((item, index) => (
    //               <button
    //                 key={index}
    //                 className="bg-white p-4 rounded-sm text-left hover:border-black hover:shadow-lg transition flex items-start gap-3"
    //                 onClick={() => {
    //                   setAddCont(true);
    //                   setSelectHead("2");
    //                   setQrMode(item.type);             // store backend type
    //                 }}
    //               >
    //                 <item.icon className="w-6 h-6 text-black mt-1" />
    //                 <div>
    //                   <p className="font-medium">{item.label}</p>
    //                   <p className="text-base text-gray-500">{item.desc}</p>
    //                 </div>
    //               </button>
    //             ))}
    //           </div>

    //         </div> :
    //           !createQr && QrForm && (
    //             <QrForm
    //               content={content}
    //               setContent={setContent}
    //               onBack={() => {
    //                 setAddCont(false);
    //                 setSelectHead("1");
    //               }}
    //               onContinue={() => {
    //                 setCreateQr(true);
    //                 setSelectHead("3");
    //               }}
    //               isEditMode={!!props.editQrId}
    //             />
    //           )
    //         }
    //         {createQr && (
    //           <div className="w-full rounded-2xl p-4 space-y-6 bg-gray-100">
    //             <h3 className="text-lg font-medium mb-4">3. Create QR code</h3>

    //             {/* Pattern Section */}
    //             <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
    //               <h2 className="text-lg font-semibold">Pattern</h2>

    //               {/* Logo Patterns */}
    //               <div className="flex flex-wrap gap-3">
    //                 {Object.keys(qrLogos).map((item, i) => (
    //                   <button
    //                     key={i}
    //                     onClick={() => setQrType(item)}
    //                     className={`relative w-16 h-16 border rounded-lg flex items-center justify-center hover:border-blue-500 ${qrType === item ? "border-2 border-blue-600" : "border"
    //                       }`}
    //                   >
    //                     <img
    //                       src={qrLogos[item]}
    //                       alt={item}
    //                       className="w-14 h-14 object-contain"
    //                     />

    //                     {qrType === item && (
    //                       <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
    //                         <Check size={12} />
    //                       </span>
    //                     )}
    //                   </button>
    //                 ))}
    //               </div>

    //               {/* Colors */}
    //               <div className="flex flex-col sm:flex-row sm:gap-6 gap-4">
    //                 <ColorPickerInput label="Background Color" color={bkColor} setColor={setBkColor} />
    //                 <ColorPickerInput label="Dots Color" color={dotColor} setColor={setDotColor} />
    //               </div>
    //             </div>

    //             {/* Corner Style Section */}
    //             <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
    //               <h2 className="text-lg font-semibold">Corner Style</h2>
    //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    //                 {/* Corner Boxes */}
    //                 <div>
    //                   <p className="text-sm font-medium mb-2">Corner Boxes Style</p>
    //                   <div className="flex flex-wrap gap-3">
    //                     {shapes.map((shape, i) => (
    //                       <button
    //                         key={i}
    //                         onClick={() => setSelectedShape(shape)}
    //                         className={`relative w-14 h-14 border rounded-lg flex items-center justify-center hover:border-blue-500`}
    //                       >
    //                         <div
    //                           className={`w-10 h-10 bg-gray-300 border-4 ${shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-md" : ""
    //                             } ${selectedShape === shape ? "border-2 border-gray-800" : ""}`}
    //                         ></div>

    //                         {selectedShape === shape && (
    //                           <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
    //                             <Check size={12} />
    //                           </span>
    //                         )}
    //                       </button>
    //                     ))}
    //                   </div>
    //                   <div className="mt-3">
    //                     <ColorPickerInput label="Corner Boxes Color" color={cornerBoxColor} setColor={setCornerBoxColor} />
    //                   </div>
    //                 </div>

    //                 {/* Corner Dots */}
    //                 <div>
    //                   <p className="text-sm font-medium mb-2">Corner Dots Style</p>
    //                   <div className="flex flex-wrap gap-3">
    //                     {dotShapes.map((shape, i) => (
    //                       <button
    //                         key={i}
    //                         onClick={() => setSelectedDotShape(shape)}
    //                         className={`relative w-14 h-14 border rounded-lg flex items-center justify-center hover:border-gray-500 ${selectedDotShape === shape ? "border-2 border-gray-500" : "border-gray-300"
    //                           }`}
    //                       >
    //                         <div
    //                           className={`w-5 h-5 bg-black ${shape === "circle" ? "rounded-full" : "rounded-sm"
    //                             }`}
    //                         ></div>
    //                         {selectedDotShape === shape && (
    //                           <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
    //                             <Check size={12} />
    //                           </span>
    //                         )}
    //                       </button>
    //                     ))}
    //                   </div>
    //                   <div className="mt-3">
    //                     <ColorPickerInput label="Corner Dots Color" color={cornerDotColor} setColor={setCornerDotColor} />
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* Logo Section */}
    //             <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
    //               <h2 className="text-lg font-semibold">Add Logo</h2>
    //               <div className="flex flex-wrap gap-3 items-center">

    //                 {/* None / Remove Logo button */}
    //                 <button
    //                   onClick={() => setSelectedLogo(null)}
    //                   className={`w-12 h-12 rounded-md border flex flex-col items-center justify-center hover:shadow-md ${!selectedLogo ? "bg-gray-100" : ""
    //                     }`}
    //                 >
    //                   <span className="text-sm font-medium text-black">None</span>
    //                   <span className="text-xl font-bold text-black -mt-2">×</span>
    //                 </button>



    //                 {/* Logo buttons */}
    //                 {Object.keys(logos).map((item, i) => (
    //                   <button
    //                     key={i}
    //                     onClick={() => setSelectedLogo(logos[item])}
    //                     className={`w-12 h-12 rounded-md border flex items-center justify-center hover:shadow-md ${selectedLogo === logos[item] ? "ring-2 ring-blue-500" : ""
    //                       }`}
    //                   >
    //                     <img src={logos[item]} alt={item} className="w-6 h-6 object-contain" />
    //                   </button>
    //                 ))}
    //               </div>
    //             </div>

    //             {/* Buttons */}
    //             <div className="flex justify-center gap-4 mt-6">
    //               <button
    //                 onClick={() => {
    //                   setCreateQr(false);
    //                   setSelectHead("2");
    //                 }}
    //                 className="w-40 border border-black py-2 rounded-md hover:bg-gray-100"
    //               >
    //                 Go Back
    //               </button>
    //               <button
    //                 onClick={saveQrCodeToBackend}
    //                 className="w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800"
    //               >
    //                 {props.editQrId ? "Update QR Code" : "Save QR Code"}
    //               </button>
    //             </div>
    //           </div>
    //         )}
    //       </div>






    //       {/* Right Side - QR Code */}
    //       <div className="flex-1 ml-6 p-1 rounded-2xl flex flex-col items-center justify-center border">
    //         <h3 className="text-gray-600 mb-4 text-lg font-medium">Download QR Code</h3>

    //         <div id="QR" ref={qrRef} className="flex items-center justify-center rounded-xl bg-gray-100 mb-6">
    //           <QRCode
    //             value={qrValue || `${API_BASE}/dashboard?tab=qrcode`}
    //             size={window.innerWidth < 768 ? 250 : 350}
    //             logoImage={selectedLogo}
    //             logoHeight={60}
    //             logoWidth={60}
    //             logoOpacity={1}
    //             enableCORS={true}
    //             qrStyle={qrType}
    //             bgColor={bkColor}
    //             fgColor={dotColor}
    //             eyeColor={[{ outer: cornerBoxColor, inner: cornerDotColor }, { outer: cornerBoxColor, inner: cornerDotColor }, { outer: cornerBoxColor, inner: cornerDotColor }]}
    //             eyeRadius={[{ outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5], inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10] }, { outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5], inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10] }, { outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5], inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10] }]}
    //             renderAs="canvas"
    //           />
    //         </div>

    //         <button onClick={handleDownload} className="bg-gray-700 text-white font-medium py-2 px-6 rounded-full hover:bg-black transition">
    //           Download QR Code
    //         </button>
    //         <select
    //           value={fileType}
    //           onChange={(e) => setFileType(e.target.value)}
    //           className="mt-4 border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
    //         >
    //           <option value="png">PNG</option>
    //           <option value="svg">SVG</option>
    //           <option value="jpg">JPG</option>
    //         </select>
    //       </div>
    //     </div>

    //     <SuccessModal
    //       isOpen={isModalOpen}
    //       message={modalMessage}
    //       onClose={handleClose}
    //     />
    //     <ErrorModal
    //       isOpen={isErrorOpen}
    //       message={errorMessage}
    //       onClose={() => setIsErrorOpen(false)}
    //     />
    //   </div>
    // </div>

<div className="min-h-screen overflow-x-hidden"> {/* Prevent horizontal scroll */}
  {/* Header */}
  <div className="flex items-center justify-between sticky top-0 bg-white px-2 sm:px-6 py-3 sm:py-4 border-b border-gray-200 z-30 shadow-sm">
    <button
      onClick={props.closeQr}
      className="flex items-center gap-1 sm:gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      title="Back to Courses"
    >
      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-red-700" />
      <span className="font-medium text-red-700 hover:underline text-xs sm:text-base">
        Back to All QrCodes
      </span>
    </button>
  </div>

  {/* Main Layout */}
  <div className="bg-white p-2 sm:p-6 gap-2 sm:gap-6 m-2 sm:m-6 max-w-full overflow-x-hidden">
    <h2 className="text-xl sm:text-3xl font-bold mb-2 pb-2">Create QR Code</h2>

    {/* Step Labels */}
    <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-start text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 pb-2 sm:pb-3 gap-2 sm:gap-2">
      <span className={`font-medium ${selectHead === '1' ? "bg-black text-white rounded-xl p-1" : ''}`}>1. Choose Type</span>
      <span className="hidden lg:inline mx-1 sm:mx-2">›</span>
      <span className={`font-medium ${selectHead === '2' ? "bg-black text-white rounded-xl p-1" : ''}`}>2. Add Content</span>
      <span className="hidden lg:inline mx-1 sm:mx-2">›</span>
      <span className={`font-medium ${selectHead === '3' ? "bg-black text-white rounded-xl p-1" : ''}`}>3. Design QR Code</span>
    </div>

    {/* Content Area */}
    <div className="flex flex-col lg:flex-row gap-2 sm:gap-6 max-w-full overflow-x-hidden">
      {/* Left Side */}
      <div className="flex-1 bg-white rounded-2xl w-full lg:w-3/4 max-w-full">
        {!addCont ? (
          <div className="bg-gray-100 p-2 sm:p-6 rounded-xl max-w-full overflow-x-hidden">
            <h3 className="text-lg sm:text-xl font-medium mb-4">1. Choose QR code type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 max-w-full">
              {[
                { label: "Link", desc: "Link to website of your choice", icon: LinkIcon, type: "link" },
                { label: "Digital Business Card", desc: "Link to your web card", icon: IdCard, type: "digitalCard" },
                { label: "vCard", desc: "Share your contact", icon: Contact, type: "vCard" },
                { label: "Email", desc: "Share your email address", icon: Mail, type: "email" },
                { label: "Call", desc: "Scan QR code to call", icon: Phone, type: "call" },
                { label: "SMS", desc: "Scan QR code to send SMS", icon: MessageSquare, type: "sms" },
                { label: "WhatsApp", desc: "Send WhatsApp Message", icon: MessageCircle, type: "whatsApp" },
                { label: "Text", desc: "Display text on web page", icon: FileText, type: "text" },
                { label: "Wi-Fi", desc: "Connect to a wireless network", icon: Wifi, type: "wifi" },
                { label: "Certificate", desc: "Link to your Certificate", icon: Award, type: "certificate" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="bg-white p-2 sm:p-4 rounded-sm text-left hover:border-black hover:shadow-lg transition flex items-start gap-2 sm:gap-3 w-full"
                  onClick={() => {
                    setAddCont(true);
                    setSelectHead("2");
                    setQrMode(item.type);
                  }}
                >
                  <item.icon className="w-4 h-4 sm:w-6 sm:h-6 text-black mt-1" />
                  <div className="truncate">
                    <p className="font-medium text-sm sm:text-base truncate">{item.label}</p>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : !createQr && QrForm ? (
          <QrForm
            content={content}
            setContent={setContent}
            onBack={() => {
              setAddCont(false);
              setSelectHead("1");
            }}
            onContinue={() => {
              setCreateQr(true);
              setSelectHead("3");
            }}
            isEditMode={!!props.editQrId}
          />
        ) : null}

        {createQr && (
          <div className="w-full rounded-2xl p-2 sm:p-6 space-y-4 sm:space-y-6 bg-gray-100 max-w-full overflow-x-hidden">
            <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-4">3. Create QR code</h3>

            {/* Pattern Section */}
            <div className="bg-white shadow rounded-2xl p-2 sm:p-6 space-y-4 max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold">Pattern</h2>
              <div className="flex flex-wrap gap-1 sm:gap-3">
                {Object.keys(qrLogos).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setQrType(item)}
                    className={`relative w-10 h-10 sm:w-16 sm:h-16 border rounded-lg flex items-center justify-center hover:border-blue-500 ${qrType === item ? "border-2 border-blue-600" : "border"}`}
                  >
                    <img src={qrLogos[item]} alt={item} className="w-8 h-8 sm:w-14 sm:h-14 object-contain" />
                    {qrType === item && (
                      <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-2">
                <ColorPickerInput label="Background Color" color={bkColor} setColor={setBkColor} />
                <ColorPickerInput label="Dots Color" color={dotColor} setColor={setDotColor} />
              </div>
            </div>

            {/* Corner Style Section */}
            <div className="bg-white shadow rounded-2xl p-2 sm:p-6 space-y-4 max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold">Corner Style</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6 max-w-full">
                {/* Corner Boxes */}
                <div>
                  <p className="text-sm font-medium mb-2">Corner Boxes Style</p>
                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    {shapes.map((shape, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedShape(shape)}
                        className={`relative w-10 h-10 sm:w-14 sm:h-14 border rounded-lg flex items-center justify-center hover:border-blue-500`}
                      >
                        <div
                          className={`w-6 h-6 sm:w-10 sm:h-10 bg-gray-300 border-4 ${shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-md" : ""} ${selectedShape === shape ? "border-2 border-gray-800" : ""}`}
                        ></div>
                        {selectedShape === shape && (
                          <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                            <Check size={12} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1 sm:mt-3">
                    <ColorPickerInput label="Corner Boxes Color" color={cornerBoxColor} setColor={setCornerBoxColor} />
                  </div>
                </div>

                {/* Corner Dots */}
                <div>
                  <p className="text-sm font-medium mb-2">Corner Dots Style</p>
                  <div className="flex flex-wrap gap-1 sm:gap-3">
                    {dotShapes.map((shape, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDotShape(shape)}
                        className={`relative w-10 h-10 sm:w-14 sm:h-14 border rounded-lg flex items-center justify-center hover:border-gray-500 ${selectedDotShape === shape ? "border-2 border-gray-500" : "border-gray-300"}`}
                      >
                        <div className={`w-3 h-3 sm:w-5 sm:h-5 bg-black ${shape === "circle" ? "rounded-full" : "rounded-sm"}`}></div>
                        {selectedDotShape === shape && (
                          <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                            <Check size={12} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1 sm:mt-3">
                    <ColorPickerInput label="Corner Dots Color" color={cornerDotColor} setColor={setCornerDotColor} />
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div className="bg-white shadow rounded-2xl p-2 sm:p-6 space-y-4 max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold">Add Logo</h2>
              <div className="flex flex-wrap gap-1 sm:gap-3 items-center">
                <button
                  onClick={() => setSelectedLogo(null)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md border flex flex-col items-center justify-center hover:shadow-md ${!selectedLogo ? "bg-gray-100" : ""}`}
                >
                  <span className="text-xs sm:text-sm font-medium text-black">None</span>
                  <span className="text-lg sm:text-xl font-bold text-black -mt-1 sm:-mt-2">×</span>
                </button>
                {Object.keys(logos).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedLogo(logos[item])}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md border flex items-center justify-center hover:shadow-md ${selectedLogo === logos[item] ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <img src={logos[item]} alt={item} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 sm:mt-6 max-w-full">
              <button
                onClick={() => {
                  setCreateQr(false);
                  setSelectHead("2");
                }}
                className="w-full sm:w-40 border border-black py-2 rounded-md hover:bg-gray-100"
              >
                Go Back
              </button>
              <button
                onClick={saveQrCodeToBackend}
                className="w-full sm:w-40 bg-black text-white py-2 rounded-md hover:bg-gray-800"
              >
                {props.editQrId ? "Update QR Code" : "Save QR Code"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - QR Preview */}
      <div className="flex-1 mt-4 lg:mt-0 lg:ml-4 p-1 rounded-2xl flex flex-col items-center justify-center border max-w-full overflow-x-hidden">
        <h3 className="text-gray-600 mb-4 text-sm sm:text-lg font-medium">Download QR Code</h3>

        <div id="QR" ref={qrRef} className="flex items-center justify-center rounded-xl bg-gray-100 mb-4 sm:mb-6 max-w-full overflow-x-hidden">
          <QRCode
            value={qrValue || `${API_BASE}/dashboard?tab=qrcode`}
            size={window.innerWidth < 768 ? 220 : 350}
            logoImage={selectedLogo}
            logoHeight={50}
            logoWidth={50}
            logoOpacity={1}
            enableCORS={true}
            qrStyle={qrType}
            bgColor={bkColor}
            fgColor={dotColor}
            eyeColor={[
              { outer: cornerBoxColor, inner: cornerDotColor },
              { outer: cornerBoxColor, inner: cornerDotColor },
              { outer: cornerBoxColor, inner: cornerDotColor },
            ]}
            eyeRadius={[
              {
                outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10],
              },
              {
                outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10],
              },
              {
                outer: selectedShape === 'square' ? [0, 0, 0, 0] : selectedShape === 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                inner: selectedDotShape === 'square' ? [0, 0, 0, 0] : [10, 10, 10, 10],
              },
            ]}
            renderAs="canvas"
          />
        </div>

        <button onClick={handleDownload} className="bg-gray-700 text-white font-medium py-2 px-4 sm:px-6 rounded-full hover:bg-black transition">
          Download QR Code
        </button>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="mt-2 sm:mt-4 border rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="jpg">JPG</option>
        </select>
      </div>
    </div>

    <SuccessModal isOpen={isModalOpen} message={modalMessage} onClose={handleClose} />
    <ErrorModal isOpen={isErrorOpen} message={errorMessage} onClose={() => setIsErrorOpen(false)} />
  </div>
</div>


  );
}

export default AddQrCode;
