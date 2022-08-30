import { Spinner } from 'ui';

import { Chart } from 'modules/common/components/Chart';
import { ItemHeader } from '../ItemHeader';
import { Placeholder } from './components/Placeholder';
import { RequestsChartProps } from './types';
import { Tooltip } from './components/Tooltip';
import { t } from 'modules/i18n/utils/intl';
import { useRequestsChart } from './hooks/useRequestsChart';
import { useRequestsChartStyles } from './RequestsChartStyles';

const title = t('chain-item.usage-data.chart.title');

export const RequestsChart = (props: RequestsChartProps) => {
  const { chartProps, timeframe, withChart, withPlaceholder, withPreloader } =
    useRequestsChart(props);

  const classes = useRequestsChartStyles();

  const placeholder = withPlaceholder ? <Placeholder /> : null;
  const preloader = withPreloader ? <Spinner /> : null;
  const chart = withChart ? (
    <Chart {...chartProps} tooltipContent={<Tooltip />} />
  ) : null;

  return (
    <div className={classes.requestsChart}>
      <ItemHeader timeframe={timeframe} title={title} />
      <div className={classes.content}>{preloader || chart || placeholder}</div>
    </div>
  );
};
