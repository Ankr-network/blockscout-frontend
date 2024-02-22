import { t } from '@ankr.com/common';

import { EPaymentType } from '../types';
import { paymentTypeTitlesMap } from '../const';

export const renderPaymentTypeTitle = (paymentType: EPaymentType) =>
  t(paymentTypeTitlesMap[paymentType]);
