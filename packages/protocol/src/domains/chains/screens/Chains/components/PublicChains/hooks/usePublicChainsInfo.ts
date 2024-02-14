import { Chain } from 'modules/chains/types';
import { useChainsFetchPublicChainsInfoQuery } from 'domains/chains/actions/public/fetchPublicChainsInfo';
import { ACTION_TEN_MINUTES_CACHE } from 'modules/common/constants/const';

export type PublicChains = [Chain[], Chain[], boolean];

const defaultData = {
  chains: [],
  allChains: [],
};

export const usePublicChainsInfo = (): PublicChains => {
  const { data: { chains, allChains } = defaultData, isLoading } =
    useChainsFetchPublicChainsInfoQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_TEN_MINUTES_CACHE,
    });

  return [chains, allChains, isLoading];
};
