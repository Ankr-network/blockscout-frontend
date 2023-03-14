import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePrivateChainsInfo } from './usePrivateChainsInfo';
import { useSortType } from '../../../hooks/useSortType';
import { useTimeframe } from '../../../hooks/useTimeframe';

export const usePrivateChainsData = () => {
  const { loading: isConnecting, isLoggedIn, hasWeb3Connection } = useAuth();

  const [privateChains, privateAllChains, privateChainsLoading] =
    usePrivateChainsInfo(hasWeb3Connection);

  const [timeframe, switchStatsTimeframe] = useTimeframe(isLoggedIn);

  usePrivateStats({
    interval: timeframeToIntervalMap[timeframe],
  });

  const [sortType, setSortType] = useSortType();

  return {
    chains: privateChains,
    allChains: privateAllChains,
    loading: isConnecting || privateChainsLoading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  };
};
