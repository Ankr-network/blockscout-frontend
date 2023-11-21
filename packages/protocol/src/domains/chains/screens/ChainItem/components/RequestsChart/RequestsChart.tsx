import { t } from '@ankr.com/common';

import { RequestsChart as RequestChartBase } from 'modules/common/components/RequestsChart';

import { ItemHeader } from '../ItemHeader';
import { RequestsChartProps } from './types';
import { useChartData } from './hooks/useChartData';

export const RequestsChart = ({
  isConnecting,
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
  isFlexibleHeight,
}: RequestsChartProps) => {
  const data = useChartData({ isLoggedIn, timeframe, totalRequestsHistory });

  return (
    <RequestChartBase
      data={data}
      isLoading={loading || isConnecting}
      timeframe={timeframe}
      title={
        <ItemHeader
          timeframe={timeframe}
          title={t('chain-item.usage-data.chart.title')}
        />
      }
      isFlexibleHeight={isFlexibleHeight}
    />
  );
};
