import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';

export const CURRENCY = 'ANKR';

const MIN_AMOUNT = 0;

export const validateAmount = (value: string) => {
  if (!value) {
    return t('validation.required');
  }

  const currentAmount = new BigNumber(value);

  if (currentAmount.isNaN()) {
    return t('validation.number-only');
  }

  if (currentAmount.isLessThanOrEqualTo(MIN_AMOUNT)) {
    return t('validation.min', {
      value: MIN_AMOUNT,
    });
  }

  return undefined;
};

export const normalizeAmount = (value: string): string => {
  // only numbers and dot
  return value.replace(',', '.').replace(/[^0-9.]/g, '');
};
