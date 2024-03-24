import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import config from "../../../config";
import { UserService } from "./users.service";
import { IRefreshTokenResponse, IUser } from "./users.interface";

import {
  setUserfunction,
  updateUserFunction,
} from "../../../utilities/cloudenrayUpload";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userBody = await setUserfunction(req);

  // Check if userBody is undefined
  if (userBody === undefined) {
    // Handle the case where setUserfunction returns undefined
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Error creating user: user data is undefined",
      data: null,
    });
    return;
  }

  const result = await UserService.createUser(userBody);

  if (result !== null) {
    const { password, ...others } = result;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `${others.role} Account created successfully`,
      data: others,
    });
  }
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  console.log(loginData, "check login data");
  const result = await UserService.loginUser(loginData);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  if (result !== null) {
    const { refreshToken, ...others } = result;

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: others,
    });
  }
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log("my cookies", req.cookies);
  const result = await UserService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "New access token generated successfully !",
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = await updateUserFunction(req, id);
  //  console.log(updateData, "i am from user controller");

  const result = await UserService.updateSingleUser(id, updateData);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "User updated successfully",
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "User deleted  successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  updateSingleUser,
  deleteSingleUser,
};
