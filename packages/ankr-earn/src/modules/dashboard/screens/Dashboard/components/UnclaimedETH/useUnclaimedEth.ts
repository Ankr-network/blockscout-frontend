import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  ACTION_CACHE_SEC,
  ETH_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

interface IUseUnclaimedEth {
  amount?: BigNumber;
  chainId: EEthereumNetworkId;
  claimLink: string;
  isLoading: boolean;
  token: Token;
  usdAmount?: BigNumber;
}

export const useUnclaimedEth = (): IUseUnclaimedEth => {
  const { data, isFetching: loading } = useGetETHClaimableDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = data?.claimableAETHB ?? ZERO;
  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
      }),
    [amount, metrics],
  );

  return {
    amount: data?.claimableAETHB,
    chainId: ETH_NETWORK_BY_ENV,
    claimLink: RoutesConfig.claim.generatePath(),
    isLoading: loading,
    token: Token.ETH,
    usdAmount,
  };
};
