import { ChainID, Timeframe } from '@ankr.com/chains-list';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { selectProjectTotalRequestsByChain } from 'domains/projects/store';
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

  const token = userEndpointToken!;

  const currentChainRequestsFor1h = useAppSelector(state =>
    selectProjectTotalRequestsByChain(
      state,
      { group, interval: PrivateStatsInterval.HOUR, token },
      chainId,
    ),
  );

  const currentChainRequestsFor1d = useAppSelector(state =>
    selectProjectTotalRequestsByChain(
      state,
      { group, interval: PrivateStatsInterval.DAY, token },
      chainId,
    ),
  );

  const currentChainRequestsData =
    timeframe === Timeframe.Hour
      ? currentChainRequestsFor1h
      : currentChainRequestsFor1d;

  return { currentChainRequestsData, projectTotalRequestsLoading };
};
