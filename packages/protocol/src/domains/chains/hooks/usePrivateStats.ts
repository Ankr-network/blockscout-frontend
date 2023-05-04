import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { useEffect } from 'react';

import { chainsFetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface PrivateStatsParams {
  interval: PrivateStatsInterval;
  requestKey?: string;
  userEndpointToken?: string;
}

interface PrivateStatsReturn {
  arePrivateStatsLoading: boolean;
  data: PrivateStats;
  privateStatsError: any;
}

export const usePrivateStats = ({
  interval,
  requestKey,
  userEndpointToken,
}: PrivateStatsParams): PrivateStatsReturn => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const [
    fetchPrivateStats,
    { data = {}, isLoading: arePrivateStatsLoading, error: privateStatsError },
    reset,
  ] = useQueryEndpoint(chainsFetchPrivateStats);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    fetchPrivateStats({ interval, userEndpointToken, group });
  }, [fetchPrivateStats, interval, requestKey, userEndpointToken, group]);

  return { arePrivateStatsLoading, data, privateStatsError };
};
