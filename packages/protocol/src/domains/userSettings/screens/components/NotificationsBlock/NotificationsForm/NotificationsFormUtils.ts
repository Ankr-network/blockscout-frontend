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

  const { deposit, marketing } = settings;

  return {
    [NotificationsFormFields.balance]: deposit,
    [NotificationsFormFields.marketing]: marketing,
  };
};

const SHOW_BALANCE_UPDATES = false;

export const prepareValuesForRequest = (
  values: NotificationsFormData,
): INotificationsSettings => {
  const data: INotificationsSettings = {};

  const { balance, marketing } = values;

  // marketing
  data.marketing = marketing;

  // balance
  data.deposit = balance;
  data.withdraw = balance;
  data.voucher = balance;

  if (SHOW_BALANCE_UPDATES) {
    data.low_balance = balance;
    data.balance_7days = balance;
    data.balance_3days = balance;
  }

  return data;
};
