import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ReactText } from 'react';

import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useStatsStyles } from './useStatsStyles';

interface IStatsItemProps {
  title: string;
  isLoading?: boolean;
  tooltip?: string;
  primaryValue?: ReactText;
  secondaryValue?: ReactText;
}

export const StatsItem = ({
  title,
  isLoading = false,
  tooltip,
  primaryValue,
  secondaryValue,
}: IStatsItemProps): JSX.Element => {
  const classes = useStatsStyles();

  const withSecondaryValue = !!secondaryValue;

  return (
    <div className={classes.statistic}>
      <div className={classes.statisticLabel}>
        {title}

        {tooltip ? <QuestionWithTooltip>{tooltip}</QuestionWithTooltip> : null}
      </div>

      {withSecondaryValue ? (
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box mr={1}>
            {isLoading && !primaryValue ? (
              <Skeleton height={22} width={40} />
            ) : (
              <Typography className={classes.value} variant="h3">
                {primaryValue}
              </Typography>
            )}
          </Box>

          {isLoading && !secondaryValue ? (
            <Skeleton height={22} width={40} />
          ) : (
            <Typography
              className={classes.value}
              color="textSecondary"
              variant="h3"
            >
              {secondaryValue}
            </Typography>
          )}
        </Box>
      ) : (
        <>
          {isLoading && !primaryValue ? (
            <Skeleton height={22} width={40} />
          ) : (
            <Typography className={classes.value} variant="h3">
              {primaryValue}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};
