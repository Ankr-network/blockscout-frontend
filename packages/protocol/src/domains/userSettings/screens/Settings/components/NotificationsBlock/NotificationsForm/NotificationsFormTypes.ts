import { INotificationsSettings } from 'multirpc-sdk';

export enum NotificationsFormFields {
  balance = 'balance',
  marketing = 'marketing',
  lowBalance = 'lowBalance',
  lowBalance3days = 'lowBalance3days',
  lowBalance7days = 'lowBalance7days',
}

export interface NotificationsFormData {
  [NotificationsFormFields.balance]: boolean;
  [NotificationsFormFields.marketing]: boolean;
  [NotificationsFormFields.lowBalance]: boolean;
  [NotificationsFormFields.lowBalance3days]: boolean;
  [NotificationsFormFields.lowBalance7days]: boolean;
}

export interface INotificationsFormProps {
  settings: INotificationsSettings;
}
