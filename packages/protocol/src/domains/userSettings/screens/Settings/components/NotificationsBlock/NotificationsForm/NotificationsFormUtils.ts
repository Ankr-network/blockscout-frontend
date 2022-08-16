import { INotificationsSettings } from 'multirpc-sdk';
import {
  NotificationsFormFields,
  NotificationsFormData,
} from './NotificationsFormTypes';

export const initialValues = {
  [NotificationsFormFields.balance]: false,
  [NotificationsFormFields.marketing]: false,
};

export const getInitialValues = (settings: INotificationsSettings) => {
  if (!settings) return initialValues;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { deposit, marketing, low_balance, balance_7days, balance_3days } =
    settings;

  return {
    [NotificationsFormFields.balance]: deposit,
    [NotificationsFormFields.marketing]: marketing,
    [NotificationsFormFields.lowBalance]: low_balance,
    [NotificationsFormFields.lowBalance3days]: balance_3days,
    [NotificationsFormFields.lowBalance7days]: balance_7days,
  };
};

export const prepareValuesForRequest = (
  values: NotificationsFormData,
): INotificationsSettings => {
  const data: INotificationsSettings = {};

  const { balance, marketing, lowBalance, lowBalance3days, lowBalance7days } =
    values;

  // marketing
  data.marketing = marketing;

  // balance
  data.deposit = balance;
  data.withdraw = balance;
  data.voucher = balance;

  // low balance
  data.low_balance = lowBalance;
  data.balance_3days = lowBalance3days;
  data.balance_7days = lowBalance7days;

  return data;
};
