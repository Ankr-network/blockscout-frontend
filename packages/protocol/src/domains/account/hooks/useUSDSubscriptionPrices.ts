import { useCallback } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyUsdTopUpFetchUSDSubscriptionPricesQuery } from '../actions/usdTopUp/fetchUSDSubscriptionPrices';

export const useUSDSubscriptionPrices = () => {
  const [
    fetchUSDSubscriptionPrices,
    { data: prices, isLoading: loading, isUninitialized },
  ] = useLazyUsdTopUpFetchUSDSubscriptionPricesQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const handleFetchSubscriptionPrices = useCallback(() => {
    if (isUninitialized) {
      fetchUSDSubscriptionPrices({ group });
    }
  }, [fetchUSDSubscriptionPrices, isUninitialized, group]);

  return {
    handleFetchSubscriptionPrices,
    loading,
    prices,
  };
};
