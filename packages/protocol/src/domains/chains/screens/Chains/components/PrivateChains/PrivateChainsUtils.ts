import { useAuth } from 'domains/auth/hooks/useAuth';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePrivateChains } from './usePrivateChains';
import { useSortType } from '../../hooks/useSortType';
import { useTimeframe } from '../../hooks/useTimeframe';
import { useEffect } from 'react';

export const usePrivateChainsData = () => {
  const {
    loading: isConnecting,
    isLoggedIn,
    hasInfrastructureAccess,
  } = useAuth();

  const [
    privateChains,
    privateAllChains,
    privateChainsLoading,
    fetchPrivateChainsInfo,
  ] = usePrivateChains();

  useEffect(() => {
    if (hasInfrastructureAccess) {
      fetchPrivateChainsInfo();
    }
  }, [hasInfrastructureAccess, fetchPrivateChainsInfo]);

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
