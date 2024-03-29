import { useMemo } from 'react';

import { Currency } from 'domains/account/components/TopUp/types';
import { useRates } from 'domains/account/hooks/useRates';

import { getCredits } from '../utils/getCredits';

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
