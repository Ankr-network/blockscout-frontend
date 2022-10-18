import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider-core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { RoutesConfig as DefiRoutes } from 'modules/defi-aggregator/Routes';
import { addFTMTokenToWallet } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import { getCommonData } from 'modules/stake-fantom/actions/getCommonData';
import { stake } from 'modules/stake-fantom/actions/stake';
import { unstake } from 'modules/stake-fantom/actions/unstake';
import { RoutesConfig } from 'modules/stake-fantom/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

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
  tradeLink: string;
  unstakeLink?: string;
  usdAmount?: BigNumber;
  walletName?: string;
  handleAddTokenToWallet: () => void;
}

export const useStakedAFTMBData = (): IStakedAFTMBData => {
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
    dispatchRequest(addFTMTokenToWallet(Token.aFTMb));
  }, [dispatchRequest]);

  return {
    address,
    amount,
    chainId,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    network,
    pendingUnstakes,
    stakeLink: RoutesConfig.stake.generatePath(),
    tradeLink: DefiRoutes.defi.generatePath(Token.aFTMb),
    unstakeLink: RoutesConfig.unstake.generatePath(),
    usdAmount,
    walletName,
    handleAddTokenToWallet,
  };
};
