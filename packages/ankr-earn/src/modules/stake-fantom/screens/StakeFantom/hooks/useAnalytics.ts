import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'common';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
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

  const { address, walletName } = useAuth(
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
