import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { ReactText, useCallback } from 'react';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { ZERO } from '../const';

export type TUseValidateAmount = (value?: ReactText) => string | undefined;

export interface IValidationMessage {
  noValue?: string;
  isNaN?: string;
  isZero?: string;
  isLessThanMinAmount?: string;
  isGreaterMax?: string;
  isLowBalance?: string;
}

interface IUseValidationAmount {
  balance?: BigNumber;
  maxAmount?: BigNumber;
  minAmount?: BigNumber;
  validationMessages?: IValidationMessage;
}

export const useValidateAmount = ({
  balance = ZERO,
  maxAmount = balance,
  minAmount = ZERO,
  validationMessages,
}: IUseValidationAmount): TUseValidateAmount => {
  const validationTexts = useLocaleMemo<IValidationMessage>(
    () => ({
      noValue: t('validation.required'),
      isNaN: t('validation.number-only'),
      isZero: t('validation.required'),
      isLessThanMinAmount: t('validation.min', { value: minAmount.toFormat() }),
      isGreaterMax: t('validation.max', { value: maxAmount.toFormat() }),
      isLowBalance: t('validation.low-balance'),
      ...validationMessages,
    }),
    [minAmount, maxAmount, validationMessages],
  );

  return useCallback(
    (value?: ReactText) => {
      if (!value) {
        return validationTexts.noValue;
      }

      const currentAmount = new BigNumber(value);

      if (currentAmount.isNaN()) {
        return validationTexts.isNaN;
      }

      if (currentAmount.isZero()) {
        return validationTexts.isZero;
      }

      if (currentAmount.isLessThan(minAmount)) {
        return validationTexts.isLessThanMinAmount;
      }

      const withBalance = !!balance;
      const isZeroBalance = withBalance && balance?.isEqualTo(0);
      const isGraterThanBalance =
        withBalance && currentAmount.isGreaterThan(balance);

      if (isZeroBalance || isGraterThanBalance) {
        return validationTexts.isLowBalance;
      }

      if (currentAmount.isGreaterThan(maxAmount)) {
        return validationTexts.isGreaterMax;
      }

      return undefined;
    },
    [balance, validationTexts, maxAmount, minAmount],
  );
};
