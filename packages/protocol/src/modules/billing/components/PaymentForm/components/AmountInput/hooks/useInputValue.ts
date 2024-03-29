import { useMemo, useState } from 'react';

import { ECurrency } from 'modules/billing/types';

import { renderInputValue } from '../utils/renderInputValue';

export interface IUseInputValue {
  amount: number;
  currency: ECurrency;
  isFocused: boolean;
  amountUsd: number;
}

export const useInputValue = ({
  amount,
  currency,
  isFocused,
  amountUsd,
}: IUseInputValue) => {
  const [rawValue, setRawValue] = useState('');

  const value = useMemo(() => {
    if (isFocused) {
      return amount.toString();
    }

    return renderInputValue({ amount, currency, amountUsd });
  }, [amount, currency, isFocused, amountUsd]);

  return { rawValue, setRawValue, value };
};
