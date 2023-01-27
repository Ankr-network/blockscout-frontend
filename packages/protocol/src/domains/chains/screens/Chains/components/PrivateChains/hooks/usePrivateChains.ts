import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { usePrivateStats } from './usePrivateStats';
import { sortPrivateChains } from './utils';
import {
  formatChains,
  getChainsDictionary,
} from 'domains/chains/components/ChainsList/ChainsListUtils';

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
}

export const usePrivateChains = ({
  chains,
  allChains,
  sortType,
}: ChainsParams) => {
  const [stats] = usePrivateStats();

  const processedChains = useMemo(
    () =>
      sortPrivateChains({
        chains: formatChains(chains),
        sortType,
        stats,
      }),
    [stats, chains, sortType],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};
