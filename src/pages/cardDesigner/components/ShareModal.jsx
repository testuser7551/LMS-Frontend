import React, { useState } from "react";
import { X, Share2, Copy, Mail, Twitter, QrCode, Linkedin } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
// import { encryptId } from "../../../components/encrypt.js";
import {showToast} from "../../../components/toast.js";

function ShareModal({ card, onClose }) {

    if (!card) return null;

    const [showQr, setShowQr] = useState(false);
    const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // const encryptedId = encryptId(card.id);
    // const shareUrl = `${window.location.origin}/cardview?id=${encryptedId}`;
    const shareUrl = `${window.location.origin}/cardview?id=${card.id}`;


    // Copy link
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            showToast("Link Copied", "top-center", 10000, "dark");
        } catch (err) {
            console.error("Clipboard error:", err);
            const textArea = document.createElement("textarea");
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
    };

    // Social Shares
    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
            "_blank"
        );
    };

    const handleLinkedinShare = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
            )}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // WhatsApp send
    const handleWhatsAppSend = () => {
        if (!inputValue) return;
        const message = `Check this card: ${shareUrl}`;
        window.open(
            `https://wa.me/${inputValue}?text=${encodeURIComponent(message)}`,
            "_blank"
        );
        setShowWhatsAppInput(false);
        setInputValue("");
    };

    // Email send
    const handleEmailSend = () => {
        if (!inputValue) return;
        const subject = "Check this card";
        const body = `Here is the card link: ${shareUrl}`;
        window.open(
            `mailto:${inputValue}?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(body)}`,
            "_blank"
        );
        setShowEmailInput(false);
        setInputValue("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
                >
                    <X size={20} />
                </button>

                <h3 className="text-lg font-semibold mb-4">
                    {`Share ${card.about?.basicdetails?.name || card.name}'s Card`}
                </h3>

                {/* Share URL + Copy */}
                <div className="flex flex-row justify-between pb-5 items-center">
                    <p className="text-sm text-gray-500 break-all">{shareUrl}</p>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-800 cursor-pointer"
                    >
                        <Copy size={16} />
                    </button>
                </div>

                {/* Share Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => {
                            setShowWhatsAppInput(true);
                            setShowEmailInput(false);
                            setShowQr(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    >
                        <Share2 size={16} /> WhatsApp
                    </button>
                    <button
                        onClick={handleTwitterShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                        <Twitter size={16} /> Twitter
                    </button>
                    <button
                        onClick={handleLinkedinShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                        <Linkedin size={16} /> LinkedIn
                    </button>
                    <button
                        onClick={() => {
                            setShowEmailInput(true);
                            setShowWhatsAppInput(false);
                            setShowQr(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                        <Mail size={16} /> Email
                    </button>
                    <button
                        onClick={() => {
                            setShowQr(true)
                            setShowEmailInput(false);
                            setShowWhatsAppInput(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary cursor-pointer"
                    >
                        <QrCode size={16} /> QR Code
                    </button>
                </div>

                {/* WhatsApp Input */}
                {showWhatsAppInput && !showEmailInput && !showQr && (
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter WhatsApp number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="border rounded-lg p-2 flex-1"
                        />
                        <button
                            onClick={handleWhatsAppSend}
                            className="bg-green-500 text-white px-3 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                )}

                {/* Email Input */}
                {showEmailInput && !showQr && !showWhatsAppInput && (
                    <div className="mt-4 flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter recipient email"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="border rounded-lg p-2 flex-1"
                        />
                        <button
                            onClick={handleEmailSend}
                            className="bg-red-500 text-white px-3 rounded-lg"
                        >
                            Send
                        </button>
                    </div>
                )}

                {/* QR Code */}
                {showQr && (
                    <div className="mt-6 flex flex-col items-center">
                        <QRCodeCanvas id="qrCanvas" value={shareUrl} size={180} />
                        <button
                            onClick={() => {
                                const canvas = document.getElementById("qrCanvas");
                                const pngUrl = canvas
                                    .toDataURL("image/png")
                                    .replace("image/png", "image/octet-stream");
                                const downloadLink = document.createElement("a");
                                downloadLink.href = pngUrl;
                                downloadLink.download = "card-qr.png";
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }}
                            className="mt-3 text-sm text-gray-500 underline hover:text-black"
                        >
                            Download QR
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export { ShareModal };
