import { useCallback } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { fetchUSDSubscriptionPrices } from '../actions/usdTopUp/fetchUSDSubscriptionPrices';
import { ProductPrice } from 'multirpc-sdk';

export const useUSDSubscriptionPrices = () => {
  const dispatchRequest = useDispatchRequest();

  const {
    data: prices,
    loading,
    pristine,
  } = useQuery<ProductPrice[]>({
    type: fetchUSDSubscriptionPrices.toString(),
  });

  const handleFetchSubscriptionPrices = useCallback(() => {
    if (pristine) {
      dispatchRequest(fetchUSDSubscriptionPrices());
    }
  }, [dispatchRequest, pristine]);

  return {
    handleFetchSubscriptionPrices,
    prices,
    loading,
  };
};
