/**
 * api.js
 * Handles API requests for AbhiiShare app (file uploads, etc.)
 */

const API_URL = "http://localhost:5000"; // Backend server URL

/**
 * Upload multiple files to backend
 * @param {File[]} files - array of File objects
 * @param {function} onProgress - optional callback to report progress per file
 * @returns {Promise<string[]>} - returns array of pre-signed URLs
 */
export const uploadFiles = async (files, onProgress) => {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

    // Optionally report progress
    if (onProgress) {
      files.forEach((file, i) => {
        onProgress(file.name, 100); // all done after backend responds
      });
    }

    return data.urls; // array of pre-signed URLs
  } catch (err) {
    console.error("API upload error:", err);
    throw err;
  }
};
