import { InputProps } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { ECurrency } from 'modules/billing/types';
import { getRequestsByUSDAmount } from 'modules/billing/utils/getRequestsByUSDAmount';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';
import { cutNonNumericSymbols } from 'modules/billing/utils/cutNonNumericSymbols';
import { replaceCommaByDot } from 'modules/billing/utils/replaceCommaByDot';
import { INTEGER_REGEX } from 'modules/common/constants/const';

import { IAmountInputProps } from '../AmountInput';
import { useInputValue } from './useInputValue';
import { useInputError } from './useInputError';

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

  const isStableCoin =
    currency === ECurrency.USDC || currency === ECurrency.USDT;

  const { error, validateAmount, resetError } = useInputError({
    minAmount,
    isInteger: isStableCoin,
  });

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

  const handleErrorAndSetAmount = useCallback(
    (inputValue: string) => {
      const errorMessage = validateAmount(inputValue);

      if (!errorMessage) {
        handleSetAmount(Number(inputValue));
      }
    },
    [handleSetAmount, validateAmount],
  );

  const onFocus = useCallback(() => {
    if (rawValue) {
      handleErrorAndSetAmount(rawValue);
    }

    setIsFocused(true);
  }, [handleErrorAndSetAmount, rawValue]);

  const onBlur = useCallback(() => setIsFocused(false), []);

  const onChange = useCallback<Required<InputProps>['onChange']>(
    event => {
      const nextAmount = event.target.value;

      if (nextAmount.match(INTEGER_REGEX)) {
        event.preventDefault();

        return;
      }

      const formattedAmount = cutNonNumericSymbols(
        replaceCommaByDot(nextAmount),
      );

      setRawValue(formattedAmount);

      handleErrorAndSetAmount(formattedAmount);
    },
    [handleErrorAndSetAmount, setRawValue],
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
