import React, { useCallback, useMemo, useRef } from 'react';

import { Chart } from 'modules/common/components/Chart';
import { ChartTooltip } from './ChartTooltip';
import {
  formatCallsCount,
  formatDate,
  processData,
} from './ChainRequestsChartUtils';
import { ChainRequestsChartProps } from './ChainRequestsChartTypes';
import { Timeframe } from '@ankr.com/multirpc';

export const ChainRequestsChart = ({
  timeframe,
  requestsLog,
}: ChainRequestsChartProps) => {
  const data = useMemo(() => processData(requestsLog), [requestsLog]);
  const timeframeRef = useRef<Timeframe>();
  timeframeRef.current = timeframe;
  const callsFormatter = useCallback(formatCallsCount, []);
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
    />
  );
};
