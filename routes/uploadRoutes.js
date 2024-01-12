import path from "path";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import asyncHandler from "../middlewares/asyncHandler.js";


const router = express.Router();



cloudinary.config({
  cloud_name: 'vickdawson',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'E-shop',
    public_id: (req, file) => new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: req.file.path,
      });
      // console.log(res)
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});




export default router;
