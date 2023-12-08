import { useCallback, useMemo } from 'react';

import { RequestsChartProps } from '../types';
import { formatXAxis } from '../utils/formatXAxis';
import { useContent } from './useContent';
import { IChartProps } from '../../Chart';
import { TranslationRequestWidget } from '../../../types';

interface UseRequestsChartProps
  extends Omit<RequestsChartProps, 'className' | 'title'> {
  translation: TranslationRequestWidget;
}

export const useRequestsChart = ({
  translation,
  data,
  isLoading,
  timeframe,
  hasFixedHeight = false,
}: UseRequestsChartProps) => {
  const xAxisTickFormatter = useCallback(
    (value: Date) =>
      formatXAxis(
        { time: translation.time(value), date: translation.date(value) },
        timeframe,
      ),
    [timeframe, translation],
  );

  const yAxisTickFormatter = useCallback(
    (value: number) => translation.callsCount(value),
    [translation],
  );

  const chartProps: IChartProps = useMemo(
    () => ({
      translation,
      data,
      hasFixedHeight,
      loading: isLoading,
      xAxisTickFormatter,
      yAxisTickFormatter,
    }),
    [
      data,
      isLoading,
      translation,
      hasFixedHeight,
      xAxisTickFormatter,
      yAxisTickFormatter,
    ],
  );

  const { hasPreloader, hasChart, hasPlaceholder } = useContent({
    data,
    isLoading,
  });

  return { chartProps, hasChart, hasPlaceholder, hasPreloader };
};
