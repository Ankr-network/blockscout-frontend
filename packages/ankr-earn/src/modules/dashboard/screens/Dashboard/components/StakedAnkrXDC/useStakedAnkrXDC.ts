import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import {
  ACTION_CACHE_SEC,
  XDC_NETWORK_BY_ENV,
  ZERO,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenNativeAmount } from 'modules/dashboard/utils/getTokenNativeAmount';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetDashboardDataQuery } from 'modules/stake-xdc/actions/getDashboardData';
import { XDC_PROVIDER_ID } from 'modules/stake-xdc/const';
import { RoutesConfig as XDCRoutes } from 'modules/stake-xdc/Routes';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

interface IUseStakedAnkrXDCData {
  amount: BigNumber;
  isLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  nativeAmount?: BigNumber;
  network: string;
  stakeLink: string;
  token: Token;
  unstakeLink?: string;
  usdAmount?: BigNumber;
  onAddStakingClick: () => void;
}

const TOKEN = Token.ankrXDC;

export const useStakedAnkrXDC = (): IUseStakedAnkrXDCData => {
  const { address, walletName } = useConnectedData(XDC_PROVIDER_ID);

  const { data: dashboardData, isFetching: isDashboardDataLoading } =
    useGetDashboardDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const amount = dashboardData?.ankrXDCBalance ?? ZERO;

  const ratio = dashboardData?.ankrXDCRatio ?? ZERO;

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

  const onAddStakingClick = (): void =>
    trackEnterStakingFlow({
      accessPoint: 'add_stake',
      tokenName: TOKEN,
      walletPublicAddress: address,
      walletType: walletName,
    });

  return {
    amount,
    isLoading: isDashboardDataLoading,
    isStakeLoading: false,
    isUnstakeLoading: false,
    nativeAmount,
    network,
    stakeLink: XDCRoutes.stake.generatePath(),
    token: TOKEN,
    unstakeLink: XDCRoutes.unstake.generatePath(),
    usdAmount,
    onAddStakingClick,
  };
};
