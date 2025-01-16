import uploader from "../config/cloudinary.js";

const imageUploader = async (req) => {
  try {
    const file = req.files.file; // Ensure you are accessing the correct file field
    const tmp = file.tempFilePath;
    const result = await uploader.upload(
      tmp,
      { 
        folder: "PDFs",
        resource_type: "auto" // Ensure Cloudinary correctly identifies the file type
      },
      (error, result) => {
        if (error) {
          throw new Error(error);
        }
        return result;
      }
    );
    return result;
  } catch (error) {
    console.error('Error during image upload:', error);
    throw error;
  }
};

export default imageUploader;
