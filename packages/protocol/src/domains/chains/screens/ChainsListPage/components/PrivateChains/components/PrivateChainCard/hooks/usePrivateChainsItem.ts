import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { getChainIDs } from '../../../utils/getChainIDs';
import { usePrivateStats } from './usePrivateStats';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
}

export const usePrivateChainsItem = ({ chain }: ChainsItemParams) => {
  const { hasConnectWalletMessage } = useAuth();

  const ids = useMemo(() => getChainIDs(chain), [chain]);
  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(ids);

  return {
    totalRequests: new BigNumber(privateTotalRequests),
    loading: arePrivateStatsLoading,
    hasConnectWalletMessage,
  };
};
