import { useCallback } from 'react';
import { Web3Address } from 'multirpc-sdk';

import { useLazyFetchArchiveRequestsStatsQuery } from '../../actions/fetchArchiveRequestsStats';

interface Params {
  blockchain: Web3Address;
}

export const useArchiveRequestsStats = (params: Params) => {
  const [
    fetchFetchArchiveRequestsStats,
    {
      data: dataArchiveRequestsStats,
      isLoading: isLoadingArchiveRequestsStats,
      isFetching: isFetchingArchiveRequestsStats,
    },
  ] = useLazyFetchArchiveRequestsStatsQuery();

  const isLoadingArchiveRequests =
    isLoadingArchiveRequestsStats || isFetchingArchiveRequestsStats;

  const requestStats = useCallback(() => {
    fetchFetchArchiveRequestsStats(params);
  }, [fetchFetchArchiveRequestsStats, params]);

  return { dataArchiveRequestsStats, isLoadingArchiveRequests, requestStats };
};
