import { ENotificationCategory } from 'multirpc-sdk';

export enum EAdditionalNotificationsFilter {
  ALL = 'ALL',
  UNREAD = 'UNREAD',
}

export type ENotificationsFilter =
  | EAdditionalNotificationsFilter
  | ENotificationCategory;

export const DESKTOP_COLUMNS = '50% 25% 25%';
export const MOBILE_COLUMNS = '1fr 50px';

const SKELETON_ROWS = 5;

export const SKELETON_ROWS_ARRAY = Array.from(
  { length: SKELETON_ROWS },
  (_, index) => `item${index}`,
);

// To save information about seen broadcast notifications in the local storage,
// since broadcast notifications are always 'seen' on the back end
export const SEEN_NOTIFICATIONS_KEY = 'seenNotifications';
