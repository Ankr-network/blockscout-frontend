import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getDashboardData } from 'modules/stake-ssv/actions/getDashboardData';
import { SSV_ETH_NETWORK_BY_ENV } from 'modules/stake-ssv/const';
import { RoutesConfig as EthereumSSVRoutes } from 'modules/stake-ssv/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export interface IUseStakedASETHCData {
  amount: BigNumber;
  isLoading: boolean;
  isStakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  stakeLink: string;
  token: Token;
  unstakeLink?: string;
  usdAmount?: BigNumber;
}

export const useStakedASETHC = (): IUseStakedASETHCData => {
  const { data: dashboardData, loading: isDashboardDataLoading } = useQuery({
    type: getDashboardData,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = dashboardData?.asETHcBalance ?? ZERO;

  const ratio = dashboardData?.asETHcRatio ?? ZERO;

  const network = t(`chain.${SSV_ETH_NETWORK_BY_ENV}`);

  const nativeAmount = getTokenNativeAmount(amount, ratio);

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        ratio,
        totalStaked: metrics?.[EMetricsServiceName.SSV]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.SSV]?.totalStakedUsd,
      }),
    [amount, metrics, ratio],
  );

  return {
    amount,
    isLoading: isDashboardDataLoading,
    isStakeLoading: false,
    nativeAmount,
    network,
    stakeLink: EthereumSSVRoutes.stake.generatePath(),
    token: Token.asETHc,
    unstakeLink: undefined,
    usdAmount,
  };
};
