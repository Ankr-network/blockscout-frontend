import { t } from '@ankr.com/common';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  ACTION_CACHE_SEC,
  BSC_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { swapOldAETHCBSC } from 'modules/dashboard/actions/swapOldAETHCBSC';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useSupportedNetwork } from './useSupportedNetwork';

export interface IStakedAETHBSCData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isSwapLoading: boolean;
  network: string;
  usdAmount?: BigNumber;
  swapDisabled: boolean;
  onSwapToken: () => void;
  handleAddTokenToWallet: () => void;
}

export function useStakedAETHBSCData(): IStakedAETHBSCData {
  const dispatchRequest = useDispatchRequest();
  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

  const { data: statsData, isFetching: isCommonDataLoading } =
    useGetBNBStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: availableBalance } = useQuery({
    type: fetchAETHCBridgeBalanceBSC,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isSwapLoading } = useMutation({
    type: swapOldAETHCBSC,
  });

  const { onSwitchNetwork, isUnsupportedNetwork } = useSupportedNetwork();

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

  const onSwapToken = async () => {
    if (!availableBalance || availableBalance.isZero()) {
      return;
    }

    if (isUnsupportedNetwork) {
      await onSwitchNetwork(BSC_NETWORK_BY_ENV);

      return;
    }

    const swappableAmount = amount.isGreaterThan(availableBalance)
      ? availableBalance
      : amount;
    await dispatchRequest(swapOldAETHCBSC(swappableAmount));
  };

  const handleAddTokenToWallet = useCallback(() => {
    addBNBTokenToWallet(Token.aETH);
  }, [addBNBTokenToWallet]);

  return {
    amount,
    usdAmount,
    onSwapToken,
    isSwapLoading,
    handleAddTokenToWallet,
    chainId: BSC_NETWORK_BY_ENV,
    network: t(`chain.${BSC_NETWORK_BY_ENV}`),
    swapDisabled: !availableBalance || availableBalance.isZero(),
    isBalancesLoading: isCommonDataLoading,
  };
}
