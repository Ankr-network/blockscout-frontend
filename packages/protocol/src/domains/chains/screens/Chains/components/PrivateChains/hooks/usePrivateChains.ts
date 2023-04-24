import { useMemo } from 'react';

import { SortType, Chain } from 'domains/chains/types';
import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { filteredByNameChains } from '../../PublicChains/hooks/utils';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';

export interface ChainsParams {
  chains: Chain[];
  allChains: Chain[];
  sortType: SortType;
  searchContent: string;
}

export const usePrivateChains = ({
  chains,
  allChains,
  sortType,
  searchContent,
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
        .filter(excludeMultiChain),
    [stats, chains, sortType, searchContent],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
