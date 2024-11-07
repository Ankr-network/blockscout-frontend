import { ENotificationCategory, INotificationItem } from 'multirpc-sdk';

import { EAdditionalNotificationsFilter, ENotificationsFilter } from '../const';

export function filterNotificationByCategory(
  notification: INotificationItem,
  activeFilter: ENotificationsFilter,
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
    return !notification.seen;
  }
}
