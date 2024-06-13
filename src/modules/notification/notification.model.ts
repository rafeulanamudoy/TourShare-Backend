import { Schema, model } from "mongoose";
import { INotification } from "./notification.interface";
import { NotificationStatus, NotificationType } from "./notification.const";
import { ENUM_NOTIFICATION_STATUS } from "../../enums/NotificationStatus";

const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: NotificationType,
    },
    status: {
      type: String,
      enum: NotificationStatus,
      default: ENUM_NOTIFICATION_STATUS.UNSEEN,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<INotification>(
  "notification",
  NotificationSchema
);
