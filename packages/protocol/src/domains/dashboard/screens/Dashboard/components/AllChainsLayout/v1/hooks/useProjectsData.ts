import { useEffect } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import {
  selectProjectsStats,
  selectProjectsTotalRequestNumber,
} from 'domains/dashboard/store/selectors/v1';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchAllProjectsStatsQuery } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyFetchAllProjectsTotalRequestsQuery } from 'domains/dashboard/actions/fetchAllProjectsTotalRequests';
import { useLazyFetchAllJwtTokenRequestsQuery } from 'domains/jwtToken/action/getAllJwtToken';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useProjectsData = (timeframe: Timeframe) => {
  const amount = useAppSelector(selectProjectsTotalRequestNumber);
  const data = useAppSelector(selectProjectsStats);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetchAllJwtTokenRequests, { isLoading: areProjectsLoading }] =
    useLazyFetchAllJwtTokenRequestsQuery();

  const projects = useAppSelector(selectJwtTokens);

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetchAllProjectsStats, { isLoading: areAllProjectsStatsLoading }] =
    useLazyFetchAllProjectsStatsQuery();

  const { gateway } = useMultiServiceGateway();

  useEffect(() => {
    const shouldFetch =
      projects &&
      !areProjectsLoading &&
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
    areProjectsLoading,
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
    if (!isEnterpriseStatusLoading && !isEnterpriseClient) {
      fetchAllJwtTokenRequests({
        group,
      });
      fetchAllProjectsTotalRequests({
        group,
        interval: timeframeToIntervalMap[timeframe],
        gateway,
      });
    }
  }, [
    group,
    timeframe,
    gateway,
    fetchAllProjectsTotalRequests,
    isEnterpriseClient,
    isEnterpriseStatusLoading,
    fetchAllJwtTokenRequests,
  ]);

  return {
    amount: amount.toString(),
    data,
    isLoading:
      areProjectsLoading ||
      areAllProjectsStatsLoading ||
      isAllProjectsTotalRequestsLoading,
  };
};
