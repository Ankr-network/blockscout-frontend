import BigNumber from 'bignumber.js';
import { Chain, Timeframe } from '@ankr.com/chains-list';

import { REFETCH_STATS_INTERVAL } from 'modules/common/constants/const';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
  timeframe: Timeframe;
}

export const usePublicChainsItem = ({
  chain: { id },
  timeframe,
}: ChainsItemParams) => {
  const { data, isLoading: arePublicStatsLoading } =
    useFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe], {
      refetchOnMountOrArgChange: REFETCH_STATS_INTERVAL,
    });

  return {
    totalRequests: new BigNumber(data?.[id] || 0),
    loading: arePublicStatsLoading,
  };
};
