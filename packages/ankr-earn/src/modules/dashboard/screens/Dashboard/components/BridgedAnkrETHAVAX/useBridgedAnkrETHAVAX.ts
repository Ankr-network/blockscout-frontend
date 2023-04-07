import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useAddBridgeTokenToWalletMutation } from 'modules/bridge/actions/addBridgeTokenToWallet';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import {
  ACTION_CACHE_SEC,
  AVAX_NETWORK_BY_ENV,
  SupportedChainIDS,
  ZERO,
} from 'modules/common/const';
import { useFetchAETHBBridgedAVAXQuery } from 'modules/dashboard/actions/fetchAETHBBridgedAVAX';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetEthCertRatioQuery } from 'modules/stake-eth/actions/getEthCertRatio';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IBridgedAnkrETHAVAX {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  usdAmount?: BigNumber;
  onAddTokenClick: () => void;
}

export const useBridgedAnkrETHAVAX = (): IBridgedAnkrETHAVAX => {
  const { data: aETHcBalance, isFetching: isCommonDataLoading } =
    useFetchAETHBBridgedAVAXQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { data: aETHcRatio } = useGetEthCertRatioQuery();

  const network = t(`chain.${AVAX_NETWORK_BY_ENV}`);
  const chainId = AVAX_NETWORK_BY_ENV;

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

  const [addBridgeTokenToWallet] = useAddBridgeTokenToWalletMutation();

  const nativeAmount = getTokenNativeAmount(amount, aETHcRatio);

  const onAddTokenClick = useCallback(() => {
    addBridgeTokenToWallet({
      token: AvailableBridgeTokens.aETHc,
      chainId: AVAX_NETWORK_BY_ENV as unknown as SupportedChainIDS,
    });
  }, [addBridgeTokenToWallet]);

  return {
    amount,
    chainId,
    nativeAmount,
    isBalancesLoading: isCommonDataLoading,
    network,
    usdAmount,
    onAddTokenClick,
  };
};
