import { useEffect } from 'react';

import { chainsFetchPrivateChain } from 'domains/chains/actions/private/fetchPrivateChain';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { ChainID } from 'domains/chains/types';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateChainItemQuery = (chainId: string) => {
  const userEndpointToken = useUserEndpointToken();

  const [fetchPrivateChain, fetchChainState, reset] = useQueryEndpoint(
    chainsFetchPrivateChain,
  );

  useEffect(() => {
    if (userEndpointToken) {
      reset();
      fetchPrivateChain({ chainId: chainId as ChainID, userEndpointToken });
    }
  }, [reset, chainId, userEndpointToken, fetchPrivateChain]);

  return fetchChainState;
};
