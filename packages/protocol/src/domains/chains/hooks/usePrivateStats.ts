import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetRequests } from '@redux-requests/core';
import { PrivateStats } from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';
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

  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPrivateStats.toString()]));
  });

  useEffect(() => {
    if (isWalletConnected) {
      dispatchRequest(
        fetchPrivateStats(timeframeToIntervalMap[timeframe], requestKey),
      );
    }
  }, [dispatchRequest, isWalletConnected, timeframe, requestKey]);

  return [stats, loading];
};
