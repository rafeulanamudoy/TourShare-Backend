import {
  INotificationStatus,
  INotificationType,
} from "./notification.interface";

export const NotificationType: INotificationType[] = [
  "privateMessage",
  "joinTeam",
  "createTeam",
];

export const NotificationStatus: INotificationStatus[] = ["seen", "unseen"];
