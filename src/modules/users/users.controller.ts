import { Request, Response } from "express";
import { UserService } from "./users.service";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await UserService.createUser(user);

  if (result !== null) {
    const { password, ...others } = result;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,

      message: "User created successfully",
      data: others,
    });
  }
});

export const UserController = {
  createUser,
};
