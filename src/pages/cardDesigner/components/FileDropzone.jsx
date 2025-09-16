import React, { useState, useRef } from "react";
import { CloudUpload } from "lucide-react";

const FileDropzone = ({ file, setFile, accept, multiple = false  }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // const handleFiles = (f) => {
  //   if (!f) return;
  //   setFile(f);
  // };
  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    if (multiple) {
      setFile(files);
    } else {
      setFile(files[0]);
    }
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
    // if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //   handleFiles(e.dataTransfer.files[0]);
    // }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
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
        className={`border-2 border-dashed rounded-[5px] p-4 text-center transition cursor-pointer hover:border-primary  ${
          dragActive
            ? "border-primary bg-blue-200 "
            : "border-gray-300 bg-white "
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <CloudUpload className="w-10 h-10" />
          <div className="text-sm">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-primary font-semibold  cursor-pointer"
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
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* {file && (
        <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-[5px]">
          <div className="text-sm">
            <strong>{file.name}</strong>
            <div className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        </div>
      )} */}
      {file && (
  <div className="mt-2 space-y-2">
    {multiple
      ? Array.from(file).map((f, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-50 p-2 rounded-[5px]"
          >
            <div className="text-sm">
              <strong>{f.name}</strong>
              <div className="text-xs text-gray-500">
                {(f.size / 1024).toFixed(1)} KB
              </div>
            </div>
          </div>
        ))
      : (
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-[5px]">
            <div className="text-sm">
              <strong>{file.name}</strong>
              <div className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          </div>
        )}
  </div>
)}

    </div>
  );
};

export default FileDropzone;

