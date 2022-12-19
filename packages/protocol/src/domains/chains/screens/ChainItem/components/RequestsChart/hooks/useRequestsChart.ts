import { IChartProps } from 'modules/common/components/Chart';
import { RequestsChartProps } from '../types';
import { isTotalRequestsHistoryNotEmpty } from '../utils/isTotalRequestsHistoryNotEmpty';
import { useChartProps } from './useChartProps';

export interface RequestsChart {
  chartProps: IChartProps;
  timeframe: RequestsChartProps['timeframe'];
  withChart: boolean;
  withPlaceholder: boolean;
  withPreloader: boolean;
}

export const useRequestsChart = ({
  isConnecting,
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
}: RequestsChartProps): RequestsChart => {
  const withPreloader = loading;
  const withChart =
    !isConnecting &&
    !withPreloader &&
    isTotalRequestsHistoryNotEmpty(totalRequestsHistory);

  const withPlaceholder = Boolean(isLoggedIn && !loading);

  const chartProps = useChartProps({
    isLoggedIn,
    loading,
    timeframe,
    totalRequestsHistory,
  });

  return {
    chartProps,
    timeframe,
    withChart,
    withPlaceholder,
    withPreloader,
  };
};
