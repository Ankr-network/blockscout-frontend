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
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { useStakeETHMutation } from 'modules/stake-eth/actions/stake';
import { RoutesConfig as StakeETHRoutes } from 'modules/stake-eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RoutesConfig as SwitchRoutes } from 'modules/switcher/Routes';

const token = Token.aETHb;

export interface IStakedAETHBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink?: string;
  switchLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHBData = (): IStakedAETHBData => {
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

  const amount = statsData?.aETHbBalance ?? ZERO;
  const pendingValue = ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const handleAddTokenToWallet = useCallback(() => {
    addTokenToWallet(token);
  }, [addTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    network,
    pendingValue,
    stakeLink: StakeETHRoutes.stake.generatePath(true),
    switchLink: SwitchRoutes.main.generatePath(token),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
