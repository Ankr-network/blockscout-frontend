import { AvailableWriteProviders } from '@ankr.com/provider';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { EthSDK } from 'modules/api/EthSDK';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { Token } from 'modules/common/types/token';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';

import { useTotalAmount } from './useTotalAmount';

export interface IUseStakeEthAnalyticsArgs {
  amount: BigNumber;
}

interface IUseStakeEthAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useStakeEthAnalytics = ({
  amount,
}: IUseStakeEthAnalyticsArgs): IUseStakeEthAnalytics => {
  const { totalAmount: willGetAmount, tokenOut } = useTotalAmount(amount);

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
        ? await sdk.getABBalance()
        : await sdk.getACBalance();

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
