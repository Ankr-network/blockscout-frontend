import { INotificationsSettings } from 'multirpc-sdk';

export enum NotificationsFormFields {
  balance = 'balance',
  marketing = 'marketing',
}

export interface NotificationsFormData {
  [NotificationsFormFields.balance]: boolean;
  [NotificationsFormFields.marketing]: boolean;
}

export interface INotificationsFormProps {
  settings: INotificationsSettings;
}
