import React, { useState, useEffect } from "react";

const ConformationModel = ({ onClose, onConfirm, title, content }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#000000ce]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="mb-6">
                    {content}
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md bg-black text-white hover:bg-[#ffff] hover:text-black border-1 border-black cursor-pointer"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConformationModel;
