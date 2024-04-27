import { Request } from "express";
import multer, { Multer, FileFilterCallback } from "multer";
import ApiError from "../error/handleApiError";
// Adjust the path accordingly

const DIR = "./uploads";

/* 
Using the uploads directory for the storage configuration of the files 
received by multer,
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file, "check the file");
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  try {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      // reject file
      throw new ApiError(400, "Unsupported file format");
    }
  } catch (error: any) {
    cb(error, false);
  }
};

export const multerUpload: Multer = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});
