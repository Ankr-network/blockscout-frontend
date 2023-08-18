import { useCallback } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchWebsocketStatsQuery } from '../../actions/fetchWebsocketStats';

interface Params {
  blockchain: Web3Address;
}

export const useWssStats = (params: Params) => {
  const [
    fetchFetchWebsocketStats,
    {
      data: dataWebsocketStats,
      isLoading: isLoadingWebsocketStats,
      isFetching: isFetchingWebsocketStats,
    },
  ] = useLazyFetchWebsocketStatsQuery();

  const isLoadingWebsocket =
    isLoadingWebsocketStats || isFetchingWebsocketStats;

  const requestStats = useCallback(() => {
    fetchFetchWebsocketStats(params);
  }, [fetchFetchWebsocketStats, params]);

  return {
    dataWebsocketStats,
    isLoadingWebsocket,
    requestStats,
  };
};
