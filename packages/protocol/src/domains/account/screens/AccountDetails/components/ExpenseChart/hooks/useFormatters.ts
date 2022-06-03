import { useCallback } from 'react';

import { ChartTimeframe } from '../types';
import { formatDateMap, root } from '../const';
import { t } from 'modules/i18n/utils/intl';

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
