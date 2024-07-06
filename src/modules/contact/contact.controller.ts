import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { IContact } from "./contact.interface";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const crateContact = req.body;

  const result = await ContactService.createContact(crateContact);

  sendResponse<IContact>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "create  contact successfully",
    data: result,
  });
});
const getContacts = catchAsync(async (req: Request, res: Response) => {
  const messages = await ContactService.getContacts();

  sendResponse<IContact[]>(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: "contacts get   successfully",
    data: messages,
  });
});
export const ContactController = {
  createContact,
  getContacts,
};
