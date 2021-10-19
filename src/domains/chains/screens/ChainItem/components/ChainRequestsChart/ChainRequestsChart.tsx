import React, { useCallback, useMemo } from 'react';

import { Chart } from 'modules/common/components/Chart';
import { ChartTooltip } from './ChartTooltip';
import {
  formatCallsCount,
  formatDate,
  processData,
} from './ChainRequestsChartUtils';
import { ChainRequestsChartProps } from './ChainRequestsChartTypes';

export const ChainRequestsChart = ({
  requestsLog,
}: ChainRequestsChartProps) => {
  const data = useMemo(() => processData(requestsLog), [requestsLog]);

  const callsFormatter = useCallback(formatCallsCount, []);
  const tickFormatter = useCallback(formatDate, []);

  return (
    <Chart
      data={data}
      xAxisTickFormatter={tickFormatter}
      yAxisTickFormatter={callsFormatter}
      tooltipContent={<ChartTooltip />}
    />
  );
};
