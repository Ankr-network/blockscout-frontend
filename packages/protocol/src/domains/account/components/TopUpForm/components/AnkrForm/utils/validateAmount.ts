import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';

import { DEFAULT_ANKR_VALUE } from 'domains/account/actions/topUp/const';

export interface ValidateAmountParams {
  balance?: BigNumber;
  shouldValidateMinValue: boolean;
  value: string;
}

export const validateAmount = ({
  balance,
  shouldValidateMinValue,
  value,
}: ValidateAmountParams) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isZero()) {
    return t('validation.min-greater', { value: 0 });
  }

  if (shouldValidateMinValue && currentAmount.isLessThan(DEFAULT_ANKR_VALUE)) {
    return t('plan.premium-block.min', {
      value: DEFAULT_ANKR_VALUE.toFormat(),
    });
  }

  if (balance?.isLessThan(value)) {
    return t('plan.premium-block.balance');
  }

  return undefined;
};
