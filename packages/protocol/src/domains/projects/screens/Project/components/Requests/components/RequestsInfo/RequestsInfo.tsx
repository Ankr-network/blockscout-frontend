import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import {
  Chart,
  IChartData,
  IChartProps,
} from 'modules/common/components/Chart';
import { Sign } from 'modules/common/types/types';
import { formatLongNumber } from 'modules/common/utils/formatNumber';

import { EmptyRequestsGuard } from '../EmptyRequestsGuard';
import { useRequestsInfoStyles } from './useRequestsInfoStyles';

interface RequestsInfoProps {
  data: IChartData[];
  isLoading: boolean;
  relativeChange?: number;
  totalRequestsCount: number;
}

export const RequestsInfo = ({
  data,
  isLoading,
  relativeChange,
  totalRequestsCount,
}: RequestsInfoProps) => {
  const relativeChangeSign = Math.sign(relativeChange ?? 0) as Sign;

  const { classes } = useRequestsInfoStyles(relativeChangeSign);

  const chartProps = useMemo(
    (): IChartProps => ({
      data,
      hasHorizontalLines: false,
      xAxisTickFormatter: () => '',
      height: 52,
      width: 220,
    }),
    [data],
  );

  const nonEmptyData = useMemo(
    () => data.filter(({ value }) => Boolean(value)),
    [data],
  );

  const intlKey =
    relativeChange === 0
      ? 'project.total-requests.relative-change-zero'
      : 'project.total-requests.relative-change';

  return (
    <EmptyRequestsGuard data={nonEmptyData} isLoading={isLoading}>
      <div className={classes.chart}>
        <div className={classes.requestsCount}>
          <Typography variant="h6" className={classes.count}>
            {formatLongNumber(totalRequestsCount)}
          </Typography>
          {typeof relativeChange !== 'undefined' && (
            <Typography
              className={classes.percent}
              variant={'body4' as Variant}
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
