import React from "react";
import PropTypes from "prop-types";

/**
 * UploadBox Component
 * A reusable file input component for selecting files.
 * Props:
 * - setFile: function to update the selected file in the parent state
 */
const UploadBox = ({ setFile }) => {
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]); // Update parent state with selected file
    }
  };

  return (
    <div>
      <label
        htmlFor="fileUpload"
        className="block mb-2 text-gray-600 font-medium"
      >
        Select a file to upload
      </label>
      <input
        type="file"
        id="fileUpload"
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 w-full hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Upload file"
      />
    </div>
  );
};

UploadBox.propTypes = {
  setFile: PropTypes.func.isRequired,
};

export default UploadBox;
