import React from "react";

export default function UploadBox({ setFile }) {
  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      className="border border-gray-300 rounded p-2 w-full mb-4"
    />
  );
}
