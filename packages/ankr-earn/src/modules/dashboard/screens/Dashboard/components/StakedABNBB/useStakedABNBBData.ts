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
  BSC_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useStakeBNBMutation } from 'modules/stake-bnb/actions/stake';
import { useUnstakeBNBMutation } from 'modules/stake-bnb/actions/unstake';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RoutesConfig as SwitchRoutes } from 'modules/switcher/Routes';

const token = Token.aBNBb;

export interface IStakedABNBBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink: string;
  switchLink: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedABNBBData = (): IStakedABNBBData => {
  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();
  const { data: statsData, isFetching: isCommonDataLoading } =
    useGetBNBStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });
  const { data: pendingValues, isFetching: isPendingUnstakeLoading } =
    useGetBNBPendingValuesQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const [, { isLoading: isStakeLoading }] = useStakeBNBMutation();
  const [, { isLoading: isUnstakeLoading }] = useUnstakeBNBMutation();
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const chainId = BSC_NETWORK_BY_ENV;

  const amount = statsData?.aBNBbBalance ?? ZERO;
  const pendingValue = pendingValues?.pendingAbnbbUnstakes ?? ZERO;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.BNB]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.BNB]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const handleAddTokenToWallet = useCallback(() => {
    addBNBTokenToWallet(token);
  }, [addBNBTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading: isCommonDataLoading,
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink: StakeBinanceRoutes.stake.generatePath(true),
    switchLink: SwitchRoutes.main.generatePath(token),
    unstakeLink: StakeBinanceRoutes.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
