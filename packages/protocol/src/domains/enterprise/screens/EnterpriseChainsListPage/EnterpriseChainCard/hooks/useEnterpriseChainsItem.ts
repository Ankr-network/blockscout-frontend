import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { getChainIDs } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/utils/getChainIDs';

import { useEnterpriseStats } from './useEnterpriseStats';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
}

export const useEnterpriseChainsItem = ({ chain }: ChainsItemParams) => {
  const { hasConnectWalletMessage } = useAuth();

  const ids = useMemo(() => getChainIDs(chain), [chain]);
  const [enterpriseTotalRequests = 0, areEnterpriseStatsLoading] =
    useEnterpriseStats(ids);

  return {
    totalRequests: new BigNumber(enterpriseTotalRequests),
    loading: areEnterpriseStatsLoading,
    hasConnectWalletMessage,
  };
};
