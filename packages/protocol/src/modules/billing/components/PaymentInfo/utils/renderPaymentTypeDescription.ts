import { t } from '@ankr.com/common';

import { EPaymentType } from 'modules/billing/types';
import { paymentTypeDescriptionsMap } from 'modules/billing/const';

export const renderPaymentTypeDescription = (paymentType: EPaymentType) =>
  t(paymentTypeDescriptionsMap[paymentType]);
