import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import { skipToken } from '@reduxjs/toolkit/query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { featuresConfig, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetDashboardDataQuery } from 'modules/stake-ssv/actions/getDashboardData';
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
  const { data: dashboardData, isLoading: isDashboardDataLoading } =
    useGetDashboardDataQuery(featuresConfig.ssvStaking ? undefined : skipToken);

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = dashboardData?.asETHcBalance ?? ZERO;

  const ratio = dashboardData?.asETHcRatio ?? ZERO;

  const network = t(`chain.${SSV_ETH_NETWORK_BY_ENV}`);

  const nativeAmount = getTokenNativeAmount(amount, ratio);

  const totalStaked = metrics?.[EMetricsServiceName.ETH_SSV]?.totalStaked;
  const totalStakedUsd = metrics?.[EMetricsServiceName.ETH_SSV]?.totalStakedUsd;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        ratio,
        totalStaked,
        totalStakedUsd,
      }),
    [amount, totalStaked, totalStakedUsd, ratio],
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
