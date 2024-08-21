import { skipToken } from '@reduxjs/toolkit/query';

import { useFetchProjectChainsStatsFor1hQuery } from 'domains/projects/actions/fetchProjectChainsStatsFor1h';
import { useFetchProjectChainsStatsFor24hQuery } from 'domains/projects/actions/fetchProjectChainsStatsFor24h';
import { useProjectStatsParams } from 'modules/stats/hooks/useProjectStatsParams';
import { useFetchProjectTotalRequestsForLastTwoDaysQuery } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoDays';
import { useFetchProjectTotalRequestsForLastTwoHoursQuery } from 'domains/projects/actions/fetchProjectTotalRequestsForLastTwoHours';

interface IUseProjectStatsInitializationProps {
  userEndpointToken?: string;
  skipRelativeRequests?: boolean;
}

export const useProjectStatsInitialization = ({
  skipRelativeRequests,
  userEndpointToken,
}: IUseProjectStatsInitializationProps) => {
  const { statsParams = skipToken } = useProjectStatsParams(userEndpointToken);

  const { data: dataProjectChainsStatsFor1h } =
    useFetchProjectChainsStatsFor1hQuery(statsParams);
  const { data: dataProjectChainsStatsFor24h } =
    useFetchProjectChainsStatsFor24hQuery(statsParams);

  const { data: dataProjectTotalRequestsForLastTwoHours } =
    useFetchProjectTotalRequestsForLastTwoHoursQuery(
      skipRelativeRequests ? skipToken : statsParams,
    );
  const { data: dataProjectTotalRequestsForLastTwoDays } =
    useFetchProjectTotalRequestsForLastTwoDaysQuery(
      skipRelativeRequests ? skipToken : statsParams,
    );

  return {
    dataProjectTotalRequestsForLastTwoHours,
    dataProjectTotalRequestsForLastTwoDays,
    dataProjectChainsStatsFor1h,
    dataProjectChainsStatsFor24h,
    statsParams,
  };
};
