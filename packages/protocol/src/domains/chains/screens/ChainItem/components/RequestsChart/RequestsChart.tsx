import { RequestsChart as RequestChartBase } from 'modules/common/components/RequestsChart';

import { RequestsChartProps } from './types';
import { useChartData } from './hooks/useChartData';

export const RequestsChart = ({
  isConnecting,
  isFlexibleHeight,
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
}: RequestsChartProps) => {
  const data = useChartData({ isLoggedIn, timeframe, totalRequestsHistory });

  return (
    <RequestChartBase
      data={data}
      isLoading={loading || isConnecting}
      timeframe={timeframe}
      isFlexibleHeight={isFlexibleHeight}
    />
  );
};
