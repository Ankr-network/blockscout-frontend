import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType, StatsTimeframe } from 'domains/chains/types';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { usePublicChains } from './usePublicChains';
import { useSortType } from './useSortType';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';

export interface Chains {
  chains: IApiChain[];
  isWalletConnected: boolean;
  loading: boolean;
  setSortType: (type: SortType) => void;
  sortType: SortType;
  statsTimeframe: StatsTimeframe;
  switchStatsTimeframe: () => void;
}

export const useChains = (): Chains => {
  const { isWalletConnected } = useAuth();
  const [chains, loading] = usePublicChains();
  const [statsTimeframe, switchStatsTimeframe] =
    useStatsTimeframe(isWalletConnected);

  usePrivateStats({ isWalletConnected, statsTimeframe });

  const [sortType, setSortType] = useSortType();

  return {
    chains,
    isWalletConnected,
    loading,
    setSortType,
    sortType,
    statsTimeframe,
    switchStatsTimeframe,
  };
};
