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
      let error: string | undefined;
      const withBalance = !!balance;

      if (!value) {
        error = t('validation.required');
      } else {
        const currentAmount = new BigNumber(value);
        const isZeroBalance = withBalance && balance?.isEqualTo(0);
        const isTooBigAmount =
          withBalance && currentAmount.isGreaterThan(maxAmount);

        if (currentAmount.isNaN()) {
          error = t('validation.number-only');
        } else if (currentAmount.isLessThan(minAmount)) {
          error = t('validation.min', {
            value: minAmount.toFormat(),
          });
        } else if (isTooBigAmount || isZeroBalance) {
          error = t('validation.low-balance');
        }
      }

      return error;
    },
    [balance, maxAmount, minAmount],
  );
