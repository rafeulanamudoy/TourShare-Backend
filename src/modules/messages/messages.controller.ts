import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IMessage } from "./messages.interface";
import { MessageService } from "./messages.service";
import { Request, Response } from "express";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const createMessage = req.body;
  console.log(req.body, "create message");

  const result = await MessageService.createMessage(createMessage);

  sendResponse<IMessage>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Message create   successfully",
    data: result,
  });
});
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { senderId, recipientId } = req.query;

  const messages = await MessageService.getMessages(
    senderId as string,
    recipientId as string
  );

  sendResponse<IMessage[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "Message get   successfully",
    data: messages,
  });
});
export const MessageController = {
  createMessage,
  getMessages,
};
