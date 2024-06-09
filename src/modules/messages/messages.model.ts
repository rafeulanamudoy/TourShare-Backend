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
// ({
//   sender: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     refPath: "senderModel",
//   },
//   senderModel: {
//     type: String,
//     required: true,
//     enum: MessageModel,
//   },
//   recipient: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     refPath: "recipientModel",
//   },
//   recipientModel: {
//     type: String,
//     required: true,
//     enum: MessageModel,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// }),
//   {
//     timestamps: true,
//   };
