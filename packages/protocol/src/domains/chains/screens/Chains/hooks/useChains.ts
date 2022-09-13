import { IJwtToken } from 'multirpc-sdk';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { SortType, Timeframe } from 'domains/chains/types';
import { usePrivateChains } from './usePrivateChains';
import { usePublicChains } from './usePublicChains';
import { useSortType } from './useSortType';
import { useTimeframe } from './useTimeframe';

export interface Chains {
  chains: IApiChain[];
  allChains: IApiChain[];
  credentials?: IJwtToken;
  isConnecting: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  setSortType: (type: SortType) => void;
  sortType: SortType;
  switchStatsTimeframe: () => void;
  timeframe: Timeframe;
}

export const useChains = (): Chains => {
  const { credentials, loading: isConnecting, isWalletConnected } = useAuth();

  const [publicChains, publicAllChains, publicChainsLoading] =
    usePublicChains(credentials);
  const [privateChains, privateAllChains, privateChainsLoading] =
    usePrivateChains(credentials);

  const [timeframe, switchStatsTimeframe] = useTimeframe(isWalletConnected);

  usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
    isWalletConnected,
  });

  const [sortType, setSortType] = useSortType(isWalletConnected);

  return {
    chains: credentials ? privateChains : publicChains,
    allChains: credentials ? privateAllChains : publicAllChains,
    credentials,
    isConnecting,
    isWalletConnected,
    loading: isConnecting || publicChainsLoading || privateChainsLoading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
