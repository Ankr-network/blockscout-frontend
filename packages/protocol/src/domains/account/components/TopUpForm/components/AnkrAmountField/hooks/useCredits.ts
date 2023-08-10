import { useMemo } from 'react';

import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useRates } from 'domains/account/hooks/useRates';

import { getCredits } from '../utils/getCredits';

export const useCredits = (amount: string) => {
  const { rates = [], handleFetchRates } = useRates();

  useOnMount(handleFetchRates);

  return useMemo(() => getCredits(rates, amount), [amount, rates]);
};
