import { useEffect } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import {
  selectProjectsStats,
  selectProjectsTotalRequestNumber,
} from 'domains/dashboard/store/selectors/v1';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useAppSelector } from 'store/useAppSelector';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useLazyFetchAllProjectsStatsQuery } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { useLazyFetchAllProjectsTotalRequestsQuery } from 'domains/dashboard/actions/fetchAllProjectsTotalRequests';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useProjectsData = (timeframe: Timeframe) => {
  const amount = useAppSelector(selectProjectsTotalRequestNumber);
  const data = useAppSelector(selectProjectsStats);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const skipJWTsFetching = isEnterpriseStatusLoading || isEnterpriseClient;

  const { jwts: projects, loading: projectsLoading } = useJWTs({
    group,
    skipFetching: skipJWTsFetching,
  });

  const [fetchAllProjectsStats, { isLoading: areAllProjectsStatsLoading }] =
    useLazyFetchAllProjectsStatsQuery();

  const { gateway } = useMultiServiceGateway();

  useEffect(() => {
    const shouldFetch =
      projects &&
      !projectsLoading &&
      !isEnterpriseStatusLoading &&
      !isEnterpriseClient;

    if (shouldFetch) {
      fetchAllProjectsStats({
        group,
        interval: timeframeToIntervalMap[timeframe],
        projects,
        gateway,
      });
    }
  }, [
    fetchAllProjectsStats,
    projectsLoading,
    timeframe,
    group,
    projects,
    isEnterpriseClient,
    gateway,
    isEnterpriseStatusLoading,
  ]);

  const [
    fetchAllProjectsTotalRequests,
    { isLoading: isAllProjectsTotalRequestsLoading },
  ] = useLazyFetchAllProjectsTotalRequestsQuery();

  useEffect(() => {
    if (!skipJWTsFetching) {
      fetchAllProjectsTotalRequests({
        group,
        interval: timeframeToIntervalMap[timeframe],
        gateway,
      });
    }
  }, [
    fetchAllProjectsTotalRequests,
    gateway,
    group,
    skipJWTsFetching,
    timeframe,
  ]);

  return {
    amount: amount.toString(),
    data,
    isLoading:
      projectsLoading ||
      areAllProjectsStatsLoading ||
      isAllProjectsTotalRequestsLoading,
  };
};
