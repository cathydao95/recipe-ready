import multer from "multer";

// Configure multer to use memory storage to upload directly to cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
