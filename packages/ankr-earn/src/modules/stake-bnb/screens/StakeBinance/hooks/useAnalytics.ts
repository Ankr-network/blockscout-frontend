import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  relayerFee: BigNumber;
  selectedToken: string;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  relayerFee,
  selectedToken,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { data } = useQuery({
    type: fetchStats,
  });

  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount).plus(relayerFee);

    const synthBalance =
      selectedToken === Token.aBNBb
        ? data?.aBNBbBalance ?? ZERO
        : data?.aBNBcBalance ?? ZERO;

    trackStake({
      address,
      walletType: walletName,
      amount: currentAmount,
      willGetAmount: currentAmount,
      tokenIn: Token.BNB,
      tokenOut: selectedToken,
      prevStakedAmount: data?.bnbBalance ?? ZERO,
      synthBalance,
    });
  };

  return { sendAnalytics };
};
