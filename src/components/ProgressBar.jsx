import React from "react";
import PropTypes from "prop-types";

/**
 * ProgressBar Component (Production Ready)
 * Displays upload progress with filename tooltip and smooth animation.
 *
 * Props:
 * - progress: number (0–100)
 * - fileName: string (optional)
 */
const ProgressBar = ({ progress, fileName }) => {
  if (progress <= 0) return null;

  return (
    <div className="relative mt-3 w-full bg-gray-200 rounded-full h-3 group overflow-hidden">
      {/* Animated Progress Fill */}
      <div
        className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
          progress < 100 ? "bg-blue-500" : "bg-green-500"
        }`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>

      {/* Tooltip */}
      <div className="absolute inset-0 flex justify-center -top-7">
        <span
          className="text-xs bg-gray-900 text-white px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate max-w-[90%] overflow-hidden"
          title={`${fileName ? `${fileName}: ${progress}%` : `${progress}%`}`}
        >
          {fileName ? `${fileName} — ${progress}%` : `${progress}%`}
        </span>
      </div>

      {/* Subtle percentage label inside bar */}
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white font-medium">
        {progress}%
      </span>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  fileName: PropTypes.string,
};

export default ProgressBar;
