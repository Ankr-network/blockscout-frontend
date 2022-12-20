import { useCallback } from 'react';

import { useLazyUsdTopUpFetchUSDSubscriptionPricesQuery } from '../actions/usdTopUp/fetchUSDSubscriptionPrices';

export const useUSDSubscriptionPrices = () => {
  const [
    fetchUSDSubscriptionPrices,
    { data: prices, isLoading: loading, isUninitialized },
  ] = useLazyUsdTopUpFetchUSDSubscriptionPricesQuery();

  const handleFetchSubscriptionPrices = useCallback(() => {
    if (isUninitialized) {
      fetchUSDSubscriptionPrices();
    }
  }, [fetchUSDSubscriptionPrices, isUninitialized]);

  return {
    handleFetchSubscriptionPrices,
    loading,
    prices,
  };
};
