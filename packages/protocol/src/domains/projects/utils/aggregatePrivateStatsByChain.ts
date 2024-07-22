import { PrivateStatsInternal } from 'multirpc-sdk';

import { RootState } from 'store';
import {
  selectAllPathsByChainId,
  selectBlockchainBySubchainId,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { ChainID } from 'modules/chains/types';

export const aggregatePrivateStatsByChain = (
  state: RootState,
  stats: PrivateStatsInternal,
) => {
  const mappedData = Object.keys(stats).reduce((acc, chainPath) => {
    const [currentChainId] = selectChainIdsByPaths(state, [chainPath]);
    const currentChainMainId = selectBlockchainBySubchainId(
      state,
      currentChainId,
    )?.id;

    if (!currentChainMainId) return acc;

    const subchainPaths = selectAllPathsByChainId(state, currentChainMainId);

    const aggregatedStatsByChain = subchainPaths.reduce(
      (aggregatedStats, path) => {
        const currentSubchainIdStats = Number(stats[path]?.total_requests ?? 0);

        return aggregatedStats + currentSubchainIdStats;
      },
      0,
    );

    return {
      ...acc,
      [currentChainMainId]: aggregatedStatsByChain,
    };
  }, {} as Record<ChainID, number>);

  return mappedData;
};
