import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';

interface IUseAnalyticsArgs {
  amount: BigNumber;
  balance: BigNumber;
  selectedToken: string;
}

interface IUseAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useAnalytics = ({
  amount,
  balance,
  selectedToken,
}: IUseAnalyticsArgs): IUseAnalytics => {
  const { data } = useQuery({
    type: getCommonData,
  });

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const sendAnalytics = async () => {
    const currentAmount = new BigNumber(amount);

    const synthBalance =
      selectedToken === Token.aFTMb
        ? data?.aFTMbBalance ?? ZERO
        : data?.aFTMcBalance ?? ZERO;

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
