import { useEffect } from 'react';

import { Timeframe } from 'domains/chains/types';
import {
  selectProjectsStats,
  selectProjectsTotalRequestNumber,
} from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchAllProjectsStatsQuery } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useLazyFetchAllProjectsTotalRequestsQuery } from 'domains/dashboard/actions/fetchAllProjectsTotalRequests';
import { useLazyFetchAllJwtTokenRequestsQuery } from 'domains/jwtToken/action/getAllJwtToken';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { selectEnterpriseApiKeysAsJwtManagerTokens } from 'domains/enterprise/store/selectors';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

export const useProjectsData = (timeframe: Timeframe) => {
  const amount = useAppSelector(selectProjectsTotalRequestNumber);
  const data = useAppSelector(selectProjectsStats);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetchAllJwtTokenRequests, { isLoading: areProjectsLoading }] =
    useLazyFetchAllJwtTokenRequestsQuery();

  const projects = useAppSelector(selectJwtTokens);
  const { apiKeys: enterpriseProjects } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const [fetchAllProjectsStats, { isLoading: areAllProjectsStatsLoading }] =
    useLazyFetchAllProjectsStatsQuery();

  const { gateway } = useMultiServiceGateway();

  useEffect(() => {
    const shouldFetch =
      (projects || enterpriseProjects) &&
      !areProjectsLoading &&
      !isEnterpriseStatusLoading;

    if (shouldFetch) {
      fetchAllProjectsStats({
        group,
        interval: timeframeToIntervalMap[timeframe],
        projects: isEnterpriseClient ? enterpriseProjects : projects,
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
    enterpriseProjects,
    gateway,
    isEnterpriseStatusLoading,
  ]);

  const [
    fetchAllProjectsTotalRequests,
    { isLoading: isAllProjectsTotalRequestsLoading },
  ] = useLazyFetchAllProjectsTotalRequestsQuery();

  useEffect(() => {
    if (!isEnterpriseStatusLoading) {
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
