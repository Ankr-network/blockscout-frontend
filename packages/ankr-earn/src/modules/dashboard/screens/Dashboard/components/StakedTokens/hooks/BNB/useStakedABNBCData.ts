import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { t } from 'common';

import { configFromEnv } from 'modules/api/config';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake as stakeBNB } from 'modules/stake-bnb/actions/stake';
import { unstake } from 'modules/stake-bnb/actions/unstake';
import { RoutesConfig } from 'modules/stake-bnb/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aBNBc;

export interface IStakedABNBCData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const useStakedABNBCData = (): IStakedABNBCData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStakeBNBStats,
  });
  const { data: pendingValues, loading: isPendingUnstakeLoading } = useQuery({
    type: fetchPendingValues,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeBNB });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

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

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isCommonDataLoading;

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aBNBcRatio);

  const { binanceConfig } = configFromEnv();

  const onAddTokenToWallet = useCallback(() => {
    dispatchRequest(addBNBTokenToWallet(token));
  }, [dispatchRequest]);

  return {
    amount,
    chainId,
    isLoading: isCommonDataLoading,
    isPendingUnstakeLoading,
    isShowed,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio: statsData?.aBNBcRatio ?? ZERO,
    stakeLink: RoutesConfig.stake.generatePath(token),
    token,
    tokenAddress: binanceConfig.aBNBcToken,
    unstakeLink: RoutesConfig.unstake.generatePath(token),
    usdAmount,
    onAddTokenToWallet,
  };
};
