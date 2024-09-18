import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { timeframeToStatsTimeframe } from 'domains/chains/constants/timeframeToStatsTimeframeMap';
import { useLazyChainsFetchChainTimeframeDataQuery } from 'domains/chains/actions/public/fetchChainTimeframeData';

import { POLL_INTERVAL } from '../../const';
import { PublicStats } from '../../types';
import { normalizeTotalRequestsHistory } from '../../utils/normalizeTotalRequestsHistory';

export interface PublicStatsParams {
  chainId: string;
  timeframe: Timeframe;
}

const defaultData = {
  totalCached: new BigNumber(0),
  totalRequests: new BigNumber(0),
  totalRequestsHistory: {},
  countries: {},
};

export const usePublicStats = ({
  chainId,
  timeframe,
}: PublicStatsParams): PublicStats => {
  const [
    fetchChainTimeframeData,
    {
      data: {
        countries,
        totalCached,
        totalRequests,
        totalRequestsHistory,
      } = defaultData,
      error,
      isFetching,
      isLoading,
      isUninitialized,
    },
  ] = useLazyChainsFetchChainTimeframeDataQuery({
    pollingInterval: POLL_INTERVAL,
  });

  useEffect(() => {
    if (chainId) {
      const { unsubscribe } = fetchChainTimeframeData({
        chainId,
        timeframe: timeframeToStatsTimeframe[timeframe],
      });

      return unsubscribe;
    }

    return () => {};
  }, [fetchChainTimeframeData, chainId, timeframe]);

  return {
    countries,
    error,
    isLoading: isLoading || isFetching,
    isUninitialized,
    totalCached,
    totalRequests,
    totalRequestsHistory: normalizeTotalRequestsHistory(totalRequestsHistory),
  };
};
