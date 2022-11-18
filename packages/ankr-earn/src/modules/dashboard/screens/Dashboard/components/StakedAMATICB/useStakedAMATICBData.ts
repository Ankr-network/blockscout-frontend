import { t } from '@ankr.com/common';
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

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addMATICTokenToWallet } from 'modules/stake-matic/eth/actions/addMATICTokenToWallet';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-matic/eth/actions/fetchStats';
import { stake as stakePolygon } from 'modules/stake-matic/eth/actions/stake';
import { unstake as unstakePolygon } from 'modules/stake-matic/eth/actions/unstake';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

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
  tradeLink: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAMATICBData = (): IStakedAMATICBData => {
  const dispatchRequest = useDispatchRequest();
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakePolygon });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakePolygon });
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
    dispatchRequest(addMATICTokenToWallet(Token.aMATICb));
  }, [dispatchRequest]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingValue,
    stakeLink: StakeMaticEthRoutes.stake.generatePath(),
    tradeLink: DefiRoutes.defi.generatePath(Token.aMATICb),
    unstakeLink: StakeMaticEthRoutes.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
