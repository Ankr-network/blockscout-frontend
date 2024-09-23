import { useMemo } from 'react';
import { ESortChainsType, Chain } from '@ankr.com/chains-list';

import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';

import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';

export interface ChainsParams {
  chains: Chain[];
  sortType: ESortChainsType;
  searchContent: string;
  includeMultichain?: boolean;
}

export const usePrivateChains = ({
  chains,
  includeMultichain = false,
  searchContent,
  sortType,
}: ChainsParams) => {
  const [stats] = usePrivateStats();

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
