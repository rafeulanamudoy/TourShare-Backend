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
export type INotificationType =
  | "privateMessage"
  | "joinTeamStatusUpdate"
  | "joinTeamRequestStatus"
  | "updateCreateTeam";
export type INotificationStatus = "seen" | "unseen";

export type NotificationCreateResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    recipient: string;
    sender: string;
    message: string;
    type: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
