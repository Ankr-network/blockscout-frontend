import BigNumber from 'bignumber.js';

import { MIN_AMOUNT } from 'domains/account/actions/withdraw/const';
import { t } from 'modules/i18n/utils/intl';

export const validate = (value: string, balance: BigNumber) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (balance.isLessThanOrEqualTo(0)) {
    return t('withdraw-steps.form.balance-error');
  }

  if (currentAmount.isLessThan(MIN_AMOUNT)) {
    return t('withdraw-steps.form.min', {
      value: MIN_AMOUNT,
    });
  }

  if (
    balance.isGreaterThanOrEqualTo(MIN_AMOUNT) &&
    currentAmount.isGreaterThan(balance)
  ) {
    return t('withdraw-steps.form.excess');
  }

  if (balance.isLessThan(currentAmount)) {
    return t('withdraw-steps.form.max', {
      value: MIN_AMOUNT,
    });
  }

  return undefined;
};

export const MAX_DECIMALS = 1;
