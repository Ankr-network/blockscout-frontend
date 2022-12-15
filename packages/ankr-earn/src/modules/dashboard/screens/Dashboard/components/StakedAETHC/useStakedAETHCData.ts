import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  ACTION_CACHE_SEC,
  ETH_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useStakeETHMutation } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aETHc;
const newTokenName = 'ankrETH';

export interface IStakedAETHCData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink?: string;
  tradeLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHCData = (): IStakedAETHCData => {
  const [addTokenToWallet] = useAddETHTokenToWalletMutation();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const [, { isLoading: isStakeLoading }] = useStakeETHMutation();

  const { data: statsData, isFetching: isBalancesLoading } =
    useGetETHCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aETHcBalance ?? ZERO;
  const pendingValue = ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
        ratio: statsData?.aETHcRatio,
      }),
    [amount, metrics, statsData],
  );

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aETHcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    addTokenToWallet(token);
  }, [addTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio: statsData?.aETHcRatio ?? ZERO,
    stakeLink: RoutesConfig.stake.generatePath(),
    tradeLink: DefiRoutes.defi.generatePath(newTokenName),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
