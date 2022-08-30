import { Spinner } from 'ui';

import { useRequestsChartStyles } from './RequestsChartStyles';

export const RequestsChartSkeleton = () => {
  const classes = useRequestsChartStyles();

  return (
    <div className={classes.requestsChart}>
      <div className={classes.content}>
        <Spinner />
      </div>
    </div>
  );
};
