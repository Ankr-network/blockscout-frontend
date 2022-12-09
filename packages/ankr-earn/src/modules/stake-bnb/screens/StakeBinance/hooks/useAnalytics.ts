import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';

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
  const { data } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { address, walletName } = useConnectedData(
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
