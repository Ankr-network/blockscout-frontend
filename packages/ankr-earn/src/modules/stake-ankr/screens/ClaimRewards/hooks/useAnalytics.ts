import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackClaimAll } from 'modules/analytics/tracking-actions/trackClaimAll';
import { trackClaimRewards } from 'modules/analytics/tracking-actions/trackClaimRewards';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

interface IUseAnalytics {
  sendClaimAllAnalytics: () => Promise<void>;
  sendClaimRewardsAnalytics: () => Promise<void>;
}

interface IUseAnalyticsArgs {
  totalAmount: BigNumber;
  rewardsAmount: BigNumber;
}

export const useAnalytics = ({
  totalAmount,
  rewardsAmount,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { address, walletName } = useConnectedData(
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

  const sendClaimRewardsAnalytics = async () => {
    trackClaimRewards({
      amount: rewardsAmount.toFixed(),
      tokenName: Token.ANKR,
      walletPublicAddress: address,
      walletType: walletName,
    });
  };

  return { sendClaimAllAnalytics, sendClaimRewardsAnalytics };
};