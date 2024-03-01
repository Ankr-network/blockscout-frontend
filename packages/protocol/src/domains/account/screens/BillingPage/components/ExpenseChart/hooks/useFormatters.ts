import { useCallback } from 'react';
import { t } from '@ankr.com/common';

import { ChartTimeframe } from '../types';
import { formatDateMap, root } from '../const';

export type Formatters = [(value: Date) => string, (value: number) => string];

export const useFormatters = (timeframe: ChartTimeframe): Formatters => {
  const xFormatter = useCallback(
    (value: Date) => formatDateMap[timeframe](value),
    [timeframe],
  );

  const yFormatter = useCallback(
    (value: number) => t(`${root}.chart.expense`, { value }),
    [],
  );

  return [xFormatter, yFormatter];
};
