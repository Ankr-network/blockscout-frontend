import { useEffect, useMemo, useRef, useState } from 'react';

import { ECurrency } from 'modules/billing/types';
import { isStableCoinCurrency } from 'modules/billing/utils/isStableCoinCurrency';

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
  const cachedCurrencyRef = useRef(currency);

  const [rawValue, setRawValue] = useState('');

  useEffect(() => {
    const isSwitchedBetweenStableCoins =
      isStableCoinCurrency(cachedCurrencyRef.current) &&
      isStableCoinCurrency(currency);

    if (!isSwitchedBetweenStableCoins) {
      // raw value should be reset on currency change except for stable coins
      // (https://ankrnetwork.atlassian.net/browse/MRPC-4815)
      setRawValue('');
    }

    cachedCurrencyRef.current = currency;
  }, [currency]);

  const value = useMemo(() => {
    if (isFocused) {
      return amount.toString();
    }

    return renderInputValue({ amount, currency, amountUsd });
  }, [amount, currency, isFocused, amountUsd]);

  return { rawValue, setRawValue, value };
};
