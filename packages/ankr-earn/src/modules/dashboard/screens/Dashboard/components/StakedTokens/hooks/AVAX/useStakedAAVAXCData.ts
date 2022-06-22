import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';
import { AvailableWriteProviders, EEthereumNetworkId } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { AVAX_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { addAVAXTokenToWallet } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { fetchPendingValues } from 'modules/stake-avax/actions/fetchPendingValues';
import { fetchStats as fetchStakeAVAXStats } from 'modules/stake-avax/actions/fetchStats';
import { stake as stakeAVAX } from 'modules/stake-avax/actions/stake';
import { unstake as unstakeAVAX } from 'modules/stake-avax/actions/unstake';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aAVAXc;

export interface IStakedAVAXData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  stakeType: string;
  tradeLink: string;
  unstakeLink: string;
  unstakeType: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAAVAXCData = (): IStakedAVAXData => {
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

  const amount = statsData?.aAVAXcBalance ?? ZERO;
  const pendingValue = pendingValues?.pendingAavaxcUnstakes ?? ZERO;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.AVAX]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.AVAX]?.totalStakedUsd,
        ratio: statsData?.aAVAXcRatio,
      }),
    [amount, statsData, metrics],
  );

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aAVAXcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addAVAXTokenToWallet(Token.aAVAXc));
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
    nativeAmount,
    network,
    pendingValue,
    ratio: statsData?.aAVAXcRatio ?? ZERO,
    stakeLink: StakeAvalancheRoutes.stake.generatePath(token),
    stakeType: EAvalanchePoolEventsMap.StakePending,
    tradeLink: '',
    unstakeLink: StakeAvalancheRoutes.unstake.generatePath(token),
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
