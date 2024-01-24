import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "../shared/users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

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
