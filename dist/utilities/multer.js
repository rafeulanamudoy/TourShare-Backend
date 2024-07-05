"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const handleApiError_1 = __importDefault(require("../error/handleApiError"));
// Adjust the path accordingly
const DIR = "./uploads";
/*
Using the uploads directory for the storage configuration of the files
received by multer,
*/
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    try {
        if (file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg") {
            cb(null, true);
        }
        else {
            // reject file
            throw new handleApiError_1.default(400, "Unsupported file format");
        }
    }
    catch (error) {
        cb(error, false);
    }
};
exports.multerUpload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
});
