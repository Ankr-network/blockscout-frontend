import { InputProps } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { ECurrency } from 'modules/billing/types';
import { getRequestsByUSDAmount } from 'modules/billing/utils/getRequestsByUSDAmount';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { cutLetters } from 'domains/account/components/TopUp/ANKRTopUpForm/AmountField/AmountFieldUtils';

import { IAmountInputProps } from '../AmountInput';
import { useInputValue } from './useInputValue';
import { useInputError } from './useInputError';

export interface IUseAmountInputProps {
  amount: number;
  currency: ECurrency;
  handleSetAmount: (amount: number) => void;
}

export interface IUseAmountInputResult extends IAmountInputProps {
  isLoading: boolean;
}

export const useAmountInput = ({
  amount,
  currency,
  handleSetAmount,
}: IUseAmountInputProps): IUseAmountInputResult => {
  const [isFocused, setIsFocused] = useState(false);
  const { error, validateAmount } = useInputError({ currency });

  const { isLoading, amountUsd } = useUSDAmountByCryptoAmount({
    amount,
    currency,
  });
  const requests = useMemo(
    () => getRequestsByUSDAmount(amountUsd),
    [amountUsd],
  );

  const { rawValue, setRawValue, value } = useInputValue({
    amount,
    currency,
    isFocused,
    amountUsd,
  });

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(() => setIsFocused(false), []);
  const onChange = useCallback<Required<InputProps>['onChange']>(
    event => {
      const nextAmount = event.target.value;

      const amountWithoutLetters = cutLetters(nextAmount);

      setRawValue(amountWithoutLetters);

      const errorMessage = validateAmount(amountWithoutLetters);

      if (!errorMessage) {
        handleSetAmount(Number(amountWithoutLetters));
      }
    },
    [handleSetAmount, setRawValue, validateAmount],
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
  };
};
