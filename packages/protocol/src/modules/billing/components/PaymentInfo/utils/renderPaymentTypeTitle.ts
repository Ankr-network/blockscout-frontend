import { tHTML } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';

import { paymentTypeTitlesMap } from '../const';

export const renderPaymentTypeTitle = (paymentType: EPaymentType) =>
  tHTML(paymentTypeTitlesMap[paymentType]);
