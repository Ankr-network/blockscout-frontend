import { INotificationItem } from 'multirpc-sdk';

import { checkSeenNotificationInLocalStorage } from './checkSeenNotificationInLocalStorage';
import { isBroadcastNotification } from './isBroadcastNotification';

export interface IProvideSeenStatusForBroadcastNotificationsParams {
  areNotificationUnseenOnly?: boolean;
  notifications: INotificationItem[];
}

export const provideSeenStatusForBroadcastNotifications = ({
  areNotificationUnseenOnly,
  notifications,
}: IProvideSeenStatusForBroadcastNotificationsParams) => {
  // To filter out broadcast notifications the seen status of which
  // is saved in the local storage
  const filtered = areNotificationUnseenOnly
    ? notifications.filter(({ id }) => !checkSeenNotificationInLocalStorage(id))
    : notifications;

  // To update the seen status of notifications seen status of which
  // is saved in the local storage
  const mapped = filtered.map(notification => ({
    ...notification,
    seen: isBroadcastNotification(notification)
      ? checkSeenNotificationInLocalStorage(notification.id)
      : notification.seen,
  }));

  return mapped;
};
