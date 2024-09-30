import { Chain, ESortChainsType, Timeframe } from '@ankr.com/chains-list';
import { PrivateStatsInternal } from 'multirpc-sdk';
import { useMemo } from 'react';

import { REFETCH_INTERVAL } from 'modules/common/constants/const';
import {
  formatRequestsCount,
  sortPublicChains,
} from 'domains/chains/screens/ChainsListPage/components/PublicChains/hooks/utils';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { sortPrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/utils';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';

export interface ChainsParams {
  chains: Chain[];
  sortType: ESortChainsType;
  timeframe: Timeframe;
  searchContent: string;
  privateStats?: PrivateStatsInternal;
}

export const useChainsSorting = ({
  chains,
  privateStats,
  searchContent,
  sortType,
}: ChainsParams) => {
  const filteredBySearchChains = useMemo(
    () =>
      chains?.filter(chain =>
        getFilteredChainsByName(chain, searchContent.toLowerCase()),
      ),
    [chains, searchContent],
  );

  const { data: publicStats, isLoading: arePublicStatsLoading } =
    useFetchPublicRequestsCountStatsQuery(toTimeframeMap[Timeframe.Month], {
      refetchOnMountOrArgChange: REFETCH_INTERVAL,
    });

  const sortedChainsByPublicUsage = useMemo(() => {
    return sortPublicChains({
      chains: formatRequestsCount(filteredBySearchChains, publicStats),
      sortType: ESortChainsType.UsageHighLow,
      isLoading: arePublicStatsLoading,
    });
  }, [arePublicStatsLoading, publicStats, filteredBySearchChains]);

  const sortedChainsByPrivateUsage = useMemo(() => {
    if (!privateStats) {
      return sortedChainsByPublicUsage;
    }

    return sortPrivateChains({
      chains: sortedChainsByPublicUsage,
      sortType: ESortChainsType.UsageHighLow,
      stats: privateStats,
    });
  }, [privateStats, sortedChainsByPublicUsage]);

  const sortedChains = useMemo(() => {
    if (sortType === ESortChainsType.NameAZ) {
      return [...filteredBySearchChains].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    if (sortType === ESortChainsType.NameZA) {
      return [...filteredBySearchChains].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }

    // check if there any info in requestsData
    const hasPrivateStats =
      privateStats && Object.values(privateStats).length > 0;

    // console.log({ requestsData });
    if (hasPrivateStats) {
      if (sortType === ESortChainsType.UsageHighLow) {
        return sortedChainsByPrivateUsage;
      }

      if (sortType === ESortChainsType.UsageLowHigh) {
        return sortedChainsByPrivateUsage.slice().reverse();
      }
    }

    return sortedChainsByPublicUsage;
  }, [
    sortType,
    privateStats,
    sortedChainsByPublicUsage,
    filteredBySearchChains,
    sortedChainsByPrivateUsage,
  ]);

  return { processedChains: sortedChains };
};
