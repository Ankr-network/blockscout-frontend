import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { AvailableWriteProviders, t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  ETH_NETWORK_BY_ENV,
  featuresConfig,
  STAKE_LEGACY_LINKS,
  ZERO,
} from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addETHTokenToWallet } from 'modules/stake-polkadot/actions/addETHTokenToWallet';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { stake } from 'modules/stake-polkadot/actions/stake';
import { unstake } from 'modules/stake-polkadot/actions/unstake';
import { ETxTypes } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
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
  isShowedTradeLink: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  isPendingUnstakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink: string;
  stakeType: string;
  tradeLink: string;
  unstakeLink: string;
  unstakeType: string;
  unsupportedUnstakeHistoryTxt: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

/**
 *  TODO Add logic for this beta version (Polkadot Staking)
 */
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
  const unsupportedUnstakeHistoryTxt = t(
    'stake-polkadot.unsupported-unstake-history',
    {
      network,
    },
  );

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
    stakeLink: featuresConfig.isActivePolkadotStaking
      ? RoutesConfig.stake.generatePath(network)
      : STAKE_LEGACY_LINKS[network] ?? '',
    stakeType: ETxTypes.Staked,
    tradeLink: DefiRoutes.defi.generatePath(ethToken),
    unstakeLink: RoutesConfig.unstake.generatePath(network),
    unstakeType: ETxTypes.Unstaked,
    unsupportedUnstakeHistoryTxt,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
