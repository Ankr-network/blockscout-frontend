import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { Chain } from '../ChainsListTypes';
import {
  formatChains,
  sortChains,
  formatPublicRequestsCount,
} from '../ChainsListUtils';
import { usePrivateStats } from './usePrivateStats';
import { useQuery } from '@redux-requests/react';
import { fetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';

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

  const { data } = useQuery({
    type: fetchPublicRequestsCountStats,
  });

  const processedChains = useMemo(
    () =>
      sortChains({
        chains: formatPublicRequestsCount(chains, data),
        isWalletConnected,
        sortType,
        stats,
      }),
    [isWalletConnected, stats, chains, data, sortType],
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
