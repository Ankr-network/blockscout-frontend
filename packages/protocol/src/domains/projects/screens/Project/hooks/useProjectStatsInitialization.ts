import { StatsByRangeDuration } from 'multirpc-sdk';

import { useProjectChainsStatsFor1h } from 'domains/projects/hooks/useProjectChainsStatsFor1h';
import { useProjectChainsStatsFor24h } from 'domains/projects/hooks/useProjectChainsStatsFor24h';
import { useProjectTotalRequests } from 'domains/projects/hooks/useProjectTotalRequests';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

interface IUseProjectStatsInitializationProps {
  skipRelativeRequests?: boolean;
  userEndpointToken: string | undefined;
}

export const useProjectStatsInitialization = ({
  skipRelativeRequests,
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

  const skipFetchingTotalRequests = !userEndpointToken || skipRelativeRequests;

  const { projectTotalRequests: projectTotalRequestsForLastTwoHours } =
    useProjectTotalRequests({
      duration: StatsByRangeDuration.TWO_HOURS,
      group,
      skipFetching: skipFetchingTotalRequests,
      token: userEndpointToken!,
    });

  const { projectTotalRequests: projectTotalRequestsForLastTwoDays } =
    useProjectTotalRequests({
      duration: StatsByRangeDuration.TWO_DAYS,
      group,
      skipFetching: skipFetchingTotalRequests,
      token: userEndpointToken!,
    });

  return {
    projectTotalRequestsForLastTwoHours,
    projectTotalRequestsForLastTwoDays,
    projectChainsStatsFor1h,
    projectChainsStatsFor24h,
  };
};
