import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import {
  ACTION_CACHE_SEC,
  XDC_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';
import { RoutesConfig as XDCRoutes } from 'modules/stake-xdc/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

interface IUseStakedAXDCCData {
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

export const useStakedAXDCC = (): IUseStakedAXDCCData => {
  const { data: dashboardData, isFetching: isDashboardDataLoading } =
    useGetDashboardDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = dashboardData?.aXDCcBalance ?? ZERO;

  const ratio = dashboardData?.aXDCcRatio ?? ZERO;

  const nativeAmount = getTokenNativeAmount(amount, ratio);

  const network = t(`chain.${XDC_NETWORK_BY_ENV}`);

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount,
        ratio,
        totalStaked: metrics?.[EMetricsServiceName.XDC]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.XDC]?.totalStakedUsd,
      }),
    [amount, metrics, ratio],
  );

  return {
    amount,
    isLoading: isDashboardDataLoading,
    isStakeLoading: false,
    nativeAmount,
    network,
    stakeLink: XDCRoutes.stake.generatePath(),
    token: Token.aXDCc,
    unstakeLink: XDCRoutes.unstake.generatePath(),
    usdAmount,
  };
};
