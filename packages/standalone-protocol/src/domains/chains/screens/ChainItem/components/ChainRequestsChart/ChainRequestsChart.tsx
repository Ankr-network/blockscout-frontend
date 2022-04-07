import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Typography, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { Chart } from 'modules/common/components/Chart';
import { t } from 'modules/i18n/utils/intl';
import { ChainRequestsChartProps } from './ChainRequestsChartTypes';
import { useStyles } from './useStyles';
import {
  getCachedRequestsColor,
  getTotalRequestsColor,
  hasGradient,
  processData,
  getForeColor,
} from './ChainRequestsChartUtils';

export const ChainRequestsChart = ({
  totalRequestsHistory = {},
  totalCachedHistory = {},
  className = '',
  loading,
  chainId,
}: ChainRequestsChartProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const requestsHistory = useMemo(
    () => processData(totalRequestsHistory).map(row => row.callsCount),
    [totalRequestsHistory],
  );

  requestsHistory.pop();

  const cachedHistory = useMemo(
    () => processData(totalCachedHistory).map(row => row.callsCount),
    [totalCachedHistory],
  );

  cachedHistory.pop();

  const xValues = useMemo(
    () => processData(totalRequestsHistory).map(row => row.rowTime),
    [totalRequestsHistory],
  );

  const chartSeries = useMemo(
    () => [
      {
        name: t('chain-item.details.total-requests'),
        data: requestsHistory,
        color: getTotalRequestsColor(chainId, theme),
      },
      {
        name: t('chain-item.details.cached-requests'),
        data: cachedHistory,
        color: getCachedRequestsColor(chainId, theme),
      },
    ],
    [requestsHistory, cachedHistory, theme, chainId],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <Typography
        variant="body1"
        color="textPrimary"
        className={classes.header}
      >
        {t('chain-item.chart.header')}
      </Typography>
      {loading ? (
        <Skeleton className={classes.skeleton} height="320px" />
      ) : (
        <Chart
          xValues={xValues}
          series={chartSeries}
          theme={theme}
          hasGradient={hasGradient(chainId)}
          foreColor={getForeColor(chainId, theme)}
        />
      )}
    </div>
  );
};
