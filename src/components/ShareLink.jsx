import React from "react";

export default function ShareLink({ link }) {
  if (!link) return null;
  return (
    <div className="mt-4 text-sm break-all">
      <p className="text-gray-500">Share this link:</p>
      <a href={link} className="text-blue-600 underline">
        {link}
      </a>
    </div>
  );
}
