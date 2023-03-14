import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainsFetchPrivateChainsInfoQuery } from 'domains/chains/actions/private/fetchPrivateChainsInfo';

export type PrivateChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChainsInfo = (
  hasWeb3Connection: boolean,
): PrivateChains => {
  const { data: { chains, allChains } = defaultData, isLoading } =
    useChainsFetchPrivateChainsInfoQuery(hasWeb3Connection);

  return [chains, allChains, isLoading];
};
