import {
  INotificationStatus,
  INotificationType,
} from "./notification.interface";

export const NotificationType: INotificationType[] = [
  "privateMessage",
  "joinTeamStatusUpdate",
  "joinTeamRequestStatus",
  "updateCreateTeam",
];

export const NotificationStatus: INotificationStatus[] = ["seen", "unseen"];
