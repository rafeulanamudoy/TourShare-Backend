import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import config from "../../../config";
import { UserService } from "./users.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
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

export const UserController = {
  loginUser,
};
