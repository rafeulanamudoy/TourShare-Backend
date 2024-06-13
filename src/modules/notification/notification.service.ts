import { ENUM_NOTIFICATION_STATUS } from "../../enums/NotificationStatus";
import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

const createNotification = async (payload: INotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getUserNotification = async (
  sender: string,
  status: string,
  type: string
) => {
  const result = await Notification.find({
    recipient: sender,
    status: status,
    type: type,
  });
  return result;
};
export const NotificationService = {
  createNotification,
  getUserNotification,
};
