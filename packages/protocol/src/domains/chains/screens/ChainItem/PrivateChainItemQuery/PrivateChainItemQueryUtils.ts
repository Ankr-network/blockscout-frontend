import { useEffect } from 'react';

import { chainsFetchPrivateChain } from 'domains/chains/actions/private/fetchPrivateChain';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { ChainID } from 'domains/chains/types';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateChainItemQuery = (chainId: string) => {
  const userEndpointToken = useUserEndpointToken();

  const [fetchPrivateChain, fetchChainState] = useQueryEndpoint(
    chainsFetchPrivateChain,
  );

  useEffect(() => {
    if (userEndpointToken) {
      fetchPrivateChain({ chainId: chainId as ChainID, userEndpointToken });
    }
  }, [chainId, userEndpointToken, fetchPrivateChain]);

  return fetchChainState;
};
