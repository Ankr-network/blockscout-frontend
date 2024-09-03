import { PrivateStats } from 'multirpc-sdk';

import { RootState } from 'store';
import {
  selectAllPathsByChainId,
  selectBlockchainBySubchainId,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { ChainID } from 'modules/chains/types';

import { sumSubchainsTotalRequest } from '../store/utils/sumSubchainsTotalRequest';

export const aggregatePrivateStatsByChain = (
  state: RootState,
  data?: PrivateStats,
): Record<ChainID, number> => {
  if (!data?.stats) return {} as Record<ChainID, number>;

  const mappedData = Object.keys(data?.stats).reduce((acc, chainPath) => {
    const [currentChainId] = selectChainIdsByPaths(state, [chainPath]);
    const currentChainMainId = selectBlockchainBySubchainId(
      state,
      currentChainId,
    )?.id;

    if (!currentChainMainId) return acc;

    const subchainPaths = selectAllPathsByChainId(state, currentChainMainId);

    const aggregatedStatsByChain = sumSubchainsTotalRequest(
      subchainPaths,
      data,
    );

    return {
      ...acc,
      [currentChainMainId]: aggregatedStatsByChain,
    };
  }, {} as Record<ChainID, number>);

  return mappedData;
};
