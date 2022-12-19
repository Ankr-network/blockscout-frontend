import { useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';

import { POLL_INTERVAL } from '../../const';
import { PublicStats } from '../../types';
import { Timeframe } from 'domains/chains/types';
import { fetchChainTimeframeData } from 'domains/chains/actions/fetchChainTimeframeData';
import { normalizeTotalRequestsHistory } from '../../utils/normalizeTotalRequestsHistory';
import { timeframeToStatsTimeframe } from 'domains/chains/constants/timeframeToStatsTimeframeMap';

export interface PublicStatsParams {
  chainId: string;
  timeframe: Timeframe;
}

export const usePublicStats = ({
  chainId,
  timeframe,
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
    if (chainId) {
      dispatch(
        fetchChainTimeframeData(
          chainId,
          timeframeToStatsTimeframe[timeframe],
          POLL_INTERVAL,
        ),
      );
    }

    return stopPolling;
  }, [dispatch, chainId, timeframe, stopPolling]);

  const { totalCached, totalRequests, totalRequestsHistory, countries } = stats;

  return {
    countries,
    error,
    loading: loading && pristine,
    pristine,
    totalCached,
    totalRequests,
    totalRequestsHistory: normalizeTotalRequestsHistory(totalRequestsHistory),
  };
};
