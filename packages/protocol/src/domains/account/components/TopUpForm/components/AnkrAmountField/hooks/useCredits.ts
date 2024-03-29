import { useMemo } from 'react';

import { useRates } from 'domains/account/hooks/useRates';

import { getCredits } from '../utils/getCredits';

export const useCredits = (amount: string) => {
  const { rates } = useRates();

  return useMemo(() => getCredits(rates, amount), [amount, rates]);
};
