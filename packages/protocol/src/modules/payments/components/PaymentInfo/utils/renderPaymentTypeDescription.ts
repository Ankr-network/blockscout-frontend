import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { EPaymentType } from 'modules/payments/types';
import { paymentTypeDescriptionsMap } from 'modules/payments/const';

interface IRenderPaymentTypeDescriptionParams {
  paymentType: EPaymentType;
  currentAmount?: number;
  newAmount?: number;
  reqs?: number;
}

export const renderPaymentTypeDescription = ({
  currentAmount,
  newAmount,
  paymentType,
  reqs,
}: IRenderPaymentTypeDescriptionParams) =>
  t(paymentTypeDescriptionsMap[paymentType], {
    currentAmount: currentAmount
      ? new BigNumber(currentAmount).toFormat()
      : undefined,
    newAmount: newAmount ? new BigNumber(newAmount).toFormat() : undefined,
    reqs,
  });
