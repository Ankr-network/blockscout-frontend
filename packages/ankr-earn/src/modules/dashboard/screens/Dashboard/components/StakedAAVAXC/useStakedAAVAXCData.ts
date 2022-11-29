import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  ACTION_CACHE_SEC,
  AVAX_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddAVAXTokenToWalletMutation } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetAVAXPendingValuesQuery } from 'modules/stake-avax/actions/fetchPendingValues';
import { useStakeAVAXMutation } from 'modules/stake-avax/actions/stake';
import { useUnstakeAVAXMutation } from 'modules/stake-avax/actions/unstake';
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
  const { data: statsData, isFetching: isBalancesLoading } =
    useGetAVAXCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });
  const { data: pendingValues, isFetching: isPendingUnstakeLoading } =
    useGetAVAXPendingValuesQuery();
  const [addAVAXTokenToWallet] = useAddAVAXTokenToWalletMutation();

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const [, { isLoading: isStakeLoading }] = useStakeAVAXMutation();
  const [, { isLoading: isUnstakeLoading }] = useUnstakeAVAXMutation();
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

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aAVAXcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    addAVAXTokenToWallet(Token.aAVAXc);
  }, [addAVAXTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isPendingUnstakeLoading,
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
