import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ReactText } from 'react';

import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useStatsStyles } from './useStatsStyles';

interface IStatsItemProps {
  title: string;
  isLoading?: boolean;
  tooltip?: string;
  primaryValue?: ReactText;
}

export const StatsItem = ({
  title,
  isLoading = false,
  tooltip,
  primaryValue,
}: IStatsItemProps): JSX.Element | null => {
  const classes = useStatsStyles();

  if (!isLoading && !primaryValue) return null;

  return (
    <div className={classes.statistic}>
      <div className={classes.statisticLabel}>
        {title}

        {tooltip ? <QuestionWithTooltip>{tooltip}</QuestionWithTooltip> : null}
      </div>

      {isLoading && !primaryValue ? (
        <Skeleton height={22} width={40} />
      ) : (
        <Typography className={classes.value} variant="h3">
          {primaryValue}
        </Typography>
      )}
    </div>
  );
};
