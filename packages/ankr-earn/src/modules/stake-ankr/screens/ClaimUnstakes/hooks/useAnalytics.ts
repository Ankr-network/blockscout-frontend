import { AvailableWriteProviders } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { trackClaimAll } from 'modules/analytics/tracking-actions/trackClaimAll';
import { trackClaimUnstake } from 'modules/analytics/tracking-actions/trackClaimUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';

interface IUseAnalytics {
  sendClaimAllAnalytics: () => Promise<void>;
  sendClaimUnstakeAnalytics: () => Promise<void>;
}

interface IUseAnalyticsArgs {
  totalAmount: BigNumber;
  unstakeAmount: BigNumber;
}

export const useAnalytics = ({
  totalAmount,
  unstakeAmount,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendClaimAllAnalytics = async () => {
    trackClaimAll({
      amount: totalAmount.toFixed(),
      tokenName: Token.ANKR,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  const sendClaimUnstakeAnalytics = async () => {
    trackClaimUnstake({
      amount: unstakeAmount.toFixed(),
      tokenName: Token.ANKR,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  return { sendClaimAllAnalytics, sendClaimUnstakeAnalytics };
};
