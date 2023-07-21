import { CSVLink } from 'react-csv';
import { PrivateStatTopRequests } from 'multirpc-sdk';
import { Button, Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';
import { Download } from '@ankr.com/ui';

import { ChainID, Timeframe } from 'domains/chains/types';
import { getRequestsAverage } from 'domains/chains/utils/getRequestsAverage';
import { selectBlockHeight } from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Chart } from '../BasePieChart/components/Chart';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { getColor } from '../BasePieChart/utils/getColor';
import { mapChartData, mapRequests } from './MethodCallsWidgetUtils';
import { useMethodCallsWidgetStyles } from './MethodCallsWidgetStyles';

interface IMethodCallsProps {
  className?: string;
  timeframe: Timeframe;
  total?: number;
  requests?: PrivateStatTopRequests[];
  chainId: ChainID;
}

export const MethodCallsWidget = ({
  className,
  requests = [],
  timeframe,
  total = 0,
  chainId,
}: IMethodCallsProps) => {
  const { cx, classes } = useMethodCallsWidgetStyles();

  const requestsMapped = requests.map(request =>
    mapRequests({ ...request, total }),
  );

  const blockHeight = useAppSelector(state =>
    selectBlockHeight(state, chainId),
  );

  const {
    classes: { container },
  } = useNoDataContainerStyles(requestsMapped.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <div className={classes.header}>
        <Title className={classes.title}>
          {t('dashboard.method-calls.title')}
        </Title>

        {requests && requests.length > 0 && (
          <Button variant="text" startIcon={<Download />}>
            <CSVLink data={requests}>
              {t('chain-item.method-calls.download-button')}
            </CSVLink>
          </Button>
        )}
      </div>
      <NoDataGuard data={requestsMapped}>
        <ScrollableContainer>
          <div className={classes.chartWrapper}>
            <div className={classes.chartElement}>
              <Chart
                className={classes.chart}
                amount={total.toString()}
                data={mapChartData(requestsMapped)}
                hasOtherValuesSection
                amountClassName={classes.amount}
              />
            </div>
            <div className={classes.stats}>
              {Boolean(blockHeight) && (
                <div>
                  <Typography className={classes.statsLabel} variant="caption">
                    {t('dashboard.method-calls.block-height')}
                  </Typography>
                  <Title>{blockHeight}</Title>
                </div>
              )}

              <div>
                <Typography className={classes.statsLabel} variant="caption">
                  {t('dashboard.method-calls.average')}
                </Typography>
                <Title>
                  {getRequestsAverage(new BigNumber(total), timeframe)}
                </Title>
              </div>
            </div>
          </div>

          <div className={cx(classes.row, classes.rowHeader)}>
            <Typography className={classes.methodCell} variant="caption">
              {t('dashboard.method-calls.method')}
            </Typography>
            <Typography className={classes.countCell} variant="caption">
              {t('dashboard.method-calls.requests')}
            </Typography>
            <Typography className={classes.usageCell} variant="caption">
              {t('dashboard.method-calls.usage')}
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
      </NoDataGuard>
    </Paper>
  );
};
