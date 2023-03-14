import { IApiChain } from 'domains/chains/api/queryChains';
import { useLazyChainsFetchPrivateChainsInfoQuery } from 'domains/chains/actions/private/fetchPrivateChainsInfo';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { useEffect } from 'react';

export type PrivateChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChainsInfo = (
  hasWeb3Connection: boolean,
): PrivateChains => {
  const userEndpointToken = useUserEndpointToken();

  const [
    fetchPrivateChainsInfo,
    { data: { chains, allChains } = defaultData, isLoading },
  ] = useLazyChainsFetchPrivateChainsInfoQuery();

  useEffect(() => {
    fetchPrivateChainsInfo({
      userEndpointToken,
      hasWeb3Connection,
    });
  }, [fetchPrivateChainsInfo, userEndpointToken, hasWeb3Connection]);

  return [chains, allChains, isLoading];
};
