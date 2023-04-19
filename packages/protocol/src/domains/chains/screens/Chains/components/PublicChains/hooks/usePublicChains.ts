import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType, Timeframe } from 'domains/chains/types';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import {
  sortPublicChains,
  formatRequestsCount,
  filteredByNameChains,
} from './utils';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
  timeframe: Timeframe;
  searchContent: string;
}

export const usePublicChains = ({
  chains,
  allChains,
  sortType,
  timeframe,
  searchContent,
}: ChainsParams) => {
  const { data, isLoading: arePublicStatsLoading } =
    useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  const processedChains = useMemo(
    () =>
      sortPublicChains({
        chains: formatRequestsCount(chains, data),
        sortType,
        isLoading: arePublicStatsLoading,
      })
        .filter(item => filteredByNameChains(item, searchContent))
        .filter(excludeMultiChain),
    [searchContent, chains, data, sortType, arePublicStatsLoading],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};