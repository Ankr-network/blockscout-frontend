import { Placeholder } from '@ankr.com/telemetry/src/components/RequestsChart/components/Placeholder';

import { NoDataPlaceholder } from '../NoDataPlaceholder';
import { useRequestsWidgetPlaceholderStyles } from './useRequestsWidgetPlaceholderStyles';

export const RequestsWidgetPlaceholder: typeof Placeholder = () => {
  const { classes } = useRequestsWidgetPlaceholderStyles();

  return (
    <div className={classes.root}>
      <NoDataPlaceholder className={classes.placeholder} />
    </div>
  );
};
