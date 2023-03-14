import { useEffect } from 'react';

import { chainsFetchPublicChain } from 'domains/chains/actions/public/fetchPublicChain';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { POLLING_OPTIONS } from '../constants/pollingOptions';

export const usePublicChainItemQuery = (chainId: string, loading?: boolean) => {
  const [fetchPublicChain, fetchChainState, reset] = useQueryEndpoint(
    chainsFetchPublicChain,
    POLLING_OPTIONS,
  );

  useEffect(() => {
    if (!loading) {
      const { unsubscribe } = fetchPublicChain(chainId);

      return () => {
        reset();
        unsubscribe();
      };
    }

    return () => {};
  }, [chainId, fetchPublicChain, reset, loading]);

  return fetchChainState;
};
