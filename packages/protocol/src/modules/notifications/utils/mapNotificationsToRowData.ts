import { INotificationItem } from 'multirpc-sdk';

import { INotificationProps } from '../types';

export const mapNotificationsToRowData = (
  notification: INotificationItem,
  index: number,
): INotificationProps => {
  return {
    id: notification.id,
    category: notification.category,
    title: notification.title,
    text: notification.message,
    date: notification.createdAt,
    index,
    isUnread: !notification.seen,
  };
};
