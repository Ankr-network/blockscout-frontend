import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType, Timeframe } from 'domains/chains/types';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { sortPublicChains, formatRequestsCount } from './utils';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
  timeframe: Timeframe;
}

export const usePublicChains = ({
  chains,
  allChains,
  sortType,
  timeframe,
}: ChainsParams) => {
  const { data, isLoading: arePublicStatsLoading } =
    useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  const processedChains = useMemo(
    () =>
      sortPublicChains({
        chains: formatRequestsCount(chains, data),
        sortType,
        isLoading: arePublicStatsLoading,
      }),
    [chains, data, sortType, arePublicStatsLoading],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
