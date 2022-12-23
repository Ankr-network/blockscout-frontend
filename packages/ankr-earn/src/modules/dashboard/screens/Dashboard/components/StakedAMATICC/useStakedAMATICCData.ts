import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  ACTION_CACHE_SEC,
  ETH_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DeFiRoutes } from 'modules/defi-aggregator/Routes';
import { useAddMaticOnEthTokenToWalletMutation } from 'modules/stake-matic/eth/actions/useAddMaticOnEthTokenToWalletMutation';
import { useGetMaticOnEthStatsQuery } from 'modules/stake-matic/eth/actions/useGetMaticOnEthStatsQuery';
import { useStakeMaticOnEthMutation } from 'modules/stake-matic/eth/actions/useStakeMaticOnEthMutation';
import { useUnstakeMaticOnEthMutation } from 'modules/stake-matic/eth/actions/useUnstakeMaticOnEthMutation';
import { RoutesConfig as StakeMaticEthRoutes } from 'modules/stake-matic/eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

const token = Token.aMATICc;
const newTokenName = 'ankrMATIC';

export interface IStakedAMATICCData {
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingValue: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  token: Token;
  tokenAddress: string;
  tradeLink: string;
  unstakeLink: string;
  usdAmount?: BigNumber;
  onAddTokenToWallet: () => void;
}

export const useStakedAMATICCData = (): IStakedAMATICCData => {
  const [addMATICTokenToWallet] = useAddMaticOnEthTokenToWalletMutation();
  const [, { isLoading: isStakeLoading }] = useStakeMaticOnEthMutation();
  const { data: statsData, isFetching: isCommonDataLoading } =
    useGetMaticOnEthStatsQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const [, { isLoading: isUnstakeLoading }] = useUnstakeMaticOnEthMutation();

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const chainId = ETH_NETWORK_BY_ENV;

  const amount = statsData?.aMATICcBalance ?? ZERO;

  const pendingValue = statsData?.pendingCertificate ?? ZERO;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.MATIC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.MATIC]?.totalStakedUsd,
        ratio: statsData?.aMATICcRatio,
      }),
    [amount, metrics, statsData],
  );

  const nativeAmount = getTokenNativeAmount(amount, statsData?.aMATICcRatio);

  const { polygonConfig } = configFromEnv();

  const onAddTokenToWallet = useCallback(() => {
    addMATICTokenToWallet(token);
  }, [addMATICTokenToWallet]);

  return {
    amount,
    chainId,
    isLoading: isCommonDataLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingValue,
    ratio: statsData?.aMATICcRatio ?? ZERO,
    stakeLink: StakeMaticEthRoutes.stake.generatePath(),
    token,
    tradeLink: DeFiRoutes.defi.generatePath(newTokenName),
    tokenAddress: polygonConfig.aMATICcToken,
    unstakeLink: StakeMaticEthRoutes.unstake.generatePath(token),
    usdAmount,
    onAddTokenToWallet,
  };
};
