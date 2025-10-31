import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * ShareLink Component
 * Displays a clickable shareable link with copy-to-clipboard feature and hover effect.
 *
 * Props:
 * - link: string containing the download URL
 */
const ShareLink = ({ link }) => {
  const [copied, setCopied] = useState(false);

  if (!link) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="mt-2 flex flex-col items-start">
      <p className="text-gray-500 text-sm mb-1">Shareable link:</p>
      <div className="flex items-center gap-2">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 break-words"
        >
          {link}
        </a>
        <button
          onClick={handleCopy}
          className={`text-white px-2 py-1 rounded text-xs ${
            copied ? "bg-green-500" : "bg-blue-500"
          } hover:bg-blue-600 transition-colors`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

ShareLink.propTypes = {
  link: PropTypes.string,
};

export default ShareLink;
