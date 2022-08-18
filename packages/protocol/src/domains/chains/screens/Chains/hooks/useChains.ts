import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType, StatsTimeframe } from 'domains/chains/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePublicChains } from './usePublicChains';
import { useSortType } from './useSortType';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { IJwtToken } from 'multirpc-sdk';
import { usePrivateChains } from './usePrivateChains';

export interface Chains {
  chains: IApiChain[];
  credentials?: IJwtToken;
  isConnecting: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  setSortType: (type: SortType) => void;
  sortType: SortType;
  statsTimeframe: StatsTimeframe;
  switchStatsTimeframe: () => void;
}

export const useChains = (): Chains => {
  const { credentials, loading: isConnecting, isWalletConnected } = useAuth();

  const [publicChains, publicChainsLoading] = usePublicChains(credentials);
  const [privateChains, privateChainsLoading] = usePrivateChains(credentials);

  const [statsTimeframe, switchStatsTimeframe] =
    useStatsTimeframe(isWalletConnected);

  usePrivateStats({ isWalletConnected, statsTimeframe });

  const [sortType, setSortType] = useSortType(isWalletConnected);

  return {
    chains: credentials ? privateChains : publicChains,
    credentials,
    isConnecting,
    isWalletConnected,
    loading: isConnecting || publicChainsLoading || privateChainsLoading,
    setSortType,
    sortType,
    statsTimeframe,
    switchStatsTimeframe,
  };
};
