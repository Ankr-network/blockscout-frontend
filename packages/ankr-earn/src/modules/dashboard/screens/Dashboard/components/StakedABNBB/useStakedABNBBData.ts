import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider-core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { BSC_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchPendingValues } from 'modules/stake-bnb/actions/fetchPendingValues';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake as stakeBNB } from 'modules/stake-bnb/actions/stake';
import { unstake as unstakeBNB } from 'modules/stake-bnb/actions/unstake';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

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
  tradeLink: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedABNBBData = (): IStakedABNBBData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isCommonDataLoading } = useQuery({
    type: fetchStats,
  });
  const { data: pendingValues, loading: isPendingUnstakeLoading } = useQuery({
    type: fetchPendingValues,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeBNB });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakeBNB });
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
    dispatchRequest(addBNBTokenToWallet());
  }, [dispatchRequest]);

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
    stakeLink: StakeBinanceRoutes.stake.generatePath(),
    tradeLink: DefiRoutes.defi.generatePath(Token.aBNBb),
    unstakeLink: StakeBinanceRoutes.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
