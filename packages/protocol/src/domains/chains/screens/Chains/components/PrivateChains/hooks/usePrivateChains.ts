import { useMemo } from 'react';

import { SortType, Chain } from 'domains/chains/types';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';

import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';
import { filteredByNameChains } from '../../PublicChains/hooks/utils';

export interface ChainsParams {
  chains: Chain[];
  allChains: Chain[];
  sortType: SortType;
  searchContent: string;
  includeMultichain?: boolean;
}

export const usePrivateChains = ({
  chains,
  allChains,
  sortType,
  searchContent,
  includeMultichain = false,
}: ChainsParams) => {
  const [stats] = usePrivateStats();

  const processedChains = useMemo(
    () =>
      sortPrivateChains({
        chains,
        sortType,
        stats,
      })
        .filter(item => filteredByNameChains(item, searchContent))
        .filter(includeMultichain ? Boolean : excludeMultiChain),
    [stats, chains, sortType, searchContent, includeMultichain],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
