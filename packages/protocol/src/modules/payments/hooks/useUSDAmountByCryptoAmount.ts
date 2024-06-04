import { useMemo } from 'react';

import { ECurrency } from 'modules/payments/types';
import { useRates } from 'domains/account/hooks/useRates';

import { getUsdAmountByCryptoAmount } from '../utils/getUsdAmountByCryptoAmount';

export interface IUseUsdAmountProps {
  amount: number;
  currency: ECurrency;
}

export const useUsdAmountByCryptoAmount = ({
  amount,
  currency,
}: IUseUsdAmountProps) => {
  const { isLoading, rates } = useRates();

  const amountUsd = useMemo(
    () => getUsdAmountByCryptoAmount({ amount, currency, rates }),
    [amount, currency, rates],
  );

  return { isLoading, amountUsd };
};
