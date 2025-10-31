import React from "react";
import PropTypes from "prop-types";

/**
 * ShareLink Component
 * Displays a clickable shareable download link after the file is uploaded.
 * Props:
 * - link: string containing the download URL
 */
const ShareLink = ({ link }) => {
  if (!link) return null; // Hide if no link is available

  return (
    <div className="mt-4 text-sm break-all">
      <p className="text-gray-500 mb-1">Share this link:</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-words hover:text-blue-800"
      >
        {link}
      </a>
    </div>
  );
};

ShareLink.propTypes = {
  link: PropTypes.string,
};

export default ShareLink;
