import { ENotificationCategory, INotificationItem } from 'multirpc-sdk';

import { EMilliSeconds } from 'modules/common/constants/const';

import { EAdditionalNotificationsFilter, ENotificationsFilter } from '../const';
import { getNotificationAge } from './getNotificationAge';
import { isBroadcastNotification } from './isBroadcastNotification';

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
    return (
      !notification.seen ||
      (includeBroadcastToUnread &&
        isBroadcastNotification(notification) &&
        getNotificationAge(notification) < EMilliSeconds.Day)
    );
  }
}
