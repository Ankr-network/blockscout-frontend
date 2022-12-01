import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  ACTION_CACHE_SEC,
  BSC_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DeFiRoutes } from 'modules/defi-aggregator/Routes';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { useGetBNBPendingValuesQuery } from 'modules/stake-bnb/actions/fetchPendingValues';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/fetchStats';
import { useStakeBNBMutation } from 'modules/stake-bnb/actions/stake';
import { useUnstakeBNBMutation } from 'modules/stake-bnb/actions/unstake';
import { RoutesConfig as StakeBNBRoutes } from 'modules/stake-bnb/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aBNBc;
const newTokenName = 'ankrBNB';

export interface IStakedABNBCData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  tradeLink: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const useStakedABNBCData = (): IStakedABNBCData => {
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

  const network = t(`chain.${BSC_NETWORK_BY_ENV}`);
  const chainId = BSC_NETWORK_BY_ENV;

  const amount = statsData?.aBNBcBalance ?? ZERO;

  const pendingValue = pendingValues?.pendingAbnbcUnstakes ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.BNB]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.BNB]?.totalStakedUsd,
        ratio: statsData?.aBNBcRatio,
      }),
    [amount, metrics, statsData],
  );

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aBNBcRatio);

  const { binanceConfig } = configFromEnv();

  const onAddTokenToWallet = useCallback(() => {
    addBNBTokenToWallet(token);
  }, [addBNBTokenToWallet]);

  return {
    amount,
    chainId,
    isLoading: isCommonDataLoading,
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio: statsData?.aBNBcRatio ?? ZERO,
    stakeLink: StakeBNBRoutes.stake.generatePath(),
    tradeLink: DeFiRoutes.defi.generatePath(newTokenName),
    token,
    tokenAddress: binanceConfig.aBNBcToken,
    unstakeLink: StakeBNBRoutes.unstake.generatePath(token),
    usdAmount,
    onAddTokenToWallet,
  };
};
