import React, { useState } from "react";
import { LinkIcon, IdCard, Contact, Mail, Phone, MessageSquare, MessageCircle, FileText, Wifi, Check } from "lucide-react";
import { QRCode } from 'react-qrcode-logo';
import facebookLogo from "/assets/images/socialmedia/faceBook.png"
import instagramLogo from "/assets/images/socialmedia/insta.png";
import linkedinLogo from "/assets/images/socialmedia/linkIn.png";
import whatsappLogo from "/assets/images/socialmedia/whatsApp.png";
import twitterLogo from "/assets/images/socialmedia/xtwit.png";
import snapchatLogo from "/assets/images/socialmedia/snap.png";
import dotLogo from "/assets/images/QrCode/qrDots.png";
import fluidLogo from "/assets/images/QrCode/qrFluid.png";
import squareLogo from "/assets/images/QrCode/qrSquare.png";
const API_BASE = import.meta.env.VITE_API_BASE;


const AddQrCode = (props) => {
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
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [qrType, setQrType] = useState("square");

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

  const handleDownload = () => {
    const qrElement = document.getElementById("QR");

    if (fileType === "png" || fileType === "jpg") {
      // canvas export
      const canvas = qrElement.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL(`image/${fileType}`);
        const link = document.createElement("a");
        link.href = image;
        link.download = `qr-code.${fileType}`;
        link.click();
      }
    } else if (fileType === "svg") {
      // svg export
      const svg = qrElement.querySelector("svg");
      if (svg) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "qr-code.svg";
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 m-6">
      {/* Header */}
      <div className="mb-6">
        <button className="text-2xl font-bold text-gray-800 flex items-center gap-2 hover:text-black" onClick={props.closeQr}>
          Back to QR Codes
        </button>
      </div>

      {/* Main Layout */}
      <div className="bg-white p-6 gap-6">
        <h2 className="text-3xl font-bold mb-2 pb-2">Create QR Code</h2>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 pb-3">
          <span className={`font-medium text-gray ${selectHead == '1' ? "bg-black text-white rounded-xl p-1 w-30 text-center" : ''}`}>1. Choose Type</span>
          <span className="mx-2">›</span>
          <span className={`font-medium text-gray ${selectHead == '2' ? "bg-black text-white rounded-xl p-1 w-30 text-center" : ''}`}>2. Add Content</span>
          <span className="mx-2">›</span>
          <span className={`font-medium text-gray ${selectHead == '3' ? "bg-black text-white rounded-xl p-1 w-40 text-center" : ''}`}>3. Design QR Code</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side */}
          <div className="flex-1 bg-white rounded-2xl  w-3/4">

            {!addCont ? <div className="bg-gray-100 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">1. Choose QR code type</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Link", desc: "Link to website of your choice", icon: LinkIcon },
                  { label: "Digital Business Card", desc: "Link to your web card", icon: IdCard },
                  { label: "vCard", desc: "Share your contact", icon: Contact },
                  { label: "Email", desc: "Share your email address", icon: Mail },
                  { label: "Call", desc: "Scan QR code to call", icon: Phone },
                  { label: "SMS", desc: "Scan QR code to send SMS", icon: MessageSquare },
                  { label: "WhatsApp", desc: "Send WhatsApp Message", icon: MessageCircle },
                  { label: "Text", desc: "Display text on web page", icon: FileText },
                  { label: "Wi-Fi", desc: "Connect to a wireless network", icon: Wifi },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="bg-white p-4 rounded-sm text-left hover:border-black hover:shadow-lg transition flex items-start gap-3"
                    onClick={()=>{setAddCont(true); setSelectHead('2');}}
                  >
                    <item.icon className="w-6 h-6 text-black mt-1" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-base text-gray-500">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div> : 
          !createQr && <div className=" mx-auto bg-gray-100 p-2 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-6">2. Add content to the link QR Code</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" placeholder="Enter your name" className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input type="url"  value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website url" className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <div className="flex justify-center gap-6">
              <button className="w-40 px-8 py-1 border border-black text-black rounded-md hover:bg-gray-100" onClick={()=> setAddCont(false)}>
                Go back
              </button>
              <button className="w-40 px-8 py-1 bg-black text-white rounded-md hover:bg-gray-800" onClick={()=> {setCreateQr(true); setSelectHead('3');}}>
                Continue
              </button>
            </div>
          </div>}
          {createQr && (
            <div className="w-full rounded-2xl p-4 space-y-6 bg-gray-100">
              <h3 className="text-lg font-medium mb-4">3. Create QR code</h3>

              {/* Pattern Section */}
              <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold">Pattern</h2>
                
                {/* Logo Patterns */}
              <div className="flex flex-wrap gap-3">
                {Object.keys(qrLogos).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setQrType(item)}
                    className={`relative w-16 h-16 border rounded-lg flex items-center justify-center hover:border-blue-500 ${
                      qrType === item ? "border-2 border-blue-600" : "border"
                    }`}
                  >
                    <img
                      src={qrLogos[item]}
                      alt={item}
                      className="w-14 h-14 object-contain"
                    />

                    {qrType === item && (
                      <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

                {/* Colors */}
                <div className="flex flex-col sm:flex-row sm:gap-6 gap-4">
                  <ColorPickerInput label="Background Color" color={bkColor} setColor={setBkColor} />
                  <ColorPickerInput label="Dots Color" color={dotColor} setColor={setDotColor} />
                </div>
              </div>

              {/* Corner Style Section */}
              <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold">Corner Style</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Corner Boxes */}
                  <div>
                    <p className="text-sm font-medium mb-2">Corner Boxes Style</p>
                    <div className="flex flex-wrap gap-3">
                      {shapes.map((shape, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedShape(shape)}
                          className={`relative w-14 h-14 border rounded-lg flex items-center justify-center hover:border-blue-500`}
                        >
                          <div
                            className={`w-10 h-10 bg-gray-300 border-4 ${
                              shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-md" : ""
                            } ${selectedShape === shape ? "border-2 border-gray-800" : ""}`}
                          ></div>

                          {selectedShape === shape && (
                            <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <ColorPickerInput label="Corner Boxes Color" color={cornerBoxColor} setColor={setCornerBoxColor} />
                    </div>
                  </div>

                  {/* Corner Dots */}
                  <div>
                    <p className="text-sm font-medium mb-2">Corner Dots Style</p>
                    <div className="flex flex-wrap gap-3">
                      {dotShapes.map((shape, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDotShape(shape)}
                          className={`relative w-14 h-14 border rounded-lg flex items-center justify-center hover:border-gray-500 ${
                            selectedDotShape === shape ? "border-2 border-gray-500" : "border-gray-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-black ${
                              shape === "circle" ? "rounded-full" : "rounded-sm"
                            }`}
                          ></div>
                          {selectedDotShape === shape && (
                            <span className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
                              <Check size={12} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <ColorPickerInput label="Corner Dots Color" color={cornerDotColor} setColor={setCornerDotColor} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Section */}
              <div className="bg-white shadow rounded-2xl p-4 md:p-6 space-y-4">
                <h2 className="text-lg font-semibold">Add Logo</h2>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(logos).map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedLogo(logos[item])}
                      className="w-12 h-12 rounded-md border flex items-center justify-center hover:shadow-md"
                    >
                      <img src={logos[item]} alt={item} className="w-6 h-6 object-contain" />
                    </button>
                  ))}

                  {/* Upload button */}
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md w-24 h-20 cursor-pointer hover:bg-gray-50">
                    <span className="text-sm text-gray-500 text-center">Upload</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> 



          


          {/* Right Side - QR Code */}
          <div className="flex-1 ml-6 p-1 rounded-2xl flex flex-col items-center justify-center border">
            <h3 className="text-gray-600 mb-4 text-lg font-medium">Download QR Code</h3>
            <div className="flex items-center justify-center rounded-xl bg-gray-100 mb-6">
              <QRCode
                value={url ? url : `${API_BASE}/dashboard?tab=qrcode`} 
                size={window.innerWidth < 768 ? 250 : 350} 
                logoImage={selectedLogo}
                logoHeight={60}
                logoWidth={60}
                logoOpacity={1}
                enableCORS={true}
                qrStyle={qrType}
                id={"QR"}
                bgColor={bkColor}
                fgColor={dotColor}
                eyeColor={[
                  {
                    outer: cornerBoxColor,
                    inner: cornerDotColor,
                  },
                  {
                    outer: cornerBoxColor,
                    inner: cornerDotColor,
                  },
                  {
                    outer: cornerBoxColor,
                    inner: cornerDotColor,
                  },
                ]}
                eyeRadius={[
                  {
                    outer: selectedShape == 'square' ? [0,0,0,0] : selectedShape == 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                    inner: selectedDotShape == 'square' ? [0,0,0,0]: [10,10,10,10],
                  },
                  {
                    outer: selectedShape == 'square' ? [0,0,0,0] : selectedShape == 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                    inner: selectedDotShape == 'square' ? [0,0,0,0]: [10,10,10,10],
                  },
                  {
                    outer: selectedShape == 'square' ? [0,0,0,0] : selectedShape == 'circle' ? [30, 30, 30, 30] : [5, 5, 5, 5],
                    inner: selectedDotShape == 'square' ? [0,0,0,0]: [10,10,10,10],
                  },
                ]}
              />
            </div>
            <button onClick={handleDownload} className="bg-gray-700 text-white font-medium py-2 px-6 rounded-full hover:bg-black transition">
              Download QR Code
            </button>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="mt-4 border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default AddQrCode;