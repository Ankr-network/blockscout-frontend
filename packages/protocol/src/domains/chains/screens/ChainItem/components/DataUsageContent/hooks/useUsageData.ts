import { UsageData } from '../types';
import { getUsageData } from '../utils/getUsageData';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { usePublicStats } from './usePublicStats';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';
import { useUserTopRequests } from 'domains/chains/hooks/useUserTopRequests';
import { useUserRequestsByIp } from 'domains/chains/hooks/useUserRequestsByIp';
import { useMonthPrivateStats } from 'domains/chains/hooks/useMonthPrivateStats';

export const useUsageData = (chainId: string): UsageData => {
  const { isWalletConnected, loading: isConnecting } = useAuth();
  const [statsTimeframe, , setStatsTimeframe] = useStatsTimeframe(true);

  const publicStats = usePublicStats({
    chainId,
    isWalletConnected,
    statsTimeframe,
  });

  const [{ stats: privateStats = {} }, arePrivateStatsLoading] =
    usePrivateStats({ isWalletConnected, statsTimeframe });

  const userTopRequests = useUserTopRequests({
    privateStats,
    chainId,
    statsTimeframe,
  });

  const [{ stats: day30PrivateStats = {} }, areDay30PrivateStatsLoading] =
    useMonthPrivateStats({
      isWalletConnected,
    });

  const userTopRequestsIp = useUserRequestsByIp({ day30PrivateStats, chainId });

  return getUsageData({
    arePrivateStatsLoading:
      arePrivateStatsLoading && areDay30PrivateStatsLoading,
    isConnecting,
    isWalletConnected,
    privateStats: privateStats[chainId],
    publicStats,
    userTopRequests,
    userTopRequestsIp,
    setStatsTimeframe,
    statsTimeframe,
  });
};
