import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getRewards } from 'modules/provider/actions/getRewards';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

interface IUseProviderNotification {
  ethAmount: BigNumber;
  usdAmount?: BigNumber;
  isLoading: boolean;
}

export const useProviderNotification = (): IUseProviderNotification => {
  const dispatchRequest = useDispatchRequest();
  const { data: rewardsData, loading: isLoading } = useQuery({
    type: getRewards,
  });

  const { data: metrics } = useQuery({
    type: getMetrics,
  });

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);

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

  useProviderEffect(() => {
    if (!address) {
      return;
    }

    dispatchRequest(getMetrics());
    dispatchRequest(getRewards(address));
  }, [address]);

  return {
    ethAmount,
    usdAmount,
    isLoading,
  };
};
