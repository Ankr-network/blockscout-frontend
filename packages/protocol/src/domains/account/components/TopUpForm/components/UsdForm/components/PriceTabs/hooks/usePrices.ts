import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useUSDSubscriptionPrices } from 'domains/account/hooks/useUSDSubscriptionPrices';

export const usePrices = () => {
  const {
    handleFetchSubscriptionPrices,
    prices = [],
    loading,
  } = useUSDSubscriptionPrices();

  useOnMount(handleFetchSubscriptionPrices);

  return { prices, loading };
};
