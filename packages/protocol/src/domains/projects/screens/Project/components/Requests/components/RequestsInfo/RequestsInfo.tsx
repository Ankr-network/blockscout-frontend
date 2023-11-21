import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { useMemo } from 'react';

import { formatLongNumber } from 'modules/common/utils/formatNumber';
import {
  Chart,
  IChartData,
  IChartProps,
} from 'modules/common/components/Chart';

import { useRequestsInfoStyles } from './useRequestsInfoStyles';
import { EmptyRequestsGuard } from '../EmptyRequestsGuard';

interface RequestsInfoProps {
  data: IChartData[];
  isLoading: boolean;
  totalRequestsCount: number;
}

const HAS_PERCENT = false;

export const RequestsInfo = ({
  data,
  isLoading,
  totalRequestsCount,
}: RequestsInfoProps) => {
  const { classes } = useRequestsInfoStyles();

  const chartProps: IChartProps = useMemo(
    () => ({
      data,
      hasHorizontalLines: false,
      xAxisTickFormatter: () => '',
      height: 52,
      width: 220,
    }),
    [data],
  );

  return (
    <EmptyRequestsGuard data={data} isLoading={isLoading}>
      <div className={classes.chart}>
        <div className={classes.requestsCount}>
          <Typography variant="h6" className={classes.count}>
            {formatLongNumber(totalRequestsCount)}
          </Typography>
          {HAS_PERCENT && (
            <Typography
              variant={'body4' as Variant}
              className={classes.percent}
            >
              -1.5%
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
