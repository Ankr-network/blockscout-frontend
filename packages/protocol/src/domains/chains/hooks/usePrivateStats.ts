import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';

const timeframeToIntervalMap: Record<StatsTimeframe, PrivateStatsInterval> = {
  [StatsTimeframe.DAY]: PrivateStatsInterval.DAY,
  [StatsTimeframe.WEEK]: PrivateStatsInterval.WEEK,
  [StatsTimeframe.MONTH]: PrivateStatsInterval.MONTH,
};

export interface PrivateStatsParams {
  isWalletConnected: boolean;
  requestKey?: string;
  statsTimeframe: StatsTimeframe;
}

export const usePrivateStats = ({
  isWalletConnected,
  requestKey,
  statsTimeframe,
}: PrivateStatsParams): [PrivateStats, boolean] => {
  const { data: stats, loading } = useQuery({
    defaultData: {},
    type: fetchPrivateStats,
    requestKey,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isWalletConnected) {
      dispatch(
        fetchPrivateStats(timeframeToIntervalMap[statsTimeframe], requestKey),
      );
    }
  }, [dispatch, isWalletConnected, statsTimeframe, requestKey]);

  return [stats, loading];
};
