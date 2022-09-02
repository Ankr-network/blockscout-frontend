import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackAnkrTokenStake } from 'modules/analytics/tracking-actions/trackAnkrTokenStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  stakedAmount: BigNumber;
  nodeProvider: string;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  stakedAmount,
  nodeProvider,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    trackAnkrTokenStake({
      walletPublicAddress: address,
      walletType: walletName,
      stakeAmount: amount.toFixed(),
      newStakedBalance: amount.plus(stakedAmount).toFixed(),
      addingStake: !stakedAmount.isZero(),
      nodeProvider,
    });
  };

  return { sendAnalytics };
};
