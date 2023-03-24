import { useEffect } from 'react';

import { useLazyChainsFetchPrivateChainQuery } from 'domains/chains/actions/private/fetchPrivateChain';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { ChainID } from 'modules/chains/types';

export const usePrivateChainItemQuery = (chainId: string) => {
  const userEndpointToken = useUserEndpointToken();

  const [fetchPrivateChain, fetchChainState] =
    useLazyChainsFetchPrivateChainQuery();

  useEffect(() => {
    if (userEndpointToken) {
      fetchPrivateChain({ chainId: chainId as ChainID, userEndpointToken });
    }
  }, [chainId, userEndpointToken, fetchPrivateChain]);

  return fetchChainState;
};
