import { useEffect } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { chainsFetchPrivateChainsInfo } from 'domains/chains/actions/fetchPrivateChainsInfo';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export type PrivateChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChains = (): PrivateChains => {
  const [
    fetchPrivateChainsInfo,
    { data: { chains, allChains } = defaultData, isLoading },
    reset,
  ] = useQueryEndpoint(chainsFetchPrivateChainsInfo);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    fetchPrivateChainsInfo();
  }, [fetchPrivateChainsInfo]);

  return [chains, allChains, isLoading];
};
