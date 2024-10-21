import BigNumber from 'bignumber.js';
import { Button, Paper, SxProps, Typography } from '@mui/material';
import { CSVLink } from 'react-csv';
import { Download } from '@ankr.com/ui';

import { Chart } from '../BasePieChart/components/Chart';
import {
  MethodCallsRequests,
  Timeframe,
  TranslationMethodCallsWidget,
} from '../../types';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Theme } from '@mui/material/styles';
import { Title } from '../Title';
import { getColor } from '../BasePieChart/utils/getColor';
import { getRequestsAverage } from '../../utils/getRequestsAverage';
import { mapChartData, mapRequests } from './MethodCallsWidgetUtils';
import { useMethodCallsWidgetStyles } from './MethodCallsWidgetStyles';

interface IMethodCallsProps {
  NoDataPlaceholder?: typeof NoDataGuard;
  blockHeight?: number;
  className?: string;
  isLoading: boolean;
  requests?: MethodCallsRequests[];
  sx?: SxProps<Theme>;
  timeframe: Timeframe;
  total?: number;
  translation?: TranslationMethodCallsWidget;
}

export const MethodCallsWidget = ({
  NoDataPlaceholder = NoDataGuard,
  blockHeight,
  className,
  isLoading,
  requests = [],
  sx,
  timeframe,
  total = 0,
  translation = {
    downloadButton: 'Download',
    blockHeight: 'Block height',
    requests: 'Requests',
    average: 'Average',
    method: 'Method',
    noData: 'No Data',
    title: 'Method Calls',
    usage: 'Usage',
    total: (value: number) => `total ${value}`,
  },
}: IMethodCallsProps) => {
  const { cx, classes } = useMethodCallsWidgetStyles();

  const requestsMapped = requests.map(request =>
    mapRequests({ ...request, total }),
  );

  const {
    classes: { container },
  } = useNoDataContainerStyles();

  return (
    <Paper
      sx={sx}
      className={cx(classes.root, className, {
        [container]: requestsMapped.length === 0,
      })}
    >
      <div className={classes.header}>
        <Title className={classes.title}>{translation.title}</Title>

        <div className={classes.downloadBtnContainer}>
          {requests && requests.length > 0 && (
            <Button variant="text" startIcon={<Download />}>
              <CSVLink data={requests}>{translation.downloadButton}</CSVLink>
            </Button>
          )}
        </div>
      </div>
      <NoDataPlaceholder
        isLoading={isLoading}
        data={requestsMapped}
        text={translation.noData}
      >
        <ScrollableContainer>
          <div className={classes.chartWrapper}>
            <div className={classes.chartElement}>
              <Chart
                className={classes.chart}
                amount={translation.total(total)}
                data={mapChartData(requestsMapped)}
                hasOtherValuesSection
                amountClassName={classes.amount}
              />
            </div>
            <div className={classes.stats}>
              {Boolean(blockHeight) && (
                <div>
                  <Typography className={classes.statsLabel} variant="caption">
                    {translation.blockHeight}
                  </Typography>
                  <Title>{blockHeight}</Title>
                </div>
              )}

              <div>
                <Typography className={classes.statsLabel} variant="caption">
                  {translation.average}
                </Typography>
                <Title>
                  {getRequestsAverage(new BigNumber(total), timeframe)}
                </Title>
              </div>
            </div>
          </div>

          <div className={cx(classes.row, classes.rowHeader)}>
            <Typography className={classes.methodCell} variant="caption">
              {translation.method}
            </Typography>
            <Typography className={classes.countCell} variant="caption">
              {translation.requests}
            </Typography>
            <Typography className={classes.usageCell} variant="caption">
              {translation.usage}
            </Typography>
          </div>

          {requestsMapped.map(({ method, count, usage }, index) => (
            <div key={method} className={classes.row}>
              <Typography className={classes.methodCell} variant="caption">
                <div
                  style={{ backgroundColor: getColor(index, true) }}
                  className={classes.dot}
                />
                <span className={classes.methodName}>{method}</span>
              </Typography>
              <Typography className={classes.countCell} variant="caption">
                {count}
              </Typography>
              <Typography className={classes.usageCell} variant="caption">
                {usage}%
              </Typography>
            </div>
          ))}
        </ScrollableContainer>
      </NoDataPlaceholder>
    </Paper>
  );
};
