import { useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { POLL_INTERVAL } from '../const';
import { PublicStats } from '../types';
import { StatsTimeframe } from 'domains/chains/types';
import { fetchChainTimeframeData } from 'domains/chains/actions/fetchChainTimeframeData';
import { normalizeTotalRequestsHistory } from '../utils/normalizeTotalRequestsHistory';
import { statsTimeframeToTimeframeMap } from 'domains/chains/constants/statsTimeframeToTimeframeMap';

export interface PublicStatsParams {
  chainId: string;
  isWalletConnected: boolean;
  statsTimeframe: StatsTimeframe;
}

export const usePublicStats = ({
  chainId,
  isWalletConnected,
  statsTimeframe,
}: PublicStatsParams): PublicStats => {
  const {
    data: stats,
    error,
    loading,
    pristine,
    stopPolling,
  } = useQuery({
    defaultData: {},
    requestKey: chainId,
    type: fetchChainTimeframeData,
  });
  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (!isWalletConnected) {
      dispatch(
        fetchChainTimeframeData(
          chainId,
          statsTimeframeToTimeframeMap[statsTimeframe],
          POLL_INTERVAL,
        ),
      );
    }

    return stopPolling;
  }, [dispatch, chainId, isWalletConnected, statsTimeframe, stopPolling]);

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
