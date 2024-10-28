import { ChainID, Timeframe } from '@ankr.com/chains-list';

import {
  selectAggregatedStatsByChainFor1hState,
  selectAggregatedStatsByChainFor24hState,
} from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useChainStats = (
  timeframe: Timeframe,
  userEndpointToken?: string,
): { requestsData: Record<ChainID, number> } => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const lastHourAggregatedRequests: Record<ChainID, number> = useAppSelector(
    state =>
      selectAggregatedStatsByChainFor1hState(state, {
        group,
        token: userEndpointToken!,
      }),
  );

  const lastDayAggregatedRequests: Record<ChainID, number> = useAppSelector(
    state =>
      selectAggregatedStatsByChainFor24hState(state, {
        group,
        token: userEndpointToken!,
      }),
  );

  const requestsData =
    timeframe === Timeframe.Hour
      ? lastHourAggregatedRequests
      : lastDayAggregatedRequests;

  return { requestsData };
};
