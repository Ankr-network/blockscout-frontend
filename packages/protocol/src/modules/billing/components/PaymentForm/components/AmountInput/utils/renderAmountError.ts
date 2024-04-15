import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

export interface IRenderAmountErrorParams {
  amount: string;
  minAmount: number;
}

export const renderAmountError = ({
  amount,
  minAmount,
}: IRenderAmountErrorParams) => {
  if (!amount) {
    return t('validation.required');
  }

  const amountNumber = new BigNumber(amount);

  if (amountNumber.isNaN()) {
    return t('validation.number-only');
  }

  if (amountNumber.isLessThan(minAmount)) {
    return t('validation.min-greater', { value: minAmount });
  }

  return undefined;
};
