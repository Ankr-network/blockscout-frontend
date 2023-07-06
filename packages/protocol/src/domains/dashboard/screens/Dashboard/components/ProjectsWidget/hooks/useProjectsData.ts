import { useEffect } from 'react';

import { Timeframe } from 'domains/chains/types';
import { getProjectsStatsParams } from '../utils/getProjectsStatsParams';
import {
  selectProjectsStats,
  selectProjectsTotalRequestNumber,
} from 'domains/dashboard/store/selectors';
import { useAllProjects } from 'domains/jwtToken/hooks/useAllProjects';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchAllProjectsStatsQuery } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useFetchAllProjectsTotalRequestsQuery } from 'domains/dashboard/actions/fetchAllProjectsTotalRequests';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { selectJwtTokens } from 'domains/jwtToken/store/selectors';

export const useProjectsData = (timeframe: Timeframe) => {
  const amount = useAppSelector(selectProjectsTotalRequestNumber);
  const data = useAppSelector(selectProjectsStats);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoading: areProjectsLoading } = useAllProjects();

  const projects = useAppSelector(selectJwtTokens);

  const [fetchProjectsStats, { isLoading: areAllProjectsStatsLoading }] =
    useLazyFetchAllProjectsStatsQuery();

  useEffect(() => {
    if (projects && !areProjectsLoading) {
      fetchProjectsStats({
        group,
        interval: timeframeToIntervalMap[timeframe],
        projects,
      });
    }
  }, [fetchProjectsStats, areProjectsLoading, timeframe, group, projects]);

  const { isLoading: isAllProjectsTotalRequestsLoading } =
    useFetchAllProjectsTotalRequestsQuery(
      getProjectsStatsParams(timeframe, group),
    );

  return {
    amount: amount.toString(),
    data,
    isLoading:
      areProjectsLoading ||
      areAllProjectsStatsLoading ||
      isAllProjectsTotalRequestsLoading,
  };
};
