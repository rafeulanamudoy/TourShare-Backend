import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { INotification } from "./notification.interface";

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = req.body;
  console.log(req.body, "create message");

  const result = await NotificationService.createNotification(notification);

  sendResponse<INotification>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Notification saved    successfully",
    data: result,
  });
});
const getUserNotification = catchAsync(async (req: Request, res: Response) => {
  const { sender, status, type } = req.query;

  const messages = await NotificationService.getUserNotification(
    sender as string,
    status as string,
    type as string
  );

  sendResponse<INotification[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "user notification  get   successfully",
    data: messages,
  });
});
export const NotificationController = {
  createNotification,
  getUserNotification,
};
