import { PrivateStatsInterval } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { selectAggregatedByChainPrivateStats } from 'domains/projects/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useChainStats = (
  timeframe: Timeframe,
  userEndpointToken?: string,
) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const token = userEndpointToken!;

  const lastHourAggregatedRequests = useAppSelector(state =>
    selectAggregatedByChainPrivateStats(state, {
      group,
      interval: PrivateStatsInterval.HOUR,
      token,
    }),
  );

  const lastDayAggregatedRequests = useAppSelector(state =>
    selectAggregatedByChainPrivateStats(state, {
      group,
      interval: PrivateStatsInterval.DAY,
      token,
    }),
  );

  const requestsData =
    timeframe === Timeframe.Hour
      ? lastHourAggregatedRequests
      : lastDayAggregatedRequests;

  return { requestsData };
};
