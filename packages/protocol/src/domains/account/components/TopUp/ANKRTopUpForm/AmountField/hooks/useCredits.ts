import { useMemo } from 'react';

import { Currency } from '../../../types';
import { getCredits } from '../AmountFieldUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useRates } from 'domains/account/hooks/useRates';

export interface CreditsParams {
  amount: string;
  currency: Currency;
}

export const useCredits = ({ amount, currency }: CreditsParams) => {
  const { rates = [], handleFetchRates } = useRates();

  useOnMount(handleFetchRates);

  return useMemo(
    () => getCredits(currency, rates, amount),
    [rates, currency, amount],
  );
};
