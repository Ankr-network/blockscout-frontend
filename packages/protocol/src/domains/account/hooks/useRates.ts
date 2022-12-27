import { useCallback } from 'react';

import {
  CreditsRate,
  accountFetchCreditRates,
} from 'domains/account/actions/rate/fetchCreditRates';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface Rates {
  handleFetchRates: () => void;
  isRateLoading: boolean;
  rates?: CreditsRate[];
}

export const useRates = () => {
  const [
    fetchRates,
    { data: rates, isLoading: isRateLoading, isUninitialized },
  ] = useQueryEndpoint(accountFetchCreditRates);

  const handleFetchRates = useCallback(() => {
    if (isUninitialized) {
      fetchRates();
    }
  }, [fetchRates, isUninitialized]);

  return { handleFetchRates, isRateLoading, rates };
};
