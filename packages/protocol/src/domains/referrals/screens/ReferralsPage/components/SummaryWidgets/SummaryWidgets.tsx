import {
  CurrentPointsWidget,
  useCurrentPointWidget,
} from '../CurrentPointsWidget';
import { TotalPointsWidget, useTotalPointsWidget } from '../TotalPointsWidget';
import { useSummaryWidgetsStyles } from './useSummaryWidgetsStyles';

export const SummaryWidgets = () => {
  const { currentPointsWidgetProps } = useCurrentPointWidget();
  const { totalPointsWidgetProps } = useTotalPointsWidget();

  const { classes } = useSummaryWidgetsStyles();

  return (
    <div className={classes.root}>
      <CurrentPointsWidget {...currentPointsWidgetProps} />
      <TotalPointsWidget {...totalPointsWidgetProps} />
    </div>
  );
};
