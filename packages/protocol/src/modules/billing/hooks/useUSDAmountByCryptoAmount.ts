import { useMemo } from 'react';

import { ECurrency } from 'modules/billing/types';
import { useRates } from 'domains/account/hooks/useRates';

import { getUSDAmountByCryptoAmount } from '../utils/getUSDAmountByCryptoAmount';

export interface IUseUSDAmountProps {
  amount: number;
  currency: ECurrency;
}

export const useUSDAmountByCryptoAmount = ({
  amount,
  currency,
}: IUseUSDAmountProps) => {
  const { isLoading, rates } = useRates();

  const amountUsd = useMemo(
    () => getUSDAmountByCryptoAmount({ amount, currency, rates }),
    [amount, currency, rates],
  );

  return { isLoading, amountUsd };
};
