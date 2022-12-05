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
  FTM_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useStakeFTMMutation } from 'modules/stake-fantom/actions/stake';
import { useUnstakeFTMMutation } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig as StakeFTMRoutes } from 'modules/stake-fantom/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RoutesConfig as SwitchRoutes } from 'modules/switcher/Routes';

const token = Token.aFTMb;

export interface IStakedAFTMBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  network: string;
  pendingUnstakes: BigNumber;
  stakeLink: string;
  switchLink: string;
  unstakeLink?: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAFTMBData = (): IStakedAFTMBData => {
  const { data: commonData, isFetching: isBalancesLoading } =
    useGetFTMCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const [addFTMTokenToWallet] = useAddFTMTokenToWalletMutation();
  const [, { isLoading: isStakeLoading }] = useStakeFTMMutation();
  const [, { isLoading: isUnstakeLoading }] = useUnstakeFTMMutation();
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${FTM_NETWORK_BY_ENV}`);
  const chainId = FTM_NETWORK_BY_ENV;

  const amount = commonData?.aFTMbBalance ?? ZERO;
  const pendingUnstakes = commonData?.bondPendingUnstakes ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.FTM]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.FTM]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const handleAddTokenToWallet = useCallback(() => {
    addFTMTokenToWallet(token);
  }, [addFTMTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingUnstakes,
    stakeLink: StakeFTMRoutes.stake.generatePath(true),
    switchLink: SwitchRoutes.main.generatePath(token),
    unstakeLink: StakeFTMRoutes.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
