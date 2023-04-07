import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useAddBridgeTokenToWalletMutation } from 'modules/bridge/actions/addBridgeTokenToWallet';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ACTION_CACHE_SEC,
  FTM_NETWORK_BY_ENV,
  SupportedChainIDS,
  ZERO,
} from 'modules/common/const';
import { useFetchAETHBBridgedFTMQuery } from 'modules/dashboard/actions/fetchAETHBBridgedFTM';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetEthCertRatioQuery } from 'modules/stake-eth/actions/getEthCertRatio';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IBridgedAnkrETHFTM {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  network: string;
  nativeAmount?: BigNumber;
  usdAmount?: BigNumber;
  onAddTokenClick: () => void;
}

export const useBridgedAnkrETHFTM = (): IBridgedAnkrETHFTM => {
  const { data: aETHcBalance, isFetching: isCommonDataLoading } =
    useFetchAETHBBridgedFTMQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { data: aETHcRatio } = useGetEthCertRatioQuery();

  const network = t(`chain.${FTM_NETWORK_BY_ENV}`);
  const chainId = FTM_NETWORK_BY_ENV;

  const amount = aETHcBalance ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const nativeAmount = getTokenNativeAmount(amount, aETHcRatio);

  const [addBridgeTokenToWallet] = useAddBridgeTokenToWalletMutation();

  const onAddTokenClick = useCallback(() => {
    addBridgeTokenToWallet({
      token: AvailableBridgeTokens.aETHc,
      chainId: FTM_NETWORK_BY_ENV as unknown as SupportedChainIDS,
    });
  }, [addBridgeTokenToWallet]);

  return {
    amount,
    chainId,
    isBalancesLoading: isCommonDataLoading,
    nativeAmount,
    network,
    usdAmount,
    onAddTokenClick,
  };
};
