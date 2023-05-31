import { OverlaySpinner } from '@ankr.com/ui';

import { Chart } from 'modules/common/components/Chart';
import { Placeholder } from './components/Placeholder';
import { RequestsChartProps } from './types';
import { Tooltip } from './components/Tooltip';
import { useRequestsChart } from './hooks/useRequestsChart';
import { useRequestsChartStyles } from './RequestsChartStyles';

export const RequestsChart = ({
  title,
  className,
  ...props
}: RequestsChartProps) => {
  const { chartProps, hasChart, hasPlaceholder, hasPreloader } =
    useRequestsChart(props);

  const { classes, cx } = useRequestsChartStyles();

  return (
    <div className={cx(classes.root, className)}>
      {title}
      <div className={classes.content}>
        {hasPreloader && <OverlaySpinner />}
        {hasPlaceholder && <Placeholder />}
        {hasChart && <Chart {...chartProps} tooltipContent={<Tooltip />} />}
      </div>
    </div>
  );
};
