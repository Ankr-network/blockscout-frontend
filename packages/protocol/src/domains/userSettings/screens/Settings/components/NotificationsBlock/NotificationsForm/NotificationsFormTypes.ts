import {
  ENotificationChannel,
  INotificationsChannelConfig,
} from 'multirpc-sdk';

export enum NotificationsFormFields {
  channel = ENotificationChannel.EMAIL,
  balance = 'balance',
  marketing = 'marketing',
  lowBalance = 'lowBalance',
  lowCreditsInfo = 'lowCreditsInfo',
  lowCreditsWarn = 'lowCreditsWarn',
  lowCreditsAlarm = 'lowCreditsAlarm',
}

export interface NotificationsFormData {
  [NotificationsFormFields.channel]: ENotificationChannel;
  [NotificationsFormFields.balance]: boolean;
  [NotificationsFormFields.marketing]: boolean;
  [NotificationsFormFields.lowBalance]: boolean;
  [NotificationsFormFields.lowCreditsInfo]: boolean;
  [NotificationsFormFields.lowCreditsWarn]: boolean;
  [NotificationsFormFields.lowCreditsAlarm]: boolean;
}

export interface INotificationsFormProps {
  settings: INotificationsChannelConfig;
}
