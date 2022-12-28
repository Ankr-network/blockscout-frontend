import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useEffect } from 'react';

import { chainsFetchPublicChains } from '../actions/fetchPublicChains';

export const usePublicChainsRoutes = () => {
  const [fetchPublicChains, { data: { chains = [] } = {}, isUninitialized }] =
    useQueryEndpoint(chainsFetchPublicChains);

  useEffect(() => {
    if (isUninitialized) {
      fetchPublicChains();
    }
  }, [fetchPublicChains, isUninitialized]);

  return chains.map(item => item?.id);
};
