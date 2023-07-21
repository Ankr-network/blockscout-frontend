import { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  IRequestsChartProps,
  RequestsChart,
} from '../../../RequestsChart/RequestsChart';
import {
  Tooltip as BarTooltip,
  intlFailedRequestsBannerRoot,
} from '../Tooltip';
import { useChartBar } from './hooks/useChartBar';

export const FailedRequestsChart = ({ data }: IRequestsChartProps) => {
  const theme = useTheme();

  const barMetaList = useChartBar(theme);

  const tickFormatter = useCallback(
    (value: number) =>
      t(`${intlFailedRequestsBannerRoot}.value`, {
        value: Math.abs(value),
      }),
    [],
  );

  return (
    <RequestsChart
      barMetaList={barMetaList}
      tickFormatter={tickFormatter}
      data={data}
      tooltipContent={<BarTooltip />}
      yAxisScale="linear"
    />
  );
};
