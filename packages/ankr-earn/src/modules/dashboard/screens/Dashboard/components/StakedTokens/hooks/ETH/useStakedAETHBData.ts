import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { stake } from 'modules/stake-eth/actions/stake';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';
import { addSwitcherTokenToWallet } from 'modules/switcher/actions/wallet';

export interface IStakedAETHBData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink?: string;
  tradeLink: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAETHBData = (): IStakedAETHBData => {
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aETHbBalance ?? ZERO;
  const pendingValue = ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addSwitcherTokenToWallet({ chainId, swapOption: Token.aETHb }),
    );
  }, [chainId, dispatchRequest]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isShowed,
    isStakeLoading,
    network,
    pendingValue,
    stakeLink: RoutesConfig.stake.generatePath(Token.aETHb),
    tradeLink: DefiRoutes.defi.generatePath(Token.aETHb),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
