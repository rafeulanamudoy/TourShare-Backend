import mongoose from "mongoose";
import { StringValidation } from "zod";

export type IMessage = {
  sender: string;

  recipient: string;

  message: string;
};
