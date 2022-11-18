import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider-core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  ACTION_CACHE_SEC,
  FTM_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { useStakeFTMMutation } from 'modules/stake-fantom/actions/stake';
import { useUnstakeFTMMutation } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedAFTMCData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  pendingUnstakes: BigNumber;
  ratio: BigNumber;
  stakeLink: string;
  tradeLink: string;
  unstakeLink?: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAFTMCData = (): IStakedAFTMCData => {
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

  const amount = commonData?.aFTMcBalance ?? ZERO;
  const pendingUnstakes = commonData?.certPendingUnstakes ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.FTM]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.FTM]?.totalStakedUsd,
        ratio: commonData?.aFTMcRatio,
      }),
    [amount, commonData, metrics],
  );

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aFTMcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    addFTMTokenToWallet(Token.aFTMc);
  }, [addFTMTokenToWallet]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingUnstakes,
    ratio: commonData?.aFTMcRatio ?? ZERO,
    stakeLink: RoutesConfig.stake.generatePath(Token.aFTMc),
    tradeLink: DefiRoutes.defi.generatePath(Token.aFTMc),
    unstakeLink: RoutesConfig.unstake.generatePath(Token.aFTMc),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
