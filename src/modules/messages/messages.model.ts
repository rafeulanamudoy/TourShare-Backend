import { Schema, model } from "mongoose";
import { IMessage } from "./messages.interface";
import { MessageModel } from "./messages.const";

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
      required: true,
    },

    recipient: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model("Message", messageSchema);
