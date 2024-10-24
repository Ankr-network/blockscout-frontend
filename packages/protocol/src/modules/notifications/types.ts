import { ENotificationCategory } from 'multirpc-sdk';

export interface INotificationProps {
  id: string;
  category: ENotificationCategory;
  title: string;
  text: string;
  date: number;
  index: number;
  isUnread?: boolean;
}
