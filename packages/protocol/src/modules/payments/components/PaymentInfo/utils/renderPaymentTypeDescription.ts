import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/payments/types';
import { paymentTypeDescriptionsMap } from 'modules/payments/const';

export const renderPaymentTypeDescription = (paymentType: EPaymentType) =>
  t(paymentTypeDescriptionsMap[paymentType]);
