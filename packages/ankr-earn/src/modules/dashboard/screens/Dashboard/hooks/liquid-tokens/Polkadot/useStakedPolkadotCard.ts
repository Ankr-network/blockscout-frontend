import { t } from '@ankr.com/common';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addETHTokenToWallet } from 'modules/stake-polkadot/actions/addETHTokenToWallet';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { unstake } from 'modules/stake-polkadot/actions/unstake';
import { RoutesConfig } from 'modules/stake-polkadot/Routes';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IUseStakedPolkadotCardProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IStakedPolkadotCard {
  address?: string;
  amount: BigNumber;
  isBalancesLoading: boolean;
  isPendingUnstakeLoading: boolean;
  isShowedTradeLink: boolean;
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

export const useStakedPolkadotCard = ({
  ethToken,
  network,
}: IUseStakedPolkadotCardProps): IStakedPolkadotCard => {
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { data: balance, loading: isBalancesLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const { data: pendingAmountSum, loading: isPendingAmountSumLoading } =
    useQuery({
      type: fetchPolkadotPendingHistoryAmountSum,
      requestKey: getPolkadotRequestKey(network),
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const chainTitle = t(`chain.${ETH_NETWORK_BY_ENV}`);

  const amount = balance ?? ZERO;
  const pendingValue = pendingAmountSum ?? ZERO;

  const usdAmount = useMemo(() => {
    const serviceName = EMetricsServiceName[network];

    return getUSDAmount({
      amount,
      totalStaked: metrics?.[serviceName]?.totalStaked,
      totalStakedUsd: metrics?.[serviceName]?.totalStakedUsd,
    });
  }, [amount, metrics, network]);

  const handleAddTokenToWallet = useCallback((): void => {
    dispatchRequest(addETHTokenToWallet(network));
  }, [dispatchRequest, network]);

  return {
    address,
    amount,
    isBalancesLoading,
    isShowedTradeLink: false,
    isStakeLoading,
    isUnstakeLoading,
    isPendingUnstakeLoading: isPendingAmountSumLoading,
    network: chainTitle,
    pendingValue,
    stakeLink: RoutesConfig.stake.generatePath(network, true),
    tradeLink: DefiRoutes.defi.generatePath(ethToken),
    unstakeLink: RoutesConfig.unstake.generatePath(network),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};