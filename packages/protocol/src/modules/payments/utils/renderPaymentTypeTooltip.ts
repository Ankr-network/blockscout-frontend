import { t } from '@ankr.com/common';

import { EPaymentType } from '../types';
import { paymentTypeTooltipsMap } from '../const';

export const renderPaymentTypeTooltip = (paymentType: EPaymentType) =>
  t(paymentTypeTooltipsMap[paymentType]);
