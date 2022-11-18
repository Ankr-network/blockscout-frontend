import { t } from '@ankr.com/common';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { watchAsset } from 'modules/bridge/actions/watchAsset';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  BSC_NETWORK_BY_ENV,
  SupportedChainIDS,
  ZERO,
} from 'modules/common/const';
import { fetchAETHCBridged } from 'modules/dashboard/actions/fetchAETHCBridged';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedBridgeAETHCData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  usdAmount?: BigNumber;
  onAddTokenClick: () => void;
}

export const useStakedBridgeAETHCData = (): IStakedBridgeAETHCData => {
  const dispatchRequest = useDispatchRequest();

  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchAETHCBridged,
  });

  const { data: commonData } = useQuery({
    type: getCommonData,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const chainId = BSC_NETWORK_BY_ENV;

  const amount = statsData ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
        ratio: commonData?.aETHcRatio,
      }),
    [amount, commonData?.aETHcRatio, metrics],
  );

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aETHcRatio);

  const onAddTokenClick = () => {
    dispatchRequest(
      watchAsset({
        token: AvailableBridgeTokens.aETHc,
        chainId: BSC_NETWORK_BY_ENV as unknown as SupportedChainIDS,
      }),
    );
  };

  return {
    amount,
    chainId,
    isBalancesLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  };
};
