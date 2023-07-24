import { useEffect } from 'react';

import { Chain } from 'domains/chains/types';
import { useLazyChainsFetchPrivateChainsInfoQuery } from 'domains/chains/actions/private/fetchPrivateChainsInfo';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';

export type PrivateChains = [Chain[], Chain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChainsInfo = (): PrivateChains => {
  const userEndpointToken = useUserEndpointToken();

  const [
    fetchPrivateChainsInfo,
    { data: { chains, allChains } = defaultData, isLoading },
  ] = useLazyChainsFetchPrivateChainsInfoQuery();

  useEffect(() => {
    fetchPrivateChainsInfo({
      userEndpointToken,
    });
  }, [fetchPrivateChainsInfo, userEndpointToken]);

  return [chains, allChains, isLoading];
};
