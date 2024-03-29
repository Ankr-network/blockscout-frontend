import { useMemo } from 'react';

import { useRates } from 'domains/account/hooks/useRates';

import { Currency } from '../../../types';
import { getCredits } from '../AmountFieldUtils';

export interface CreditsParams {
  amount: string;
  currency: Currency;
}

export const useCredits = ({ amount, currency }: CreditsParams) => {
  const { rates } = useRates();

  return useMemo(
    () => getCredits(currency, rates, amount),
    [rates, currency, amount],
  );
};
