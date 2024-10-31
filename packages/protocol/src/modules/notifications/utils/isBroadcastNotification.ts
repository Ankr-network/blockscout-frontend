import { INotificationItem } from 'multirpc-sdk';

export const isBroadcastNotification = (notification: INotificationItem) =>
  !notification.address;
