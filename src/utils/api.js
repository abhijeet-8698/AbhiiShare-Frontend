/**
 * api.js - mock AWS upload simulation
 */
export const uploadFiles = async (files, onProgress) => {
  if (!files || files.length === 0) return [];

  const totalFiles = files.length;
  let uploadedCount = 0;

  // Simulate file upload with delay
  for (let file of files) {
    await new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress && onProgress((uploadedCount / totalFiles) * 100 + progress / totalFiles);
        if (progress >= 100) {
          clearInterval(interval);
          uploadedCount++;
          resolve();
        }
      }, 100);
    });
  }

  // Return fake URLs (these mimic S3 URLs)
  return files.map((file, i) => `https://abhiishare.s3.amazonaws.com/${file.name}`);
};
