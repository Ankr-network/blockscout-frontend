import { AvailableWriteProviders } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { trackClaimAllRewards } from 'modules/analytics/tracking-actions/trackClaimAllRewards';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = (amount: BigNumber): IUseAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    trackClaimAllRewards({
      amount: amount.toFixed(),
      tokenName: Token.ANKR,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  return { sendAnalytics };
};
