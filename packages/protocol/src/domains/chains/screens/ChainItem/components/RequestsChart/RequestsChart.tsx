import { useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { Chart } from 'modules/common/components/Chart';
import { ItemHeader } from '../ItemHeader';
import { Placeholder } from './components/Placeholder';
import { RequestsChartProps } from './types';
import { Tooltip } from './components/Tooltip';
import { t } from '@ankr.com/common';
import { useRequestsChart } from './hooks/useRequestsChart';
import { useRequestsChartStyles } from './RequestsChartStyles';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';

const title = t('chain-item.usage-data.chart.title');

export const RequestsChart = (props: RequestsChartProps) => {
  const { chartProps, timeframe, withChart, withPlaceholder, withPreloader } =
    useRequestsChart(props);

  const { hasPrivateAccess } = useAccountAuth();

  const { classes } = useRequestsChartStyles();

  const { data } = chartProps;

  const chartData = useMemo(
    () => (hasPrivateAccess ? data : data.slice(1)),
    [hasPrivateAccess, data],
  );

  const placeholder = withPlaceholder ? <Placeholder /> : null;
  const preloader = withPreloader ? <OverlaySpinner /> : null;
  const chart = withChart ? (
    <Chart {...chartProps} data={chartData} tooltipContent={<Tooltip />} />
  ) : null;

  return (
    <div className={classes.requestsChart}>
      <ItemHeader timeframe={timeframe} title={title} />
      <div className={classes.content}>{preloader || chart || placeholder}</div>
    </div>
  );
};
