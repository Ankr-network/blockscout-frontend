import { INotificationItem } from 'multirpc-sdk';

export const getNotificationAge = (notification: INotificationItem) =>
  Date.now() - notification.updatedAt;
