import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePrivateChains } from './usePrivateChains';
import { useSortType } from '../../hooks/useSortType';
import { useTimeframe } from '../../hooks/useTimeframe';

export const usePrivateChainsData = () => {
  const {
    credentials,
    loading: isConnecting,
    isWalletConnected,
    isLoggedIn,
  } = useAuth();

  const [privateChains, privateAllChains, privateChainsLoading] =
    usePrivateChains();

  const [timeframe, switchStatsTimeframe] = useTimeframe(isLoggedIn);

  usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
  });

  const [sortType, setSortType] = useSortType(isLoggedIn);

  return {
    chains: privateChains,
    allChains: privateAllChains,
    credentials,
    isConnecting,
    isWalletConnected,
    loading: isConnecting || privateChainsLoading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
