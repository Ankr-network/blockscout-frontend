import { IChartProps } from 'modules/common/components/Chart';
import { RequestsChartProps } from '../types';
import { useChartProps } from './useChartProps';

export interface RequestsChart {
  chartProps: IChartProps;
  timeframe: RequestsChartProps['timeframe'];
}

export const useRequestsChart = ({
  isChartDataLoading,
  timeframe,
  totalRequestsHistory,
}: RequestsChartProps): RequestsChart => {
  const chartProps = useChartProps({
    isChartDataLoading,
    timeframe,
    totalRequestsHistory,
  });

  return {
    chartProps,
    timeframe,
  };
};
