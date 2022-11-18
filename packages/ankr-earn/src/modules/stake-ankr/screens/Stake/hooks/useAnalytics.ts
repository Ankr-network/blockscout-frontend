import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackDelegatedStaking } from 'modules/analytics/tracking-actions/trackDelegatedStaking';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

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
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    trackDelegatedStaking({
      token: Token.ANKR,
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
