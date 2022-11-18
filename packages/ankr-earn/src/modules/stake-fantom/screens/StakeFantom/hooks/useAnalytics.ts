import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { Token } from 'modules/common/types/token';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  balance: BigNumber;
  selectedToken: string;
  synthBalance: BigNumber;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  balance,
  selectedToken,
  synthBalance,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.FTM,
      tokenOut: selectedToken,
      prevStakedAmount: balance,
      synthBalance,
    });
  };

  return { sendAnalytics };
};
