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
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IStakedAFTMCData {
  address?: string;
  amount: BigNumber;
  chainId: EEthereumNetworkId;
  isBalancesLoading: boolean;
  isShowed: boolean;
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
  const dispatchRequest = useDispatchRequest();

  const { data: commonData, loading: isBalancesLoading } = useQuery({
    type: getCommonData,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { loading: isStakeLoading } = useMutation({
    type: stake,
  });
  const { loading: isUnstakeLoading } = useMutation({
    type: unstake,
  });
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

  const isShowed =
    !amount.isZero() || isBalancesLoading || !pendingUnstakes.isZero();

  const nativeAmount = getTokenNativeAmount(amount, commonData?.aFTMcRatio);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addFTMTokenToWallet(Token.aFTMc));
  }, [dispatchRequest]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isShowed,
    isStakeLoading,
    isUnstakeLoading,
    nativeAmount,
    network,
    pendingUnstakes,
    ratio: commonData?.aFTMcRatio ?? ZERO,
    stakeLink: RoutesConfig.stake.generatePath(Token.aFTMc),
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aFTMc, Token.FTM),
    unstakeLink: RoutesConfig.unstake.generatePath(Token.aFTMc),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
