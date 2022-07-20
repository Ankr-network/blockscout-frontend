import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { AVAX_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addAVAXTokenToWallet } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { fetchPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { stake as stakeAVAX } from 'modules/stake-avax/actions/stake';
import { unstake as unstakeAVAX } from 'modules/stake-avax/actions/unstake';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedAAVAXBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink: string;
  stakeType: string;
  tradeLink: string;
  unstakeLink: string;
  unstakeType: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAAVAXBData = (): IStakedAAVAXBData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakeAVAXStats,
  });
  const { data: pendingValues, loading: isPendingUnstakeLoading } = useQuery({
    type: fetchPendingValues,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeAVAX });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakeAVAX });
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${AVAX_NETWORK_BY_ENV}`);
  const chainId = AVAX_NETWORK_BY_ENV;

  const amount = statsData?.aAVAXbBalance ?? ZERO;
  const pendingValue = pendingValues?.pendingAavaxbUnstakes ?? ZERO;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.AVAX]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.AVAX]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addAVAXTokenToWallet(Token.aAVAXb));
  }, [dispatchRequest]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isPendingUnstakeLoading,
    isShowed,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink: StakeAvalancheRoutes.stake.generatePath(),
    stakeType: EAvalanchePoolEventsMap.StakePending,
    tradeLink: DefiRoutes.defi.generatePath(Token.aAVAXb),
    unstakeLink: StakeAvalancheRoutes.unstake.generatePath(),
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
