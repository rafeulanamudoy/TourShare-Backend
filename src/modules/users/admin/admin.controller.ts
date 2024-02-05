import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "../shared/users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
  UploadsResponse,
  cloudinaryUploads,
} from "../../../utilities/cloudinary";

const createUser = catchAsync(async (req: Request, res: Response) => {
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
    console.log(cloudinaryResponse, "cloudenray response");
  }

  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    profileImage,
  };

  //console.log(req.body, "from  controller");

  //console.log(req.body, "body");
  //console.log(req.file, "file");
  const result = await UserService.createUser(user);

  if (result !== null) {
    const { password, ...others } = result;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Admin Account created successfully",
      data: others,
    });
  }
});

export const AdminController = {
  createUser,
};
