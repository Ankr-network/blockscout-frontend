import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { useTheme } from '@mui/material';
import { IRequestsChartProps, RequestsChart } from '../../../RequestsChart';
import { Tooltip as BarTooltip } from '../Tooltip';
import { useChartBar } from './hooks/useChartBar';

export const RequestsChartWrapper = ({ data }: IRequestsChartProps) => {
  const theme = useTheme();

  const barMetaList = useChartBar(theme);

  const tickFormatter = useCallback(
    (value: number) =>
      t(`requests-banner.value`, {
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
    />
  );
};
