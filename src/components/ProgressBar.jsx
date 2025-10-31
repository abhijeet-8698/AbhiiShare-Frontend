import React from "react";
import PropTypes from "prop-types";

/**
 * ProgressBar Component
 * Displays a horizontal progress bar with tooltip for current progress percentage.
 *
 * Props:
 * - progress: number (0-100) indicating the current upload progress
 * - fileName: string (optional) to show in tooltip
 */
const ProgressBar = ({ progress, fileName }) => {
  if (progress <= 0) return null;

  return (
    <div className="relative mt-2 w-full bg-gray-200 rounded-full h-4 group">
      {/* Progress fill */}
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>

      {/* Tooltip */}
      <span
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap truncate max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title={`${fileName ? `${fileName}: ${progress}%` : `${progress}%`}`}
      >
        {fileName ? `${fileName}: ${progress}%` : `${progress}%`}
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  fileName: PropTypes.string,
};

export default ProgressBar;