import { useCallback, useEffect, useState } from 'react';
import { Timeframe } from 'multirpc-sdk';
import { useDispatchRequest } from '@redux-requests/react';
import { getQuery } from '@redux-requests/core';

import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';
import { store } from 'store';

export const useTimeframeData = (chainId: string) => {
  const dispatchRequest = useDispatchRequest();
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');

  useEffect(() => {
    dispatchRequest(fetchChainDetails(chainId, timeframe));
  }, [dispatchRequest, chainId, timeframe]);

  const { data, loading, error } = getQuery(store.getState(), {
    type: fetchChainDetails.toString(),
  });

  const handleSetTimeframe = useCallback((newTimeframe: Timeframe) => {
    if (newTimeframe) {
      setTimeframe(newTimeframe);
    }
  }, []);

  const { totalCached, totalRequests, totalRequestsHistory, countries } =
    data || {};

  return {
    timeframe,
    setTimeframe: handleSetTimeframe,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    countries,
    error,
  };
};
