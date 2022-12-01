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
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddAVAXTokenToWalletMutation } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/fetchCommonData';
import { useGetAVAXPendingValuesQuery } from 'modules/stake-avax/actions/fetchPendingValues';
import { useStakeAVAXMutation } from 'modules/stake-avax/actions/stake';
import { useUnstakeAVAXMutation } from 'modules/stake-avax/actions/unstake';
import { RoutesConfig as StakeAvalancheRoutes } from 'modules/stake-avax/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RoutesConfig as SwitchRoutes } from 'modules/switcher/Routes';

const token = Token.aAVAXb;

export interface IStakedAAVAXBData {
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
  stakeType: string;
  switchLink: string;
  unstakeLink: string;
  unstakeType: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAAVAXBData = (): IStakedAAVAXBData => {
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

  const handleAddTokenToWallet = useCallback(() => {
    addAVAXTokenToWallet(token);
  }, [addAVAXTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isPendingUnstakeLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink: StakeAvalancheRoutes.stake.generatePath(true),
    stakeType: EAvalanchePoolEventsMap.StakePending,
    switchLink: SwitchRoutes.main.generatePath(token),
    unstakeLink: StakeAvalancheRoutes.unstake.generatePath(),
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
