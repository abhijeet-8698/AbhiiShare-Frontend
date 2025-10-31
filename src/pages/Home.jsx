import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import ShareLink from "../components/ShareLink";
import { uploadFiles } from "../utils/api";

/**
 * Home Component
 * Handles multiple file uploads with individual progress bars and shareable links.
 */
export default function Home() {
  const [files, setFiles] = useState([]); // array of selected File objects
  const [progressMap, setProgressMap] = useState({}); // { filename: progress }
  const [linkMap, setLinkMap] = useState({}); // { filename: shareable URL }

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files to upload");

    try {
      // Initialize progress for all files
      const initialProgress = {};
      files.forEach((file) => (initialProgress[file.name] = 0));
      setProgressMap(initialProgress);

      // Upload files using API utility
      const urls = await uploadFiles(files, (fileName, prog) => {
        setProgressMap((prev) => ({ ...prev, [fileName]: prog }));
      });

      // Map URLs to filenames
      const newLinkMap = {};
      files.forEach((file, i) => {
        newLinkMap[file.name] = urls[i];
        setProgressMap((prev) => ({ ...prev, [file.name]: 100 })); // mark done
      });
      setLinkMap(newLinkMap);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("File upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">AbhiiShare</h1>
        <p className="text-gray-500 mb-6">
          Upload multiple files quickly and get shareable links.
        </p>

        {/* File selection */}
        <UploadBox setFile={setFiles} multiple />

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4"
        >
          Upload Files
        </button>

        {/* Scrollable container for multiple files */}
        <div className="mt-4 max-h-96 overflow-y-auto w-full">
          {files.map((file) => (
            <div key={file.name} className="mb-6 text-left relative">
              <p className="text-gray-600 text-sm mb-1">{file.name}</p>
              <ProgressBar
                progress={progressMap[file.name] || 0}
                fileName={file.name}
              />
              <ShareLink link={linkMap[file.name]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
