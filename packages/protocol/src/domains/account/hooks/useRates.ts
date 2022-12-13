import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import {
  CreditsRate,
  fetchCreditRates,
} from 'domains/account/actions/rate/fetchCreditRates';

export const useRates = () => {
  const dispatchRequest = useDispatchRequest();

  const {
    data: rates,
    loading: isRateLoading,
    pristine,
  } = useQuery<CreditsRate[]>({
    type: fetchCreditRates.toString(),
  });

  const handleFetchRates = useCallback(() => {
    if (pristine) {
      dispatchRequest(fetchCreditRates());
    }
  }, [pristine, dispatchRequest]);

  return {
    handleFetchRates,
    rates,
    isRateLoading,
  };
};
