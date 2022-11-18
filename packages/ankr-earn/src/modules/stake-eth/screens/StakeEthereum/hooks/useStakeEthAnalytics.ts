import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { EthereumSDK } from '@ankr.com/staking-sdk';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
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

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: commonData } = useQuery({
    type: getCommonData,
  });

  const sendAnalytics = useCallback(async () => {
    const sdk = await EthereumSDK.getInstance();
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
      synthBalance,
      prevStakedAmount: commonData?.ethBalance,
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
