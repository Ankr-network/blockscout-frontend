import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { useEffect } from 'react';

import { chainsFetchPrivateStats } from 'domains/chains/actions/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface PrivateStatsParams {
  interval: PrivateStatsInterval;
  requestKey?: string;
}

export interface PrivateStatsReturn {
  arePrivateStatsLoading: boolean;
  data: PrivateStats;
  privateStatsError: any;
}

export const usePrivateStats = ({
  interval,
  requestKey,
}: PrivateStatsParams): PrivateStatsReturn => {
  const [
    fetchPrivateStats,
    { data = {}, isLoading: arePrivateStatsLoading, error: privateStatsError },
    reset,
  ] = useQueryEndpoint(chainsFetchPrivateStats);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    fetchPrivateStats(interval);
  }, [fetchPrivateStats, interval, requestKey]);

  return { arePrivateStatsLoading, data, privateStatsError };
};
