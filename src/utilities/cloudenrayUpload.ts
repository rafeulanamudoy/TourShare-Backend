import { Request, Response } from "express";
import { UploadsResponse, cloudinaryUploads } from "./cloudinary";

export const setUserfunction = async (req: Request) => {
  let profileImage = { url: "", public_id: "" };
  if (req.file) {
    const cloudinaryResponse: UploadsResponse = await cloudinaryUploads(
      req.file.path,

      "profileImage"
    );

    profileImage = {
      url: cloudinaryResponse.url,
      public_id: cloudinaryResponse.public_id,
    };
    // console.log(cloudinaryResponse, "cloudenray response");
  }

  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    profileImage,
  };
  return user;
};

export const updateUserFunction = async (req: Request) => {
  console.log(req.body, "to check body");
  console.log(req.file, "to check file");

  let profileImage = { url: "", public_id: "" };
  if (req.file) {
    const cloudinaryResponse: UploadsResponse = await cloudinaryUploads(
      req.file.path,

      "profileImage"
    );

    profileImage = {
      url: cloudinaryResponse.url,
      public_id: cloudinaryResponse.public_id,
    };
    return {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      profileImage,
    };
    // console.log(cloudinaryResponse, "cloudenray response");
  }

  // console.log(user, "to check user from cloudenary set user function");
  return req.body;
};
