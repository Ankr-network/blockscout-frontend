import { Chain, ESortChainsType } from '@ankr.com/chains-list';
import { PrivateStats } from 'multirpc-sdk';
import { useMemo } from 'react';

import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';

import { sortPrivateChains } from './utils';

export interface ChainsParams {
  chains: Chain[];
  includeMultichain?: boolean;
  searchContent: string;
  sortType: ESortChainsType;
  stats: PrivateStats;
}

export const usePrivateChains = ({
  chains,
  includeMultichain = false,
  searchContent,
  sortType,
  stats,
}: ChainsParams) => {
  const processedChains = useMemo(
    () =>
      sortPrivateChains({
        chains,
        sortType,
        stats,
      })
        .filter(item => getFilteredChainsByName(item, searchContent))
        .filter(includeMultichain ? Boolean : excludeMultiChain),
    [stats, chains, sortType, searchContent, includeMultichain],
  );

  return { processedChains };
};
