// const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// cloudinary.config({
//   cloud_name: "dmxscltpu",
//   api_key: "621215583334382",
//   api_secret: "w8gjt1DKvNjGri3mHup475bJmA",
// });



// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
// });
// const storage = multer.diskStorage()

// export const upload = multer({ storage: storage });
export const upload = multer();

// module.exports = { upload, cloudinary };
