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
  chain: { id, frontChain: { id: frontChainId } = {} },
}: ChainsItemParams): [BigNumber, boolean, boolean, boolean] => {
  const {
    credentials,
    hasOauthLogin,
    hasWeb3Connection,
    isUserEthAddressType,
  } = useAuth();
  const isPremium = Boolean(credentials);

  const { data, loading: arePublicStatsLoading } = useQuery({
    type: fetchPublicRequestsCountStats,
  });

  const chainId = frontChainId || id;
  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin && !hasWeb3Connection && isPremium && isUserEthAddressType,
  );

  return isPremium
    ? [
        new BigNumber(privateTotalRequests),
        arePrivateStatsLoading,
        isPremium,
        hasConnectWalletMessage,
      ]
    : [
        new BigNumber(data?.[chainId] ?? 0),
        arePublicStatsLoading,
        isPremium,
        hasConnectWalletMessage,
      ];
};
