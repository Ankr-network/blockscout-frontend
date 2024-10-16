import { useProjectChainsStatsFor1h } from 'domains/projects/hooks/useProjectChainsStatsFor1h';
import { useProjectChainsStatsFor24h } from 'domains/projects/hooks/useProjectChainsStatsFor24h';
import { useProjectStatsParams } from 'modules/stats/hooks/useProjectStatsParams';
import { useProjectTotalRequestsForLastTwoDays } from 'domains/projects/hooks/useProjectTotalRequestsForLastTwoDays';
import { useProjectTotalRequestsForLastTwoHours } from 'domains/projects/hooks/useProjectTotalRequestsForLastTwoHours';

interface IUseProjectStatsInitializationProps {
  skipRelativeRequests?: boolean;
  userEndpointToken: string | undefined;
}

export const useProjectStatsInitialization = ({
  skipRelativeRequests,
  userEndpointToken,
}: IUseProjectStatsInitializationProps) => {
  const { statsParams } = useProjectStatsParams(userEndpointToken);

  const chainsStatsParams = {
    ...statsParams,
    skipFetching: !userEndpointToken,
  };

  const { projectChainsStatsFor1h } =
    useProjectChainsStatsFor1h(chainsStatsParams);

  const { projectChainsStatsFor24h } =
    useProjectChainsStatsFor24h(chainsStatsParams);

  const totalRequestsParams = {
    ...chainsStatsParams,
    skipFetching: chainsStatsParams.skipFetching || skipRelativeRequests,
  };

  const { projectTotalRequestsForLastTwoHours } =
    useProjectTotalRequestsForLastTwoHours(totalRequestsParams);

  const { projectTotalRequestsForLastTwoDays } =
    useProjectTotalRequestsForLastTwoDays(totalRequestsParams);

  return {
    projectTotalRequestsForLastTwoHours,
    projectTotalRequestsForLastTwoDays,
    projectChainsStatsFor1h,
    projectChainsStatsFor24h,
    statsParams,
  };
};
