import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainsFetchPrivateChainsInfoQuery } from 'domains/chains/actions/private/fetchPrivateChainsInfo';

export type PrivateChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePrivateChainsInfo = (): PrivateChains => {
  const { data: { chains, allChains } = defaultData, isLoading } =
    useChainsFetchPrivateChainsInfoQuery();

  return [chains, allChains, isLoading];
};
