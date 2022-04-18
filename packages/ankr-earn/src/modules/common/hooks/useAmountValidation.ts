import BigNumber from 'bignumber.js';
import { ReactText, useCallback } from 'react';

import { t } from 'modules/i18n/utils/intl';

import { ZERO } from '../const';

export type TUseValidateAmount = (value?: ReactText) => string | undefined;

export const useValidateAmount = (
  balance = ZERO,
  maxAmount = balance,
  minAmount = ZERO,
): TUseValidateAmount =>
  useCallback(
    (value?: ReactText) => {
      if (!value) {
        return t('validation.required');
      }

      const currentAmount = new BigNumber(value);

      if (currentAmount.isNaN()) {
        return t('validation.number-only');
      }

      if (currentAmount.isLessThan(minAmount) || currentAmount.isZero()) {
        return t('validation.min', {
          value: minAmount.toFormat(),
        });
      }

      const withBalance = !!balance;
      const isZeroBalance = withBalance && balance?.isEqualTo(0);
      const isGraterThanBalance =
        withBalance && currentAmount.isGreaterThan(balance);

      if (isZeroBalance || isGraterThanBalance) {
        return t('validation.low-balance');
      }

      if (currentAmount.isGreaterThan(maxAmount)) {
        return t('validation.max', {
          value: maxAmount.toFormat(),
        });
      }

      return undefined;
    },
    [balance, maxAmount, minAmount],
  );
