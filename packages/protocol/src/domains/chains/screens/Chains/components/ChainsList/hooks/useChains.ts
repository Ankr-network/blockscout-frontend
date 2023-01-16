import { useMemo } from 'react';

import { Chain } from '../ChainsListTypes';
import { ChainID } from 'modules/chains/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { chainsFetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';
import {
  formatChains,
  formatPublicRequestsCount,
  sortPrivateChains,
  sortPublicChains,
} from '../ChainsListUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

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
  const { hasPrivateAccess } = useAuth();
  const [stats] = usePrivateStats();

  const [, { isLoading: arePublicStatsLoading }] = useQueryEndpoint(
    chainsFetchPublicRequestsCountStats,
  );

  const [, { data }] = useQueryEndpoint(chainsFetchPublicRequestsCountStats);

  const processedChains = useMemo(
    () =>
      hasPrivateAccess
        ? sortPrivateChains({
            chains: formatPublicRequestsCount(chains, data),
            sortType,
            stats,
          })
        : sortPublicChains({
            chains: formatPublicRequestsCount(chains, data),
            sortType,
            isLoading: arePublicStatsLoading,
          }),
    [hasPrivateAccess, stats, chains, data, sortType, arePublicStatsLoading],
  );

  const publicChainsMap = useMemo(
    () =>
      formatChains(allChains).reduce<ChainMap>((map, chain) => {
        map[chain.id] = chain;

        return map;
      }, {}),
    [allChains],
  );

  return { processedChains, publicChainsMap };
};
