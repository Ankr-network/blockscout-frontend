import { InputProps } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { ECurrency } from 'modules/payments/types';
import { getRequestsByUSDAmount } from 'modules/payments/utils/getRequestsByUSDAmount';
import { useUSDAmountByCryptoAmount } from 'modules/payments/hooks/useUSDAmountByCryptoAmount';

import { ANKR_PROMO_EXTRA_REQUESTS_RATE } from '../const';
import { IAmountInputProps } from '../AmountInput';
import { formatAmountRawValue } from '../utils/formatAmountRawValue';
import { useInputError } from './useInputError';
import { useInputValue } from './useInputValue';

export interface IUseAmountInputProps {
  amount: number;
  currency: ECurrency;
  handleCurrencyChange: (currency: ECurrency) => void;
  handleSetAmount: (amount: number) => void;
  minAmount: number;
}

export const useAmountInput = ({
  amount,
  currency,
  handleCurrencyChange,
  handleSetAmount,
  minAmount,
}: IUseAmountInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    error,
    validateAmount,
    resetError: resetInputError,
  } = useInputError({ minAmount });

  const { isLoading, amountUsd } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });

  const requests = useMemo(() => {
    const extraRequestsRate =
      currency === ECurrency.ANKR ? ANKR_PROMO_EXTRA_REQUESTS_RATE : 1;

    return getRequestsByUSDAmount(amountUsd, extraRequestsRate);
  }, [amountUsd, currency]);

  const { rawValue, setRawValue, value } = useInputValue({
    amount,
    amountUsd,
    currency,
    isFocused,
  });

  const onFocus = useCallback(() => setIsFocused(true), []);

  const onBlur = useCallback(() => setIsFocused(false), []);

  const onChange = useCallback<Required<InputProps>['onChange']>(
    event => {
      const nextAmount = event.target.value;

      const formattedAmount = formatAmountRawValue({
        amount: nextAmount,
        currency,
      });

      setRawValue(formattedAmount);

      const errorMessage = validateAmount(formattedAmount);

      if (!errorMessage) {
        handleSetAmount(Number(formattedAmount));
      }
    },
    [currency, handleSetAmount, setRawValue, validateAmount],
  );

  const amountInputProps = useMemo<IAmountInputProps>(
    () => ({
      currency,
      error,
      handleCurrencyChange,
      isFocused,
      onBlur,
      onChange,
      onFocus,
      rawValue,
      requests,
      value,
    }),
    [
      currency,
      error,
      handleCurrencyChange,
      isFocused,
      onBlur,
      onChange,
      onFocus,
      rawValue,
      requests,
      value,
    ],
  );

  return { amountInputProps, isLoading, resetInputError };
};
