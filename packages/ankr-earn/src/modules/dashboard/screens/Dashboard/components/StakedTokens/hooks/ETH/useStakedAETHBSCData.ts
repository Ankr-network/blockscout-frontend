import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';

import { t } from 'common';
import { AvailableWriteProviders, EEthereumNetworkId } from 'provider';

import { configFromEnv } from 'modules/api/config';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { swapOldAETHCBSC } from 'modules/dashboard/actions/swapOldAETHCBSC';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedAETHBSCData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isShowed: boolean;
  nativeAmount?: BigNumber;
  network: string;
  ratio: BigNumber;
  usdAmount?: BigNumber;
  walletName?: string;
  tokenAddress: string;
  swapDisabled: boolean;
  onSwapToken: () => void;
}

export function useStakedAETHBSCData(): IStakedAETHBSCData {
  const { binanceConfig } = configFromEnv();
  const dispatchRequest = useDispatchRequest();
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const { data: availableBalance } = useQuery({
    type: fetchAETHCBridgeBalanceBSC,
  });

  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStakeBNBStats,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = statsData?.aETHBalance ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.BNB]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.BNB]?.totalStakedUsd,
        ratio: statsData?.aETHRatio,
      }),
    [amount, metrics, statsData?.aETHRatio],
  );

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aETHRatio);

  const isShowed = !amount.isZero() || isCommonDataLoading;

  const onSwapToken = async () => {
    if (!availableBalance || availableBalance.isZero()) {
      return;
    }

    const swappableAmount = amount.isGreaterThan(availableBalance)
      ? availableBalance
      : amount;
    await dispatchRequest(swapOldAETHCBSC(swappableAmount));
  };

  useEffect(() => {
    dispatchRequest(fetchAETHCBridgeBalanceBSC());
  }, [dispatchRequest]);

  return {
    isShowed,
    address,
    amount,
    nativeAmount,
    usdAmount,
    walletName,
    onSwapToken,
    chainId: BSC_NETWORK_BY_ENV,
    network: t(`chain.${BSC_NETWORK_BY_ENV}`),
    swapDisabled: !availableBalance || availableBalance.isZero(),
    tokenAddress: binanceConfig.aBNBcToken,
    isBalancesLoading: isCommonDataLoading,
    ratio: statsData?.aETHRatio || ZERO,
  };
}
