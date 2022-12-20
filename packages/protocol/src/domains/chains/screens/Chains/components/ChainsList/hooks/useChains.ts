import { useMemo } from 'react';

import { Chain } from '../ChainsListTypes';
import { ChainID } from 'modules/chains/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { chainsFetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';
import {
  formatChains,
  formatPublicRequestsCount,
  sortChains,
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
  const { credentials } = useAuth();
  const [stats] = usePrivateStats();

  const [, { data }] = useQueryEndpoint(chainsFetchPublicRequestsCountStats);

  const isPremium = Boolean(credentials);

  const processedChains = useMemo(
    () =>
      sortChains({
        chains: formatPublicRequestsCount(chains, data),
        isPremium,
        sortType,
        stats,
      }),
    [isPremium, stats, chains, data, sortType],
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
