import { useMemo } from 'react';

import { Chain, SortType, Timeframe } from 'domains/chains/types';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';

import { sortPublicChains, formatRequestsCount } from './utils';

export interface ChainsParams {
  chains: Chain[];
  allChains: Chain[];
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
        .filter(item => getFilteredChainsByName(item, searchContent))
        .filter(excludeMultiChain),
    [searchContent, chains, data, sortType, arePublicStatsLoading],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
