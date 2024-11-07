import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { SEEN_NOTIFICATIONS_KEY } from '../const';
import { TNotificationID } from '../types';
import { getSeenNotificationsFromLocalStorage } from './getSeenNotificationsFromLocalStorage';

export const addSeenNotificationsToLocalStorage = (ids: TNotificationID[]) => {
  const seenNotifications = getSeenNotificationsFromLocalStorage();

  localStorage.setItem(
    SEEN_NOTIFICATIONS_KEY,
    JSON.stringify(getUniqueArray([...seenNotifications, ...ids])),
  );
};
