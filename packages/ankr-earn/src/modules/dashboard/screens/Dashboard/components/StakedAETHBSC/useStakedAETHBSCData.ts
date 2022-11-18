import { EEthereumNetworkId } from '@ankr.com/provider-core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { useGuardETHRoute } from 'modules/auth/eth/components/GuardETHRoute/hooks/useGuardETHRoute';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { fetchAETHCBridgeBalanceBSC } from 'modules/dashboard/actions/fetchAETHCBridgeBalanceBSC';
import { swapOldAETHCBSC } from 'modules/dashboard/actions/swapOldAETHCBSC';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { BNB_STAKING_NETWORKS } from 'modules/stake-bnb/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

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

  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStakeBNBStats,
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

  const { onSwitchNetwork, isUnsupportedNetwork } = useGuardETHRoute({
    availableNetworks: BNB_STAKING_NETWORKS,
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

  const onSwapToken = async () => {
    if (!availableBalance || availableBalance.isZero()) {
      return;
    }

    if (isUnsupportedNetwork) {
      await onSwitchNetwork(BSC_NETWORK_BY_ENV)();

      return;
    }

    const swappableAmount = amount.isGreaterThan(availableBalance)
      ? availableBalance
      : amount;
    await dispatchRequest(swapOldAETHCBSC(swappableAmount));
  };

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addBNBTokenToWallet(Token.aETH));
  }, [dispatchRequest]);

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
