import { InputProps } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { ECurrency } from 'modules/billing/types';
import { getRequestsByUSDAmount } from 'modules/billing/utils/getRequestsByUSDAmount';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { IAmountInputProps } from '../AmountInput';
import { formatAmountRawValue } from '../utils/formatAmountRawValue';
import { useInputError } from './useInputError';
import { useInputValue } from './useInputValue';
import { ANKR_PROMO_EXTRA_REQUESTS_RATE } from '../const';

export interface IUseAmountInputProps {
  amount: number;
  minAmount: number;
  currency: ECurrency;
  handleSetAmount: (amount: number) => void;
  handleChangeCurrency: (currency: ECurrency) => void;
}

export interface IUseAmountInputResult extends IAmountInputProps {
  isLoading: boolean;
  resetInputError: () => void;
}

export const useAmountInput = ({
  amount,
  minAmount,
  currency,
  handleSetAmount,
  handleChangeCurrency,
}: IUseAmountInputProps): IUseAmountInputResult => {
  const [isFocused, setIsFocused] = useState(false);

  const { error, validateAmount, resetError } = useInputError({ minAmount });

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

  return {
    error,
    isFocused,
    isLoading,
    onBlur,
    onChange,
    onFocus,
    rawValue,
    requests,
    value,
    currency,
    handleChangeCurrency,
    resetInputError: resetError,
  };
};
