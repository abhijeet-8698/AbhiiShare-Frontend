import React, { useRef, useState } from "react";

/**
 * UploadBox Component
 * Handles drag & drop or click to select multiple files/folders.
 */
export default function UploadBox({ setFile }) {
  const fileInputRef = useRef();
  const folderInputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleFiles = (filesList) => {
    const arr = Array.from(filesList);
    setFile(arr);
    setSelectedCount(arr.length);
    setIsDragging(false);
  };

  return (
    <div className="mb-4">
      {/* Drag & Drop Area */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors text-center
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
      >
        <p className="text-gray-500">
          {selectedCount > 0
            ? `${selectedCount} file(s) selected`
            : "Drag & Drop files here or click below"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Files
        </button>
        <button
          onClick={() => folderInputRef.current.click()}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Folder
        </button>
      </div>

      {/* Hidden Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        type="file"
        ref={folderInputRef}
        className="hidden"
        multiple
        webkitdirectory="true"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
