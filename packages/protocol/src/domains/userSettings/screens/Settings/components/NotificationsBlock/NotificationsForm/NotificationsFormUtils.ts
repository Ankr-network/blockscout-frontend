import { INotificationsChannelConfig } from 'multirpc-sdk';

import {
  NotificationsFormFields,
  NotificationsFormData,
} from './NotificationsFormTypes';

export const initialValues = {
  [NotificationsFormFields.balance]: false,
  [NotificationsFormFields.marketing]: false,
};

const CREDIT_INFO_THRESHOLD = 100_000_000;
const CREDIT_WARN_THRESHOLD = 50_000_000;
const CREDIT_ALARM_THRESHOLD = 10_000_000;

export const getInitialValues = (settings: INotificationsChannelConfig) => {
  if (!settings) return initialValues;

  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    credit_alarm,
    credit_info,
    credit_warn,
    deposit,
    low_balance,
    marketing,
  } = settings;
  /* eslint-disable @typescript-eslint/naming-convention */

  return {
    [NotificationsFormFields.balance]: deposit,
    [NotificationsFormFields.marketing]: marketing,
    [NotificationsFormFields.lowBalance]: low_balance,
    [NotificationsFormFields.lowCreditsInfo]: credit_info,
    [NotificationsFormFields.lowCreditsWarn]: credit_warn,
    [NotificationsFormFields.lowCreditsAlarm]: credit_alarm,
  };
};

export const prepareValuesForRequest = (
  values: NotificationsFormData,
): INotificationsChannelConfig => {
  const data: INotificationsChannelConfig = {};

  const {
    balance,
    lowBalance,
    lowCreditsAlarm,
    lowCreditsInfo,
    lowCreditsWarn,
    marketing,
  } = values;

  // marketing
  data.marketing = marketing;

  // balance
  data.deposit = balance;
  data.withdraw = balance;
  data.voucher = balance;

  // low balance
  data.low_balance = lowBalance;
  data.credit_info = lowCreditsInfo;
  data.credit_warn = lowCreditsWarn;
  data.credit_alarm = lowCreditsAlarm;

  if (lowCreditsInfo) {
    data.credit_info_threshold = { value: CREDIT_INFO_THRESHOLD };
  }

  if (lowCreditsWarn) {
    data.credit_warn_threshold = { value: CREDIT_WARN_THRESHOLD };
  }

  if (lowCreditsAlarm) {
    data.credit_alarm_threshold = { value: CREDIT_ALARM_THRESHOLD };
  }

  return data;
};
