import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

const MIN_AMOUNT = 0;

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const amount = new BigNumber(value);

  if (amount.isNaN()) {
    return t('validation.number-only');
  }

  if (amount.isLessThan(MIN_AMOUNT)) {
    return t('validation.min-greater', { value: MIN_AMOUNT });
  }

  return undefined;
};
