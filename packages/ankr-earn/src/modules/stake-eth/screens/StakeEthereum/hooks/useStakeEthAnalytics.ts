import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackStake } from 'modules/analytics/tracking-actions/trackStake';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { getEthereumSDK } from 'modules/stake-eth/utils/getEthereumSDK';

import { useTotalAmount } from './useTotalAmount';

export interface IUseStakeEthAnalyticsArgs {
  amount: BigNumber;
  fee: BigNumber;
}

interface IUseStakeEthAnalytics {
  sendAnalytics: () => Promise<void>;
}

export const useStakeEthAnalytics = ({
  amount,
  fee,
}: IUseStakeEthAnalyticsArgs): IUseStakeEthAnalytics => {
  const { totalAmount: willGetAmount, tokenOut } = useTotalAmount({
    amount,
    fee,
    isInvalidAmount: false,
  });

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: commonData } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const sendAnalytics = useCallback(async () => {
    const sdk = await getEthereumSDK();
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
