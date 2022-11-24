import BigNumber from 'bignumber.js';

import { Chain } from '../../ChainsList/ChainsListTypes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';
import { useQuery } from '@redux-requests/react';
import { fetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';

export interface ChainsItemParams {
  chain: Chain;
}

export const useQueryChainsItem = ({
  chain: { id: chainId },
}: ChainsItemParams): [BigNumber, boolean, boolean] => {
  const { isWalletConnected, credentials } = useAuth();
  const isPremium = !!credentials;

  const { data, loading: arePublicStatsLoading } = useQuery({
    type: fetchPublicRequestsCountStats,
  });

  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  return isWalletConnected
    ? [new BigNumber(privateTotalRequests), arePrivateStatsLoading, isPremium]
    : [new BigNumber(data?.[chainId] ?? 0), arePublicStatsLoading, isPremium];
};
