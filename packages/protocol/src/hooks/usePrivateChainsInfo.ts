import { useLayoutEffect } from 'react';

import { useLazyChainsFetchPrivateChainsInfoQuery } from 'domains/chains/actions/private/fetchPrivateChainsInfo';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChainsInfo = (skipFetching?: boolean) => {
  const userEndpointToken = useUserEndpointToken();

  const [
    fetchPrivateChainsInfo,
    { data: { allChains, chains } = defaultData, isLoading, isUninitialized },
  ] = useLazyChainsFetchPrivateChainsInfoQuery();

  useLayoutEffect(() => {
    if (!skipFetching && userEndpointToken) {
      fetchPrivateChainsInfo({
        userEndpointToken,
      });
    }
  }, [fetchPrivateChainsInfo, userEndpointToken, skipFetching]);

  return { chains, allChains, isLoading, isUninitialized };
};
