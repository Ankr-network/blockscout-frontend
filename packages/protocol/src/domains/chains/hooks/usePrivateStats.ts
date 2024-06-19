import { useEffect, useRef } from 'react';
import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { chainsFetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';

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

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  const [
    fetchPrivateStats,
    { data = {}, error: privateStatsError, isLoading: arePrivateStatsLoading },
    reset,
  ] = useQueryEndpoint(chainsFetchPrivateStats);

  const groupRef = useRef(group);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (!isEnterpriseStatusLoading) {
      const isGroupChanged = groupRef.current !== group;

      if (isGroupChanged) {
        groupRef.current = group;

        fetchPrivateStats({
          interval,
          userEndpointToken: undefined,
          group,
          gateway,
        });
      }

      fetchPrivateStats({ interval, userEndpointToken, group, gateway });
    }
  }, [
    fetchPrivateStats,
    interval,
    requestKey,
    userEndpointToken,
    group,
    gateway,
    isEnterpriseStatusLoading,
  ]);

  return { arePrivateStatsLoading, data, privateStatsError };
};
