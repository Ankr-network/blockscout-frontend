import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';
import {
  formatChains,
  getChainsDictionary,
} from 'domains/chains/components/ChainsList/ChainsListUtils';
import { filteredByNameChains } from '../../PublicChains/hooks/utils';

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
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
        chains: formatChains(chains),
        sortType,
        stats,
      }).filter(item => filteredByNameChains(item, searchContent)),
    [stats, chains, sortType, searchContent],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
