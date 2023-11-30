import { useCallback, useMemo } from 'react';

import { IChartProps } from 'modules/common/components/Chart';

import { RequestsChartProps } from '../types';
import { formatXAxis } from '../utils/formatXAxis';
import { text } from '../utils/text';
import { useContent } from './useContent';

export const useRequestsChart = ({
  data,
  isLoading,
  timeframe,
  isFlexibleHeight = true,
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
      loading: isLoading,
      xAxisTickFormatter,
      yAxisTickFormatter,
      isFlexibleHeight,
    }),
    [data, isLoading, xAxisTickFormatter, yAxisTickFormatter, isFlexibleHeight],
  );

  const { hasPreloader, hasChart, hasPlaceholder } = useContent({
    data,
    isLoading,
  });

  return { chartProps, hasChart, hasPlaceholder, hasPreloader };
};
