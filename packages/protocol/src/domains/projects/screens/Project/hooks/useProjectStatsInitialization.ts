import {
  PrivateStatsInterval,
  StatsByRangeDuration,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { usePrivateStatsByToken } from 'modules/stats/hooks/usePrivateStatsByToken';
import { usePrivateTotalStatsByRange } from 'modules/stats/hooks/usePrivateTotalStatsByRange';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface IUseProjectStatsInitializationProps {
  userEndpointToken: string | undefined;
}

export const useProjectStatsInitialization = ({
  userEndpointToken,
}: IUseProjectStatsInitializationProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const skipFetching = !userEndpointToken;

  const { privateStats: projectChainsStatsFor1h } = usePrivateStatsByToken({
    group,
    interval: PrivateStatsInterval.HOUR,
    token: userEndpointToken!,
    skipFetching,
  });

  const { privateStats: projectChainsStatsFor1d } = usePrivateStatsByToken({
    group,
    interval: PrivateStatsInterval.DAY,
    token: userEndpointToken!,
    skipFetching,
  });

  const {
    loading: projectTotalRequestsForLastTwoHoursLoading,
    totalStatsByRange: projectTotalRequestsForLastTwoHours,
  } = usePrivateTotalStatsByRange({
    duration: StatsByRangeDuration.TWO_HOURS,
    group,
    skipFetching,
    timeframe: StatsByRangeTimeframe.HOUR,
    token: userEndpointToken!,
  });

  const {
    loading: projectTotalRequestsForLastTwoDaysLoading,
    totalStatsByRange: projectTotalRequestsForLastTwoDays,
  } = usePrivateTotalStatsByRange({
    duration: StatsByRangeDuration.TWO_DAYS,
    group,
    skipFetching,
    token: userEndpointToken!,
    timeframe: StatsByRangeTimeframe.HOUR,
  });

  const projectTotalRequestsLoading =
    projectTotalRequestsForLastTwoHoursLoading ||
    projectTotalRequestsForLastTwoDaysLoading;

  return {
    projectChainsStatsFor1h,
    projectChainsStatsFor1d,
    projectTotalRequestsForLastTwoDays,
    projectTotalRequestsForLastTwoHours,
    projectTotalRequestsLoading,
  };
};
