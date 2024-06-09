"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryDelete = exports.cloudinaryUploads = void 0;
const config_1 = __importDefault(require("../config"));
const handleApiError_1 = __importDefault(require("../error/handleApiError"));
const cloudinary = require("cloudinary").v2;
const mainFolder = "tourshare";
const cloudinaryConfig = {
    cloud_name: config_1.default.cloudinary.cloud_name || "",
    api_key: config_1.default.cloudinary.cloudinary_api_key || "",
    api_secret: config_1.default.cloudinary.cloudinary_api_secret || "",
};
cloudinary.config(cloudinaryConfig);
const cloudinaryUploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: `${mainFolder}/${folder}`,
        }, (error, result) => {
            if (error) {
                throw new handleApiError_1.default(400, error);
            }
            else {
                resolve({
                    url: result.url,
                    public_id: result.public_id,
                });
            }
        });
    });
};
exports.cloudinaryUploads = cloudinaryUploads;
const cloudinaryDelete = (id) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(id, (error, result) => {
            if (error) {
                reject(new handleApiError_1.default(400, error));
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.cloudinaryDelete = cloudinaryDelete;
