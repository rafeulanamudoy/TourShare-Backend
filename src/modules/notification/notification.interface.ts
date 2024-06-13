import { ENUM_NOTIFICATION_STATUS } from "../../enums/NotificationStatus";

export type INotification = {
  recipient: string;
  sender: string;
  message: string;
  type: string;
  status: ENUM_NOTIFICATION_STATUS;
};
export type INotificationType = "privateMessage" | "joinTeam" | "createTeam";
export type INotificationStatus = "seen" | "unseen";
