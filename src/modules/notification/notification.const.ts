import {
  INotificationStatus,
  INotificationType,
} from "./notification.interface";

export const NotificationType: INotificationType[] = [
  "privateMessage",
  "joinTeamStatusUpdate",
  "joinTeamRequestStatus",
];

export const NotificationStatus: INotificationStatus[] = ["seen", "unseen"];
