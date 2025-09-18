import React, { useState, useRef } from "react";
import { CloudUpload } from "lucide-react";

export default function FileDropzone({ file, setFile, accept }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (f) => {
    if (!f) return;
    setFile(f);
  };

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div
        onDragEnter={onDrag}
        onDragOver={onDrag}
        onDragLeave={onDrag}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-[5px] p-4 text-center transition cursor-pointer hover:border-primary ${
          file
            ? "border-green-500 bg-green-100"
            : dragActive
            ? "border-primary bg-blue-200"
            : "border-gray-300 bg-white"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <CloudUpload className="w-10 h-10" />
          <div className="text-sm">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-primary font-semibold cursor-pointer"
            >
              Browse
            </button>{" "}
            or Drag & drop file here.
          </div>
          <div className="text-xs text-gray-500">
            Accepted: {accept || "any"}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files[0])}
        />
      </div>

      {file && (
        <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-[5px]">
          <div className="text-sm">
            <div>
              <strong>{typeof file === "object" ? file.name : file}</strong>
              <div className="text-xs text-gray-500">
                {typeof file === "object"
                  ? (file.size / 1024).toFixed(1) + " KB"
                  : "Size not available"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
