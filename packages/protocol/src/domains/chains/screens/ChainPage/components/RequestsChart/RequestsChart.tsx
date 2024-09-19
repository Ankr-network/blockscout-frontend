import { RequestsChart as RequestChartBase } from 'modules/common/components/RequestsChart';
import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';

import { RequestsChartProps } from './types';

export const RequestsChart = ({
  isConnecting,
  isFlexibleHeight,
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
}: RequestsChartProps) => {
  const data = getChartDataByRequests({
    isLoggedIn,
    timeframe,
    requests: totalRequestsHistory,
  });

  return (
    <RequestChartBase
      data={data}
      isLoading={loading || isConnecting}
      timeframe={timeframe}
      isFlexibleHeight={isFlexibleHeight}
    />
  );
};
