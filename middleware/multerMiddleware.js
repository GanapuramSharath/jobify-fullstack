import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "jobify",
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500000,
  },
});

export default upload;
