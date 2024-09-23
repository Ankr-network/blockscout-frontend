import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { Chart, IChartData, IChartProps } from '@ankr.com/telemetry';

import { Sign } from 'modules/common/types';
import { formatLongNumber } from 'modules/common/utils/formatNumber';

import { EmptyRequestsGuard } from '../EmptyRequestsGuard';
import { useRequestsInfoStyles } from './useRequestsInfoStyles';

interface RequestsInfoProps {
  data: IChartData[];
  isLoading: boolean;
  relativeChange?: number;
  totalRequestsCount: number;
  isDisabled?: boolean;
  width?: string | number;
  shouldShowZeroValues?: boolean;
}

export const RequestsInfo = ({
  data,
  isDisabled,
  isLoading,
  relativeChange,
  shouldShowZeroValues,
  totalRequestsCount,
  width = 220,
}: RequestsInfoProps) => {
  const relativeChangeSign = Math.sign(relativeChange || 0) as Sign;

  const { classes, cx } = useRequestsInfoStyles(relativeChangeSign);

  const chartProps = useMemo(
    (): IChartProps => ({
      data,
      hasHorizontalLines: false,
      xAxisTickFormatter: () => '',
      yAxisTickFormatter: () => '',
      height: 52,
      width,
      isDisabledColor: isDisabled,
    }),
    [data, isDisabled, width],
  );

  const nonEmptyData = useMemo(() => {
    if (shouldShowZeroValues) {
      return data;
    }

    return data.filter(({ value }) => Boolean(value));
  }, [data, shouldShowZeroValues]);

  const intlKey =
    relativeChange === 0
      ? 'project.total-requests.relative-change-zero'
      : 'project.total-requests.relative-change';

  return (
    <EmptyRequestsGuard data={nonEmptyData} isLoading={isLoading}>
      <div className={classes.chart}>
        <div className={classes.requestsCount}>
          <Typography
            variant="h6"
            className={cx(classes.requestsCountValue, {
              [classes.disabled]: isDisabled,
            })}
          >
            {formatLongNumber(totalRequestsCount)}
            <Typography
              variant="body3"
              color="textSecondary"
              className={classes.requestsLabel}
            >
              {t('projects.list-project.requests-label')}
            </Typography>
          </Typography>
          {typeof relativeChange !== 'undefined' && (
            <Typography
              className={cx(classes.percent, {
                [classes.disabled]: isDisabled,
              })}
              variant="body4"
            >
              {t(intlKey, { relativeChange, relativeChangeSign })}
            </Typography>
          )}
        </div>
        <div className={classes.requestsChart}>
          <Chart {...chartProps} />
        </div>
      </div>
    </EmptyRequestsGuard>
  );
};
