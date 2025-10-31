/**
 * api.js
 * Handles API requests for AbhiiShare app (file uploads to AWS S3 via backend)
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

  const uploadedUrls = [];

  // Upload each file separately to track progress
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed for ${file.name}`);
      }

      const data = await response.json();

      // data.url should be the pre-signed S3 URL for this file
      uploadedUrls.push(data.url);

      if (onProgress) {
        onProgress(file.name, 100); // mark as complete for this file
      }
    } catch (err) {
      console.error(`API upload error for ${file.name}:`, err);
      if (onProgress) onProgress(file.name, 0); // reset progress on error
      throw err;
    }
  }

  return uploadedUrls;
};
