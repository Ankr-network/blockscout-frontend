import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

export interface IUseStakeEthAnalyticsArgs {
  amount: BigNumber;
  willGetAmount: BigNumber;
  tokenOut: TEthToken;
}

interface IUseStakeEthAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useStakeEthAnalytics = ({
  amount,
  willGetAmount,
  tokenOut,
}: IUseStakeEthAnalyticsArgs): IUseStakeEthAnalytics => {
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: commonData } = useQuery({
    type: getCommonData,
  });

  const sendAnalytics = useCallback(async () => {
    const sdk = await EthSDK.getInstance();
    const synthBalance =
      tokenOut === Token.aETHb
        ? await sdk.getAethbBalance()
        : await sdk.getAethcBalance();

    trackStake({
      address,
      walletType: walletName,
      amount,
      willGetAmount,
      tokenIn: Token.ETH,
      tokenOut,
      prevStakedAmount: commonData?.ethBalance,
      synthBalance,
    });
  }, [
    address,
    amount,
    commonData?.ethBalance,
    tokenOut,
    walletName,
    willGetAmount,
  ]);

  return { sendAnalytics };
};
