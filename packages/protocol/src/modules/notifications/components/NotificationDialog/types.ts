import { ENotificationCategory } from 'multirpc-sdk';

export interface ICommonNotificationData {
  category: ENotificationCategory;
  message: string;
  timestamp: number;
  title: string;
}
