import React from "react";

export default function ProgressBar({ progress }) {
  if (progress === 0) return null;
  return (
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
