import React, { useCallback, useMemo, useRef } from 'react';
import { Timeframe } from '@ankr.com/multirpc';

import { Chart } from 'modules/common/components/Chart';
import { ChartTooltip } from './ChartTooltip';
import { formatDate, processData } from './ChainRequestsChartUtils';
import { ChainRequestsChartProps } from './ChainRequestsChartTypes';
import { t } from 'modules/i18n/utils/intl';

export const ChainRequestsChart = ({
  timeframe,
  requestsLog,
  loading,
}: ChainRequestsChartProps) => {
  const data = useMemo(
    () => processData(requestsLog, timeframe),
    [requestsLog, timeframe],
  );
  const timeframeRef = useRef<Timeframe>();
  timeframeRef.current = timeframe;

  const callsFormatter = useCallback(
    (value: number) =>
      t('chain-item.chart.calls-count', {
        value,
      }),
    [],
  );

  const tickFormatter = useCallback(
    value => formatDate(value, timeframeRef.current),
    [],
  );

  return (
    <Chart
      data={data}
      xAxisTickFormatter={tickFormatter}
      yAxisTickFormatter={callsFormatter}
      tooltipContent={<ChartTooltip />}
      loading={loading}
    />
  );
};
