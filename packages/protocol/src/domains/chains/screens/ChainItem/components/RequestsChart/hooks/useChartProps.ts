import { useCallback, useMemo } from 'react';

import { IChartProps } from 'modules/common/components/Chart';
import { RequestsChartProps } from '../types';
import { formatXAxis } from '../utils/formatXAxis';
import { processData } from '../utils/processData';
import { t } from 'modules/i18n/utils/intl';

export type ChartPropsParams = Pick<
  RequestsChartProps,
  'isLoggedIn' | 'loading' | 'timeframe' | 'totalRequestsHistory'
>;

export const useChartProps = ({
  isLoggedIn,
  loading,
  timeframe,
  totalRequestsHistory,
}: ChartPropsParams): IChartProps => {
  const data = useMemo(
    () => processData(timeframe, totalRequestsHistory, isLoggedIn),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, totalRequestsHistory],
  );

  const yAxisTickFormatter = useCallback(
    (value: number) => t('chain-item.usage-data.chart.calls-count', { value }),
    [],
  );

  const xAxisTickFormatter = useCallback(
    value => formatXAxis(value, timeframe),
    [timeframe],
  );

  return {
    data,
    loading,
    xAxisTickFormatter,
    yAxisTickFormatter,
  };
};
