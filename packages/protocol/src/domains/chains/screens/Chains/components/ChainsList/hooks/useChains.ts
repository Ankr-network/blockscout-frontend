import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { ChainID } from 'modules/endpoints/types';
import { Chain } from '../ChainsListTypes';
import { formatChains, sortChains } from '../ChainsListUtils';
import { usePrivateStats } from './usePrivateStats';

type ChainMap = Partial<Record<ChainID, Chain>>;

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
}

export interface UseChainsResult {
  processedChains: Chain[];
  publicChainsMap: ChainMap;
}

export const useChains = ({
  chains,
  allChains,
  sortType,
}: ChainsParams): UseChainsResult => {
  const { isWalletConnected } = useAuth();
  const [stats] = usePrivateStats();

  const processedChains = useMemo(
    () =>
      sortChains({
        chains: formatChains(chains),
        isWalletConnected,
        sortType,
        stats,
      }),
    [isWalletConnected, stats, chains, sortType],
  );

  const publicChainsMap = useMemo(
    () =>
      formatChains(allChains).reduce<ChainMap>((map, chain) => {
        map[chain.id] = chain;

        return map;
      }, {}),
    [allChains],
  );

  return {
    processedChains,
    publicChainsMap,
  };
};
