import { Request, Response } from "express";
import {
  UploadsResponse,
  cloudinaryDelete,
  cloudinaryUploads,
} from "./cloudinary";
import { User } from "../modules/users/shared/users.model";
import { IUser } from "../modules/users/shared/users.interface";

export const setUserfunction = async (req: Request) => {
  if (req.file) {
    const cloudinaryResponse: UploadsResponse = await cloudinaryUploads(
      req.file.path,

      "profileImage"
    );
    const user: IUser = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      profileImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      },
    };
    return user;
  }
};

export const updateUserFunction = async (req: Request, id: string) => {
  let profileImage = { url: "", public_id: "" };

  if (req.file) {
    const user = await User.findById(id);
    if (user?.profileImage.public_id) {
      // Start both deletion and upload operations concurrently
      const deletePromise = cloudinaryDelete(user?.profileImage?.public_id);
      const uploadPromise = cloudinaryUploads(req.file.path, "profileImage");

      // Wait for both deletion and upload operations to complete
      const [deleteResponse, cloudinaryResponse] = await Promise.all([
        deletePromise,
        uploadPromise,
      ]);

      console.log(
        deleteResponse,
        cloudinaryResponse,
        "to ccheck response in promise.all"
      );
      // Construct the profileImage object with the new URL and public_id
      profileImage = {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      };
    }
  }

  // Construct the updated user object with the provided data and the new profileImage
  const updatedUser = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    profileImage,
  };

  return updatedUser;
};
