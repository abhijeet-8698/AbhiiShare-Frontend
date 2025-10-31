import React from "react";
import PropTypes from "prop-types";

/**
 * ProgressBar Component
 * Displays a horizontal progress bar based on the upload progress percentage.
 * Props:
 * - progress: number (0-100) indicating the current upload progress
 */
const ProgressBar = ({ progress }) => {
  if (progress <= 0) return null; // Hide if no progress yet

  return (
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
