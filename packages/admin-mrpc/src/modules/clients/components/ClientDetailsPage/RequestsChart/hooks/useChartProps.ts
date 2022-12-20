import { useCallback, useMemo } from 'react';

import { IChartProps } from 'modules/common/components/Chart';
import { RequestsChartProps } from '../types';
import { formatXAxis } from '../utils/formatXAxis';
import { processData } from '../utils/processData';

export type ChartPropsParams = Pick<
  RequestsChartProps,
  'isChartDataLoading' | 'timeframe' | 'totalRequestsHistory'
>;

export const useChartProps = ({
  isChartDataLoading,
  timeframe,
  totalRequestsHistory,
}: ChartPropsParams): IChartProps => {
  const data = useMemo(
    () => processData(timeframe, totalRequestsHistory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalRequestsHistory],
  );

  const yAxisTickFormatter = useCallback((value: number) => `${value}`, []);

  const xAxisTickFormatter = useCallback(
    value => formatXAxis(value, timeframe),
    [timeframe],
  );

  return {
    data,
    isChartDataLoading,
    xAxisTickFormatter,
    yAxisTickFormatter,
  };
};
