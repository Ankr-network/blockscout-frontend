import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import {
  CreditsRate,
  fetchCreditRates,
} from 'domains/account/actions/rate/fetchCreditRates';

export const useRates = () => {
  const dispatchRequest = useDispatchRequest();

  const handleFetchRates = useCallback(
    () => dispatchRequest(fetchCreditRates()),
    [dispatchRequest],
  );

  const { data: rates, loading: isRateLoading } = useQuery<CreditsRate[]>({
    type: fetchCreditRates.toString(),
  });

  return {
    handleFetchRates,
    rates,
    isRateLoading,
  };
};
