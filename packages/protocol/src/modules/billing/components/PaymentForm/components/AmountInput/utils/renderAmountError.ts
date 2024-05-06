import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

export interface IRenderAmountErrorParams {
  amount: string;
  minAmount: number;
  isInteger?: boolean;
}

export const renderAmountError = ({
  amount,
  minAmount,
  isInteger,
}: IRenderAmountErrorParams) => {
  if (!amount) {
    return t('validation.required');
  }

  const amountNumber = new BigNumber(amount);

  if (isInteger && !amountNumber.isInteger()) {
    return t('validation.integer-only');
  }

  if (amountNumber.isNaN()) {
    return t('validation.number-only');
  }

  if (amountNumber.isLessThan(minAmount)) {
    return t('validation.min-greater', { value: minAmount });
  }

  return undefined;
};
