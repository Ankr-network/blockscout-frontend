import { useEffect } from 'react';

import { chainsFetchPrivateChain } from 'domains/chains/actions/private/fetchPrivateChain';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useLazyChainsFetchPremiumChainFeaturesQuery } from 'domains/chains/actions/private/fetchPremiumChainFeatures';
import { POLLING_OPTIONS } from '../constants/pollingOptions';

export const usePrivateChainItemQuery = (chainId: string, loading: boolean) => {
  const [fetchPremiumChainFeatures] =
    useLazyChainsFetchPremiumChainFeaturesQuery();

  const [fetchPrivateChain, fetchChainState, reset] = useQueryEndpoint(
    chainsFetchPrivateChain,
    POLLING_OPTIONS,
  );

  useEffect(() => {
    fetchPremiumChainFeatures(chainId);

    if (!loading) {
      const { unsubscribe } = fetchPrivateChain(chainId);

      return () => {
        reset();
        unsubscribe();
      };
    }

    return () => {};
  }, [chainId, fetchPrivateChain, fetchPremiumChainFeatures, reset, loading]);

  return fetchChainState;
};
