import { useEffect } from 'react';

import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';

export const useUSDPrices = (shouldInit = false) => {
  const {
    handleFetchSubscriptionPrices,
    prices = [],
    loading,
  } = useUSDSubscriptionPrices();

  useEffect(() => {
    if (shouldInit) {
      handleFetchSubscriptionPrices();
    }
  }, [handleFetchSubscriptionPrices, shouldInit]);

  return { loading, prices };
};
