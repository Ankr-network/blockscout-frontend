import { RequestsWidget } from 'modules/common/components/RequestsWidget/RequestsWidget';

import {
  IPrivateChainRequestsWidgetProps,
  usePrivateChainRequestsWidget,
} from './usePrivateChainRequestsWidget';
import { usePrivateChainRequestsWidgetStyles } from './usePrivateChainRequestsWidgetStyles';

export const PrivateChainRequestsWidget = ({
  chain,
  chainSubType,
  chainType,
  group,
}: IPrivateChainRequestsWidgetProps) => {
  const {
    isLoading,
    requestsChartData,
    requestsCount,
    timeframe,
    timeframeTabs,
  } = usePrivateChainRequestsWidget({
    chain,
    chainSubType,
    chainType,
    group,
  });

  const { classes } = usePrivateChainRequestsWidgetStyles();

  return (
    <RequestsWidget
      className={classes.totalRequestsWidget}
      width="100%"
      requestsChartData={requestsChartData}
      isLoading={isLoading}
      requestsCount={requestsCount}
      timeframe={timeframe}
      timeframeTabs={timeframeTabs}
    />
  );
};
