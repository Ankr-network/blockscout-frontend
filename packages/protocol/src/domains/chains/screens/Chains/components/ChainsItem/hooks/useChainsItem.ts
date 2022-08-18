import BigNumber from 'bignumber.js';

import { Chain } from '../../ChainsList/ChainsListTypes';
import { StatsTimeframe } from 'domains/chains/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';
import { usePublicStats } from './usePublicStats';

const defaultRequests = new BigNumber(0);

export interface ChainsItemParams {
  chain: Chain;
  statsTimeframe: StatsTimeframe;
}

export const useChainsItem = ({
  chain: { id: chainId, totalRequests: publicTotalRequests = defaultRequests },
  statsTimeframe,
}: ChainsItemParams): [BigNumber, boolean, boolean] => {
  const { isWalletConnected, credentials } = useAuth();
  const isPremium = !!credentials;

  const arePublicStatsLoading = usePublicStats({
    chainId,
    isWalletConnected,
    statsTimeframe,
  });
  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  return isWalletConnected
    ? [new BigNumber(privateTotalRequests), arePrivateStatsLoading, isPremium]
    : [publicTotalRequests, arePublicStatsLoading, isPremium];
};
