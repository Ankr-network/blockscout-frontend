import BigNumber from 'bignumber.js';
import { Chain, Timeframe } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { getChainIDs } from '../../../utils/getChainIDs';
import { usePrivateStatsByChainIDs } from './usePrivateStatsByChainIDs';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
  timeframe: Timeframe;
}

export const usePrivateChainsItem = ({
  chain,
  timeframe,
}: ChainsItemParams) => {
  const { hasConnectWalletMessage } = useAuth();

  const ids = useMemo(() => getChainIDs(chain), [chain]);
  const [privateTotalRequests = 0, loading] = usePrivateStatsByChainIDs({
    ids,
    timeframe,
  });

  return {
    hasConnectWalletMessage,
    loading,
    totalRequests: new BigNumber(privateTotalRequests),
  };
};
