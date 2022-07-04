import { POLL_INTERVAL } from '../const';
import { UsageData } from '../types';
import { getUsageData } from '../utils/getUsageData';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePublicStats } from './usePublicStats';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';

export const useUsageData = (chainId: string): UsageData => {
  const { isWalletConnected } = useAuth();
  const [statsTimeframe, switchStatsTimeframe, setStatsTimeframe] =
    useStatsTimeframe(isWalletConnected);

  const publicStats = usePublicStats({
    chainId,
    isWalletConnected,
    statsTimeframe,
  });

  const [{ stats: privateStats = {} }, arePrivateStatsLoading] =
    usePrivateStats({ isWalletConnected, poll: POLL_INTERVAL, statsTimeframe });

  return getUsageData({
    arePrivateStatsLoading,
    isWalletConnected,
    privateStats: privateStats[chainId],
    publicStats,
    setStatsTimeframe,
    statsTimeframe,
    switchStatsTimeframe,
  });
};
