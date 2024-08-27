import { useMemo } from 'react';

import { SortType, Chain } from 'modules/chains/types';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';

import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';

export interface ChainsParams {
  chains: Chain[];
  allChains: Chain[];
  sortType: SortType;
  searchContent: string;
  includeMultichain?: boolean;
}

export const usePrivateChains = ({
  allChains,
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

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
