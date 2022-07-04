import BigNumber from 'bignumber.js';

import { StatsTimeframe } from 'domains/chains/types';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';
import { useStatsTimeframe } from 'domains/chains/hooks/useStatsTimeframe';

export interface UsageSummary {
  loading: boolean;
  statsTimeframe: StatsTimeframe;
  switchStatsTimeframe: () => void;
  totalRequests: BigNumber;
}

const requestKey = 'chain-usage-summary';

export const useUsageSummary = (chainId: string): UsageSummary => {
  const { isWalletConnected } = useAuth();
  const [statsTimeframe, switchStatsTimeframe] =
    useStatsTimeframe(isWalletConnected);

  const [{ stats } = { stats: {} }, loading] = usePrivateStats({
    isWalletConnected,
    requestKey,
    statsTimeframe,
  });

  return {
    loading,
    statsTimeframe,
    switchStatsTimeframe,
    totalRequests: new BigNumber(stats?.[chainId].totalRequests || 0),
  };
};
