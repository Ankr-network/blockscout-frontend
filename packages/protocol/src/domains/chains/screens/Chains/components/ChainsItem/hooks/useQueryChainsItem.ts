import BigNumber from 'bignumber.js';

import { Chain } from '../../ChainsList/ChainsListTypes';
import { chainsFetchPublicRequestsCountStats } from 'domains/chains/actions/fetchPublicRequestsCountStats';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePrivateStats } from './usePrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
}

export const useQueryChainsItem = ({
  chain: { id, frontChain: { id: frontChainId } = {} },
  isMMIndex,
}: ChainsItemParams): [BigNumber, boolean, boolean, boolean] => {
  const {
    hasPrivateAccess,
    hasOauthLogin,
    hasWeb3Connection,
    isUserEthAddressType,
  } = useAuth();

  const [, { data, isLoading: arePublicStatsLoading }] = useQueryEndpoint(
    chainsFetchPublicRequestsCountStats,
  );

  const chainId = frontChainId || id;
  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      hasPrivateAccess &&
      isUserEthAddressType,
  );

  return hasPrivateAccess && !isMMIndex
    ? [
        new BigNumber(privateTotalRequests),
        arePrivateStatsLoading,
        hasPrivateAccess,
        hasConnectWalletMessage,
      ]
    : [
        new BigNumber(data?.[chainId] ?? 0),
        arePublicStatsLoading,
        hasPrivateAccess,
        hasConnectWalletMessage,
      ];
};
