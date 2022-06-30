import { useMemo } from 'react';

import { Chain } from '../ChainsListTypes';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { formatChains, sortChains } from '../ChainsListUtils';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';

export interface ChainsParams {
  chains: IApiChain[];
  sortType: SortType;
}

export const useChains = ({ chains, sortType }: ChainsParams): Chain[] => {
  const { isWalletConnected } = useAuth();
  const [stats] = usePrivateStats();

  return useMemo(
    () =>
      sortChains({
        chains: formatChains(chains),
        isWalletConnected,
        sortType,
        stats,
      }),
    [isWalletConnected, stats, chains, sortType],
  );
};
