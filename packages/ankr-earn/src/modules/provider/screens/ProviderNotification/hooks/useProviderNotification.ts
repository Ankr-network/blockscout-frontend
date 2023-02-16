import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';

import { ZERO } from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { useGetProviderRewardsQuery } from 'modules/provider/actions/getRewards';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

interface IUseProviderNotification {
  ethAmount: BigNumber;
  usdAmount?: BigNumber;
  isLoading: boolean;
}

export const useProviderNotification = (
  userAddress: string,
): IUseProviderNotification => {
  const dispatchRequest = useDispatchRequest();

  const { data: rewardsData, isFetching: isLoading } =
    useGetProviderRewardsQuery(userAddress.toLowerCase(), {
      refetchOnMountOrArgChange: LONG_CACHE_TIME,
    });

  const { data: metrics } = useQuery({ type: getMetrics });

  const ethAmount = rewardsData ?? ZERO;

  const usdAmount = useMemo(
    () =>
      getUSDAmount({
        amount: ethAmount,
        totalStaked: metrics?.[EMetricsServiceName.ETH]?.totalStaked,
        totalStakedUsd: metrics?.[EMetricsServiceName.ETH]?.totalStakedUsd,
      }),
    [ethAmount, metrics],
  );

  useEffect(() => {
    dispatchRequest(getMetrics());
  }, [dispatchRequest]);

  return {
    ethAmount,
    usdAmount,
    isLoading,
  };
};
