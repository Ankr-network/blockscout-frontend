import { ChainID, Timeframe } from 'modules/chains/types';
import { useProjectStatsInitialization } from 'domains/projects/screens/Project/hooks/useProjectStatsInitialization';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';
import { IFetchProjectChainsStatsFor1hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor1h';
import { IFetchProjectChainsStatsFor24hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor24h';

export const useChainProjectRequestsData = (
  chainId: ChainID,
  timeframe: Timeframe,
  userEndpointToken?: string,
) => {
  const { statsParams } = useProjectStatsInitialization({
    userEndpointToken,
    skipRelativeRequests: true,
  });

  const currentChainRequestsFor1h = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(
      state,
      chainId,
      statsParams as IFetchProjectChainsStatsFor1hParams,
    ),
  );

  const currentChainRequestsFor24h = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(
      state,
      chainId,
      statsParams as IFetchProjectChainsStatsFor24hParams,
    ),
  );

  const currentChainRequestsData =
    timeframe === Timeframe.Hour
      ? currentChainRequestsFor1h
      : currentChainRequestsFor24h;

  return {
    currentChainRequestsData,
  };
};
