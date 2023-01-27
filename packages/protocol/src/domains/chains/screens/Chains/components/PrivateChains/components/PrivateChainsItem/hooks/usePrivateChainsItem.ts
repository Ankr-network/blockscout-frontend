import BigNumber from 'bignumber.js';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { Chain } from 'domains/chains/types';
import { usePrivateStats } from './usePrivateStats';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
}

export const usePrivateChainsItem = ({
  chain: { id, frontChain: { id: frontChainId } = {} },
}: ChainsItemParams) => {
  const {
    hasPrivateAccess,
    hasOauthLogin,
    hasWeb3Connection,
    isUserEthAddressType,
  } = useAuth();

  const chainId = frontChainId || id;
  const [privateTotalRequests = 0, arePrivateStatsLoading] =
    usePrivateStats(chainId);

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      hasPrivateAccess &&
      isUserEthAddressType,
  );

  return {
    totalRequests: new BigNumber(privateTotalRequests),
    loading: arePrivateStatsLoading,
    hasConnectWalletMessage,
  };
};
