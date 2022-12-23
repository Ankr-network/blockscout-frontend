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
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import { useStakeMaticOnEthMutation } from 'modules/stake-matic/eth/actions/useStakeMaticOnEthMutation';
import { useUnstakeMaticOnEthMutation } from 'modules/stake-matic/eth/actions/useUnstakeMaticOnEthMutation';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { RoutesConfig as SwitchRoutes } from 'modules/switcher/Routes';

const token = Token.aMATICb;

export interface IStakedAMATICBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
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

export const useStakedAMATICBData = (): IStakedAMATICBData => {
  const [addMATICTokenToWallet] = useAddMaticOnEthTokenToWalletMutation();
  const [, { isLoading: isStakeLoading }] = useStakeMaticOnEthMutation();
  const { data: statsData, isFetching: isBalancesLoading } =
    useGetMaticOnEthStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const [, { isLoading: isUnstakeLoading }] = useUnstakeMaticOnEthMutation();
  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aMATICbBalance ?? ZERO;
  const pendingValue = statsData?.pendingBond ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.MATIC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.MATIC]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const handleAddTokenToWallet = useCallback(() => {
    addMATICTokenToWallet(token);
  }, [addMATICTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink: StakeMaticEthRoutes.stake.generatePath(true),
    switchLink: SwitchRoutes.main.generatePath(token),
    unstakeLink: StakeMaticEthRoutes.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
