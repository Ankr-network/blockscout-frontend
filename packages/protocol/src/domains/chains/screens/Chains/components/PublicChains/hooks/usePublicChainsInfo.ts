import { IApiChain } from 'domains/chains/api/queryChains';
import { useChainsFetchPublicChainsInfoQuery } from 'domains/chains/actions/public/fetchPublicChainsInfo';

export type PublicChains = [IApiChain[], IApiChain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePublicChainsInfo = (): PublicChains => {
  const { data: { chains, allChains } = defaultData, isLoading } =
    useChainsFetchPublicChainsInfoQuery();

  return [chains, allChains, isLoading];
};
