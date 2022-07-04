import { useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { PublicStats } from '../types';
import { StatsTimeframe } from 'domains/chains/types';
import { fetchChainTimeframeData } from 'domains/chains/actions/fetchChainTimeframeData';
import { normalizeTotalRequestsHistory } from '../utils/normalizeTotalRequestsHistory';
import { statsTimeframeToTimeframeMap } from 'domains/chains/constants/statsTimeframeToTimeframeMap';

export interface PublicStatsParams {
  chainId: string;
  statsTimeframe: StatsTimeframe;
}

const POLL_INTERVAL = 20;

export const usePublicStats = ({
  chainId,
  statsTimeframe,
}: PublicStatsParams): PublicStats => {
  const {
    data: stats,
    loading,
    error,
    pristine,
    stopPolling,
  } = useQuery({
    defaultData: {},
    requestKey: chainId,
    type: fetchChainTimeframeData,
  });
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(
      fetchChainTimeframeData(
        chainId,
        statsTimeframeToTimeframeMap[statsTimeframe],
        POLL_INTERVAL,
      ),
    );

    return stopPolling;
  }, [dispatchRequest, chainId, statsTimeframe, stopPolling]);

  const { totalCached, totalRequests, totalRequestsHistory, countries } = stats;

  return {
    countries,
    error,
    loading,
    pristine,
    totalCached,
    totalRequests,
    totalRequestsHistory: normalizeTotalRequestsHistory(totalRequestsHistory),
  };
};
