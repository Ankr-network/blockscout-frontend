import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectAggregatedStatsByChainFor1hState,
  selectAggregatedStatsByChainFor24hState,
} from 'domains/projects/store';
import { useProjectStatsParams } from 'modules/stats/hooks/useProjectStatsParams';
import { IFetchProjectChainsStatsFor1hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor1h';
import { IFetchProjectChainsStatsFor24hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor24h';

export const useChainStats = (
  timeframe: Timeframe,
  userEndpointToken?: string,
): { requestsData: Record<ChainID, number> } => {
  const { statsParams } = useProjectStatsParams(userEndpointToken);

  const lastHourAggregatedRequests: Record<ChainID, number> = useAppSelector(
    state =>
      selectAggregatedStatsByChainFor1hState(
        state,
        statsParams as IFetchProjectChainsStatsFor1hParams,
      ),
  );

  const lastDayAggregatedRequests: Record<ChainID, number> = useAppSelector(
    state =>
      selectAggregatedStatsByChainFor24hState(
        state,
        statsParams as IFetchProjectChainsStatsFor24hParams,
      ),
  );

  const requestsData =
    timeframe === Timeframe.Hour
      ? lastHourAggregatedRequests
      : lastDayAggregatedRequests;

  return {
    requestsData,
  };
};
