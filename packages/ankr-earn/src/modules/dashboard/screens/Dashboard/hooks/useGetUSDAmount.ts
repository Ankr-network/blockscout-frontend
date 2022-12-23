import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ZERO } from 'modules/common/const';
import { getUSDAmount } from 'modules/dashboard/utils/getUSDAmount';
import { getMetrics } from 'modules/stake/actions/getMetrics';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

export const useGetUSDAmount = (
  amount: BigNumber = ZERO,
  serviceName: EMetricsServiceName,
  ratio?: BigNumber,
): BigNumber | undefined => {
  const { data: metrics } = useQuery({
    type: getMetrics,
  });
  const totalStaked = metrics?.[serviceName]?.totalStaked;
  const totalStakedUsd = metrics?.[serviceName]?.totalStakedUsd;
  return useMemo(
    () =>
      getUSDAmount({
        amount,
        ratio,
        totalStaked,
        totalStakedUsd,
      }),
    [amount, ratio, totalStaked, totalStakedUsd],
  );
};
