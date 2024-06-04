import { useEffect, useMemo, useState } from 'react';

import { ECurrency } from 'modules/payments/types';

import { renderInputValue } from '../utils/renderInputValue';

export interface IUseInputValue {
  amount: number;
  amountUsd: number;
  currency: ECurrency;
  isFocused: boolean;
}

export const useInputValue = ({
  amount,
  amountUsd,
  currency,
  isFocused,
}: IUseInputValue) => {
  const [rawValue, setRawValue] = useState(amount.toString());

  const value = useMemo(() => {
    if (isFocused) {
      return amount.toString();
    }

    return renderInputValue({ amount, currency, amountUsd });
  }, [amount, currency, isFocused, amountUsd]);

  useEffect(() => setRawValue(amount.toString()), [amount]);

  return { rawValue, setRawValue, value };
};
