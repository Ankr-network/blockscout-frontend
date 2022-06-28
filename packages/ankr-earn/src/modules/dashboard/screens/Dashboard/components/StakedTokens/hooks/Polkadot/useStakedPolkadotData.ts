import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import {
  ETH_NETWORK_BY_ENV,
  featuresConfig,
  STAKE_LEGACY_LINKS,
  ZERO,
} from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
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

export interface IUseStakedPolkadotDataProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IStakedPolkadotData {
  address?: string;
  amount: BigNumber;
  isBalancesLoading: boolean;
  isShowed: boolean;
  isShowedTradeLink: boolean;
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

/**
 *  TODO Add logic for this beta version (Polkadot Staking)
 */
export const useStakedPolkadotData = ({
  ethToken,
  network,
  polkadotToken,
}: IUseStakedPolkadotDataProps): IStakedPolkadotData => {
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

  // Note: This is unsafe type conversion. Please be carefully
  const serviceName = network.toLowerCase() as EMetricsServiceName;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[serviceName]?.totalStaked,
        totalStakedUsd: metrics?.[serviceName]?.totalStakedUsd,
      }),
    [amount, metrics, serviceName],
  );

  const isShowed =
    !amount.isZero() ||
    isBalancesLoading ||
    !pendingValue.isZero() ||
    isPendingAmountSumLoading;

  const handleAddTokenToWallet = useCallback((): void => {
    dispatchRequest(addETHTokenToWallet(network));
  }, [dispatchRequest, network]);

  return {
    address,
    amount,
    isBalancesLoading,
    isShowed,
    isShowedTradeLink: false,
    isStakeLoading,
    isUnstakeLoading,
    network: chainTitle,
    pendingValue,
    stakeLink: featuresConfig.isActivePolkadotStaking
      ? RoutesConfig.stake.generatePath(network)
      : STAKE_LEGACY_LINKS[network] ?? '',
    stakeType: ETxTypes.Staked,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(ethToken, polkadotToken),
    unstakeLink: RoutesConfig.unstake.generatePath(network),
    unstakeType: ETxTypes.Unstaked,
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
