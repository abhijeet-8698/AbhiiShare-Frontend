import React from "react";
import PropTypes from "prop-types";

/**
 * UploadBox Component
 * A reusable file input component for selecting one or multiple files.
 *
 * Props:
 * - setFile: function to update the selected file(s) in the parent state
 * - multiple: boolean to allow multiple file selection
 */
const UploadBox = ({ setFile, multiple = false }) => {
  /**
   * Handle file selection
   * @param {Event} e - file input change event
   */
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      if (multiple) {
        // Convert FileList to array if multiple files
        setFile(Array.from(e.target.files));
      } else {
        setFile(e.target.files[0]); // Single file selection
      }
    }
  };

  return (
    <div>
      <label
        htmlFor="fileUpload"
        className="block mb-2 text-gray-600 font-medium"
      >
        Select file{multiple ? "s" : ""} to upload
      </label>
      <input
        type="file"
        id="fileUpload"
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 w-full hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Upload file"
        multiple={multiple} // Enable multiple files if prop is true
      />
    </div>
  );
};

UploadBox.propTypes = {
  setFile: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default UploadBox;
