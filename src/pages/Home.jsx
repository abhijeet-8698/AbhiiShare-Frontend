import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import ShareLink from "../components/ShareLink";
import { uploadFiles } from "../utils/api";
import toast from "react-hot-toast";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [linkMap, setLinkMap] = useState({});
  const [toEmail, setToEmail] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [title, setTitle] = useState("");

  const handleTransfer = async () => {
    if (files.length === 0)
      return toast.error("📁 Please select files or a folder!", { duration: 3000 });
    if (!toEmail || !fromEmail)
      return toast.error("📧 Please enter both emails!", { duration: 3000 });

    try {
      const initialProgress = {};
      files.forEach((file) => (initialProgress[file.name] = 0));
      setProgressMap(initialProgress);

      const urls = await uploadFiles(files, (fileName, prog) => {
        setProgressMap((prev) => ({ ...prev, [fileName]: prog }));
      });

      const newLinkMap = {};
      files.forEach((file, i) => {
        newLinkMap[file.name] = urls[i];
        setProgressMap((prev) => ({ ...prev, [file.name]: 100 }));
      });
      setLinkMap(newLinkMap);

      toast.success("✅ Files uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ File upload failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center flex flex-col max-h-[90vh]">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">AbhiiShare</h1>
        <p className="text-gray-500 mb-6">
          Upload files/folders and share them via AbhiiShare.
        </p>

        <UploadBox setFile={setFiles} multiple folder />

        <div className="flex flex-col gap-3 mb-4">
          <input
            type="email"
            placeholder="Recipient Email (To)"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleTransfer}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors w-full mb-4 border border-black"
        >
          Transfer
        </button>

        {/* Scrollable area with fixed height */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl shadow-inner p-3 text-left scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {files.map((file) => (
            <div key={file.name} className="mb-4 flex items-center gap-3">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded text-sm text-gray-600">
                  {file.type.split("/")[0]}
                </div>
              )}

              <div className="flex-1">
                <p className="text-gray-700 text-sm truncate">{file.name}</p>
                <ProgressBar progress={progressMap[file.name] || 0} fileName={file.name} />
                <ShareLink link={linkMap[file.name]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
