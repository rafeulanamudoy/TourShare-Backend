import { Request, Response } from "express";

import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import config from "../../../config";
import { UserService } from "./users.service";
import { IRefreshTokenResponse } from "./users.interface";

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

export const UserController = {
  loginUser,
  refreshToken,
};
