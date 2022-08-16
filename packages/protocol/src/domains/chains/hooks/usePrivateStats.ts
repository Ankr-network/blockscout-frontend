import { PrivateStats } from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { fetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { timeframeToIntervalMap } from '../utils/statsUtils';

export interface PrivateStatsParams {
  isWalletConnected: boolean;
  poll?: number;
  requestKey?: string;
  statsTimeframe: StatsTimeframe;
}

export const usePrivateStats = ({
  isWalletConnected,
  requestKey,
  statsTimeframe: timeframe,
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
        fetchPrivateStats(timeframeToIntervalMap[timeframe], requestKey),
      );
    }
  }, [dispatch, isWalletConnected, timeframe, requestKey]);

  return [stats, loading];
};
