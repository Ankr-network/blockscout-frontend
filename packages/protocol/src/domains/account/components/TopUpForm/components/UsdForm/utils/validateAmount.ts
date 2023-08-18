import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { AmountValidator } from 'domains/account/components/TopUpForm/types';
import { USD_THRESHOLD_VALUE } from 'domains/account/actions/usdTopUp/const';

export const validateAmount: AmountValidator = value => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThan(USD_THRESHOLD_VALUE)) {
    return t('validation.min', { value: USD_THRESHOLD_VALUE });
  }

  return undefined;
};
