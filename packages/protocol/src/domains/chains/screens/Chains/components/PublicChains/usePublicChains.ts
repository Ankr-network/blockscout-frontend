import { useEffect } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { chainsFetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export type PublicChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePublicChains = (): PublicChains => {
  const [
    fetchPublicChainsInfo,
    { data: { chains, allChains } = defaultData, isLoading },
  ] = useQueryEndpoint(chainsFetchPublicChainsInfo);

  useEffect(() => {
    fetchPublicChainsInfo();
  }, [fetchPublicChainsInfo]);

  return [chains, allChains, isLoading];
};
