import { OverlaySpinner } from '@ankr.com/ui';

import { Placeholder } from './components/Placeholder';
import { RequestsChartProps } from './types';
import { Tooltip } from './components/Tooltip';
import { useRequestsChart } from './hooks/useRequestsChart';
import { useRequestsChartStyles } from './RequestsChartStyles';
import { Chart } from '../Chart';
import { Box } from '@mui/material';

export const RequestsChart = ({
  translation,
  sx,
  title,
  className,
  NoDataPlaceholder = Placeholder,
  ...props
}: RequestsChartProps) => {
  const { chartProps, hasChart, hasPlaceholder, hasPreloader } =
    useRequestsChart({ ...props, translation });

  const { classes, cx } = useRequestsChartStyles();

  return (
    <Box sx={sx} className={cx(classes.root, className)}>
      {title}
      <Box className={classes.content}>
        {hasPreloader && <OverlaySpinner />}
        {hasPlaceholder && (
          <NoDataPlaceholder
            title={translation.placeholderTitle}
            subtitle={translation.placeholderSubtitle}
          />
        )}
        {hasChart && (
          <Chart
            {...chartProps}
            tooltipContent={
              <Tooltip
                translation={{ time: translation.time, date: translation.date }}
              />
            }
          />
        )}
      </Box>
    </Box>
  );
};
