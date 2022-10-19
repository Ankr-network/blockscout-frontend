import { AvailableWriteProviders } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { trackAnkrTokenUnstake } from 'modules/analytics/tracking-actions/trackAnkrTokenUnstake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  available: BigNumber;
  balance: BigNumber;
  nodeProvider: string;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  available,
  balance,
  nodeProvider,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    trackAnkrTokenUnstake({
      walletPublicAddress: address,
      walletType: walletName,
      unstakeAmount: amount.toFixed(),
      availableUnstakeAmount: available.toFixed(),
      newStakedBalance: balance.minus(amount).toFixed(),
      nodeProvider,
    });
  };

  return { sendAnalytics };
};
