import { useMemo } from 'react';

import { RequestsChartProps } from '../types';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import { useAuth } from 'domains/auth/hooks/useAuth';

export type ChartDataParams = Pick<
  RequestsChartProps,
  'isLoggedIn' | 'timeframe' | 'totalRequestsHistory'
>;

export const useChartData = ({
  isLoggedIn,
  timeframe,
  totalRequestsHistory,
}: ChartDataParams) => {
  const data = useMemo(
    () =>
      getChartDataByRequests({
        timeframe,
        requests: totalRequestsHistory,
        isLoggedIn,
      }),
    // we should skip timeframe because recalculation on timeframe change
    // can lead us to wrong calculation with old total requests history
    // and new timeframe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, totalRequestsHistory],
  );

  const { hasPrivateAccess } = useAuth();

  return useMemo(
    () => (hasPrivateAccess ? data : data.slice(1)),
    [hasPrivateAccess, data],
  );
};
