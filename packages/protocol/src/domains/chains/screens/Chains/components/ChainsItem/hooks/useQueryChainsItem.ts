import BigNumber from 'bignumber.js';

import { Chain } from '../../ChainsList/ChainsListTypes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';
import { useQuery } from '@redux-requests/react';
import { fetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';
import { EthAddressType } from 'multirpc-sdk';

export interface ChainsItemParams {
  chain: Chain;
}

export const useQueryChainsItem = ({
  chain: { id: chainId },
}: ChainsItemParams): [BigNumber, boolean, boolean, boolean] => {
  const { credentials, hasOauthLogin, hasWeb3Connection, ethAddressType } =
    useAuth();
  const isPremium = Boolean(credentials);

  const { data, loading: arePublicStatsLoading } = useQuery({
    type: fetchPublicRequestsCountStats,
  });

  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      isPremium &&
      ethAddressType === EthAddressType.User,
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
