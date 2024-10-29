import { StatsByRangeDuration } from 'multirpc-sdk';

import { useProjectChainsStatsFor1h } from 'domains/projects/hooks/useProjectChainsStatsFor1h';
import { useProjectChainsStatsFor24h } from 'domains/projects/hooks/useProjectChainsStatsFor24h';
import { useProjectTotalRequests } from 'domains/projects/hooks/useProjectTotalRequests';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface IUseProjectStatsInitializationProps {
  userEndpointToken: string | undefined;
}

export const useProjectStatsInitialization = ({
  userEndpointToken,
}: IUseProjectStatsInitializationProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const chainsStatsParams = {
    group,
    token: userEndpointToken!,
    skipFetching: !userEndpointToken,
  };

  const { projectChainsStatsFor1h } =
    useProjectChainsStatsFor1h(chainsStatsParams);

  const { projectChainsStatsFor24h } =
    useProjectChainsStatsFor24h(chainsStatsParams);

  const skipFetching = !userEndpointToken;

  const {
    loading: projectTotalRequestsForLastTwoHoursLoading,
    projectTotalRequests: projectTotalRequestsForLastTwoHours,
  } = useProjectTotalRequests({
    duration: StatsByRangeDuration.TWO_HOURS,
    group,
    skipFetching,
    token: userEndpointToken!,
  });

  const {
    loading: projectTotalRequestsForLastTwoDaysLoading,
    projectTotalRequests: projectTotalRequestsForLastTwoDays,
  } = useProjectTotalRequests({
    duration: StatsByRangeDuration.TWO_DAYS,
    group,
    skipFetching,
    token: userEndpointToken!,
  });

  const projectTotalRequestsLoading =
    projectTotalRequestsForLastTwoHoursLoading ||
    projectTotalRequestsForLastTwoDaysLoading;

  return {
    projectChainsStatsFor1h,
    projectChainsStatsFor24h,
    projectTotalRequestsForLastTwoDays,
    projectTotalRequestsForLastTwoHours,
    projectTotalRequestsLoading,
  };
};
