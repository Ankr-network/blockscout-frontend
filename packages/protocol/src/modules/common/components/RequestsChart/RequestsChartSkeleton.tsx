import { OverlaySpinner } from '@ankr.com/ui';

import { useRequestsChartStyles } from './RequestsChartStyles';

export const RequestsChartSkeleton = () => {
  const { classes } = useRequestsChartStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <OverlaySpinner />
      </div>
    </div>
  );
};
