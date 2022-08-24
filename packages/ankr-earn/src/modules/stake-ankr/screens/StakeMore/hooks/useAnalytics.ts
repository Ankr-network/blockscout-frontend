import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackAnkrTokenStake } from 'modules/analytics/tracking-actions/trackAnkrTokenStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  balance: BigNumber;
  nodeProvider: string;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  balance,
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
      newStakedBalance: amount.plus(balance).toFixed(),
      nodeProvider,
    });
  };

  return { sendAnalytics };
};
