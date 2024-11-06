import { TNotificationID } from '../types';
import { getSeenNotificationsFromLocalStorage } from './getSeenNotificationsFromLocalStorage';

export const checkSeenNotificationInLocalStorage = (id: TNotificationID) =>
  getSeenNotificationsFromLocalStorage().includes(id);
