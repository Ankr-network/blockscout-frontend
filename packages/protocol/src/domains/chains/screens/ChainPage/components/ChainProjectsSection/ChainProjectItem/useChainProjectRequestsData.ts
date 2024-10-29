import { ChainID, Timeframe } from '@ankr.com/chains-list';

import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectStatsInitialization } from 'domains/projects/screens/Project/hooks/useProjectStatsInitialization';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useChainProjectRequestsData = (
  chainId: ChainID,
  timeframe: Timeframe,
  userEndpointToken?: string,
) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { projectTotalRequestsLoading } = useProjectStatsInitialization({
    userEndpointToken,
  });

  const currentChainRequestsFor1h = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(state, chainId, {
      group,
      token: userEndpointToken!,
    }),
  );

  const currentChainRequestsFor24h = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(state, chainId, {
      group,
      token: userEndpointToken!,
    }),
  );

  const currentChainRequestsData =
    timeframe === Timeframe.Hour
      ? currentChainRequestsFor1h
      : currentChainRequestsFor24h;

  return { currentChainRequestsData, projectTotalRequestsLoading };
};
