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

const MAX_DIGITS_AFTER_DOT = 8;

const cutDecimals = (value: string) => {
  const [, decimals] = value.split('.');

  if (decimals && decimals.length > MAX_DIGITS_AFTER_DOT) {
    return value.slice(0, -1);
  }

  return value;
};

export const normalizeAmount = (value: string): string => {
  // only numbers and dot
  const normilized = value.replace(',', '.').replace(/[^0-9.]/g, '');

  return cutDecimals(normilized);
};
