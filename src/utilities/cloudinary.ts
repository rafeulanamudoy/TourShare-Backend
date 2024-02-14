// cloudenray.ts
import { UploadApiResponse } from "cloudinary";
import config from "../config";
import ApiError from "../error/handleApiError";

const cloudinary = require("cloudinary").v2;
const mainFolder = "tourshare";
interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface UploadsResponse {
  url: string;
  public_id: string;
}

const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: config.cloudinary.cloud_name || "",
  api_key: config.cloudinary.cloudinary_api_key || "",
  api_secret: config.cloudinary.cloudinary_api_secret || "",
};
cloudinary.config(cloudinaryConfig);

export const cloudinaryUploads = (
  file: string,
  folder: string
): Promise<UploadsResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: `${mainFolder}/${folder}`,
      },
      (error: any, result: UploadApiResponse) => {
        if (error) {
          throw new ApiError(400, error);
        } else {
          resolve({
            url: result.url,
            public_id: result.public_id,
          });
        }
      }
    );
  });
};
