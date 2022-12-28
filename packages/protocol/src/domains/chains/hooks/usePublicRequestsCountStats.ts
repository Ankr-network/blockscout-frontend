import { Timeframe } from 'multirpc-sdk';
import { useEffect } from 'react';

import { ChainID } from 'modules/chains/types';
import { chainsFetchPublicRequestsCountStats } from '../actions/fetchPublicRequestsCountStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface PublicStatsParams {
  interval: Timeframe;
  requestKey?: string;
}

export interface PublicStatsReturn {
  arePublicStatsLoading: boolean;
  data?: Record<ChainID, string>;
  publicStatsError: any;
}

export const usePublicRequestsCountStats = ({
  interval,
}: PublicStatsParams): PublicStatsReturn => {
  const [
    fetchPublicRequestsCountStats,
    { data, isLoading: arePublicStatsLoading, error: publicStatsError },
    reset,
  ] = useQueryEndpoint(chainsFetchPublicRequestsCountStats);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    fetchPublicRequestsCountStats(interval);
  }, [fetchPublicRequestsCountStats, interval]);

  return { arePublicStatsLoading, data, publicStatsError };
};
