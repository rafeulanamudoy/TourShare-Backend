import {
  ENUM_NOTIFICATION_STATUS,
  ENUM_NOTIFICATION_TYPE,
} from "../../enums/NotificationStatus";

export type INotification = {
  recipient: string;
  sender: string;
  message: string;
  type: ENUM_NOTIFICATION_TYPE;
  status: ENUM_NOTIFICATION_STATUS;
};
export type INotificationType = "privateMessage" | "joinTeam" | "createTeam";
export type INotificationStatus = "seen" | "unseen";
