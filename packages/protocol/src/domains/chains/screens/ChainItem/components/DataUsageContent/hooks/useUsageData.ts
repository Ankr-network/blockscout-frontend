import { UsageData } from '../types';
import { getUsageData } from '../utils/getUsageData';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePublicStats } from './usePublicStats';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';

export const useUsageData = (chainId: string): UsageData => {
  const { isWalletConnected } = useAuth();
  const [statsTimeframe, switchStatsTimeframe, setStatsTimeframe] =
    useStatsTimeframe(isWalletConnected);

  const publicStats = usePublicStats({ chainId, statsTimeframe });

  const [{ stats: privateStats = {} }, arePrivateStatsLoading] =
    usePrivateStats({ isWalletConnected, statsTimeframe });

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
