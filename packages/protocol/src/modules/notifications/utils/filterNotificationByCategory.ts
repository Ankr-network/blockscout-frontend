import { ENotificationCategory, INotificationItem } from 'multirpc-sdk';

import { EAdditionalNotificationsFilter, ENotificationsFilter } from '../const';
import { isUnseenBroadcastNotification } from './isUnseenBroadcastNotification';

export function filterNotificationByCategory(
  notification: INotificationItem,
  activeFilter: ENotificationsFilter,
  includeBroadcastToUnread = false,
) {
  if (
    activeFilter === EAdditionalNotificationsFilter.ALL ||
    activeFilter === ENotificationCategory.UNKNOWN
  )
    return true;

  if (activeFilter === ENotificationCategory.BILLING) {
    return notification.category === ENotificationCategory.BILLING;
  }

  if (activeFilter === ENotificationCategory.SYSTEM) {
    return notification.category === ENotificationCategory.SYSTEM;
  }

  if (activeFilter === ENotificationCategory.NEWS) {
    return notification.category === ENotificationCategory.NEWS;
  }

  if (activeFilter === EAdditionalNotificationsFilter.UNREAD) {
    if (notification.seen) {
      return (
        includeBroadcastToUnread && isUnseenBroadcastNotification(notification)
      );
    }

    return !notification.seen;
  }
}
