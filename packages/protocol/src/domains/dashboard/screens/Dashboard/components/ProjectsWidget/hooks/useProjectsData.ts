import { Timeframe } from 'domains/chains/types';
import { getAllProjectsStatsArgs } from '../utils/getAllProjectStatsArgs';
import { getProjectsStatsParams } from '../utils/getProjectsStatsParams';
import {
  selectProjectsStats,
  selectProjectsTotalRequestNumber,
} from 'domains/dashboard/store/selectors';
import { useAllProjects } from 'domains/jwtToken/hooks/useAllProjects';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchAllProjectsStatsQuery } from 'domains/dashboard/actions/fetchAllProjectsStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useFetchAllProjectsTotalRequestsQuery } from 'domains/dashboard/actions/fetchAllProjectsTotalRequests';

export const useProjectsData = (timeframe: Timeframe) => {
  const amount = useAppSelector(selectProjectsTotalRequestNumber);
  const data = useAppSelector(selectProjectsStats);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isLoading: areProjectsLoading } = useAllProjects();

  const { isLoading: areAllProjectsStatsLoading } =
    useFetchAllProjectsStatsQuery(
      getAllProjectsStatsArgs({ areProjectsLoading, group, timeframe }),
    );

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
