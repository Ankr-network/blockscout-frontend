import React, { useCallback } from 'react';

import { Chart, IChartData } from 'modules/common/components/Chart';
import { ChartTooltip } from './ChartTooltip';

import { formatCallsCount, formatDate } from './ChainRequestsChartUtils';

const date = new Date();

const data: IChartData[] = [
  {
    time: date,
    value: 0,
  },
  {
    time: date,
    value: 1,
  },
  {
    time: date,
    value: 2,
  },
  {
    time: date,
    value: 1.5,
  },
  {
    time: date,
    value: 0,
  },
];

export const ChainRequestsChart = () => {
  const tickFormatter = useCallback(formatDate, []);
  const callsFormatter = useCallback(formatCallsCount, []);

  return (
    <Chart
      data={data}
      xAxisTickFormatter={tickFormatter}
      yAxisTickFormatter={callsFormatter}
      tooltipContent={<ChartTooltip />}
    />
  );
};
