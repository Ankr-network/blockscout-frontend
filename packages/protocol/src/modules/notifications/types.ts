import { ENotificationCategory, INotificationItem } from 'multirpc-sdk';

export interface INotificationProps {
  id: string;
  category: ENotificationCategory;
  title: string;
  text: string;
  date: number;
  index: number;
  isUnread?: boolean;
}

export type TNotificationID = INotificationItem['id'];

export type TSeenNotificationsInLocalStorage = TNotificationID[];
