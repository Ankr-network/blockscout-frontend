import { t } from '@ankr.com/common';

import { ItemHeader } from '../ItemHeader';
import { RequestsChartProps } from './types';
import { RequestsChart as RequestChartBase } from 'modules/common/components/RequestsChart';
import { useChartData } from './hooks/useChartData';

export const RequestsChart = ({
  isConnecting,
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
}: RequestsChartProps) => {
  const data = useChartData({ isLoggedIn, timeframe, totalRequestsHistory });

  return (
    <RequestChartBase
      data={data}
      hasFixedHeight
      isLoading={loading || isConnecting}
      timeframe={timeframe}
      title={
        <ItemHeader
          timeframe={timeframe}
          title={t('chain-item.usage-data.chart.title')}
        />
      }
    />
  );
};
