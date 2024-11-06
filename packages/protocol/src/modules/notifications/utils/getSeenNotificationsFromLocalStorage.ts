import { SEEN_NOTIFICATIONS_KEY } from '../const';
import { TSeenNotificationsInLocalStorage } from '../types';

export const getSeenNotificationsFromLocalStorage = () => {
  const notificationsString = localStorage.getItem(SEEN_NOTIFICATIONS_KEY);

  if (notificationsString) {
    return JSON.parse(notificationsString) as TSeenNotificationsInLocalStorage;
  }

  return [];
};
