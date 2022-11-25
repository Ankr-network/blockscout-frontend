import { IJwtToken } from 'multirpc-sdk';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import {
  timeframeToIntervalMap,
  toTimeframeMap,
} from 'domains/chains/constants/timeframeToIntervalMap';
import { usePublicRequestsCountStats } from 'domains/chains/hooks/usePublicRequestsCountStats';
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
  const {
    credentials,
    loading: isConnecting,
    isWalletConnected,
    isLoggedIn,
  } = useAuth();

  const hasCredentials = Boolean(credentials);

  const [publicChains, publicAllChains, publicChainsLoading] =
    usePublicChains(credentials);
  const [privateChains, privateAllChains, privateChainsLoading] =
    usePrivateChains(credentials);

  const [timeframe, switchStatsTimeframe] = useTimeframe(hasCredentials);

  usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
    hasCredentials,
  });

  usePublicRequestsCountStats({
    interval: toTimeframeMap[timeframe],
    hasCredentials,
  });

  const [sortType, setSortType] = useSortType(isLoggedIn);

  // console.log(sortType);

  return {
    chains: hasCredentials ? privateChains : publicChains,
    allChains: hasCredentials ? privateAllChains : publicAllChains,
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
