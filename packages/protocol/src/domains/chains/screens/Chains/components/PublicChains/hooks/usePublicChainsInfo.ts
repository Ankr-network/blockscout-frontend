import { Chain } from 'modules/chains/types';
import { useChainsFetchPublicChainsInfoQuery } from 'domains/chains/actions/public/fetchPublicChainsInfo';

export type PublicChains = [Chain[], Chain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePublicChainsInfo = (): PublicChains => {
  const { data: { chains, allChains } = defaultData, isLoading } =
    useChainsFetchPublicChainsInfoQuery();

  return [chains, allChains, isLoading];
};
