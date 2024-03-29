import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

const MIN_AMOUNT = 0;

export const validateAmount = (amount: string) => {
  if (!amount) {
    return t('validation.required');
  }

  const amountNumber = new BigNumber(amount);

  if (amountNumber.isNaN()) {
    return t('validation.number-only');
  }

  if (amountNumber.isLessThan(MIN_AMOUNT)) {
    return t('validation.min-greater', { value: MIN_AMOUNT });
  }

  return undefined;
};
