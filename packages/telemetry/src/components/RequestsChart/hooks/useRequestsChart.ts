import { useCallback, useMemo } from 'react';

import { RequestsChartProps } from '../types';
import { formatXAxis } from '../utils/formatXAxis';
import { text } from '../utils/text';
import { useContent } from './useContent';
import { IChartProps } from '../../Chart';

export const useRequestsChart = ({
  data,
  isLoading,
  timeframe,
  hasFixedHeight = false,
}: Omit<RequestsChartProps, 'className' | 'title'>) => {
  const xAxisTickFormatter = useCallback(
    value => formatXAxis(value, timeframe),
    [timeframe],
  );

  const yAxisTickFormatter = useCallback(
    (value: number) => text('calls-count', { value }),
    [],
  );

  const chartProps: IChartProps = useMemo(
    () => ({
      data,
      hasFixedHeight,
      loading: isLoading,
      xAxisTickFormatter,
      yAxisTickFormatter,
    }),
    [data, hasFixedHeight, isLoading, xAxisTickFormatter, yAxisTickFormatter],
  );

  const { hasPreloader, hasChart, hasPlaceholder } = useContent({
    data,
    isLoading,
  });

  return { chartProps, hasChart, hasPlaceholder, hasPreloader };
};
