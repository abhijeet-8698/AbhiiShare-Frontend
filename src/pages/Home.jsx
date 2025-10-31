import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import ProgressBar from "../components/ProgressBar";
import ShareLink from "../components/ShareLink";

export default function Home() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [link, setLink] = useState("");

  const handleUpload = () => {
    if (!file) return alert("Please select a file");
    // Simulate upload
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setLink(`https://abhii-share.com/download/${file.name}`);
      }
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">AbhiiShare</h1>
        <p className="text-gray-500 mb-6">Send files quickly — free & secure</p>

        <UploadBox setFile={setFile} />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Upload File
        </button>

        <ProgressBar progress={progress} />
        <ShareLink link={link} />
      </div>
    </div>
  );
}
