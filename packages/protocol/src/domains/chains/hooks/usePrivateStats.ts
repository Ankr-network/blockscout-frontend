import { PrivateStatsInterval } from 'multirpc-sdk';

import { useAutoupdatedRef } from 'modules/common/hooks/useAutoupdatedRef';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useFetchPrivateStats } from './useFetchPrivateStats';

export interface IPrivateStatsParams {
  hasGateway?: boolean;
  interval: PrivateStatsInterval;
  skipFetching?: boolean;
  userEndpointToken?: string;
}

export const usePrivateStats = ({
  hasGateway = false,
  interval,
  skipFetching: skipFetchingExternal,
  userEndpointToken,
}: IPrivateStatsParams) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  const groupRef = useAutoupdatedRef(group);
  const isGroupChanged = groupRef.current !== group;

  const {
    error: privateStatsError,
    isLoading: arePrivateStatsLoading,
    privateStats: data,
  } = useFetchPrivateStats({
    group,
    gateway: hasGateway ? gateway : undefined,
    skipFetching: skipFetchingExternal || isEnterpriseStatusLoading,
    interval,
    userEndpointToken: isGroupChanged ? undefined : userEndpointToken,
  });

  return { arePrivateStatsLoading, data, privateStatsError };
};
