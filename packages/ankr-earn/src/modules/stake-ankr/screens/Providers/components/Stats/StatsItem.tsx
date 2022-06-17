import { Box, Typography } from '@material-ui/core';
import { ReactText } from 'react';

import { QuestionWithTooltip } from 'uiKit/QuestionWithTooltip';

import { useStatsStyles } from './useStatsStyles';

interface IStatsItemProps {
  title: string;
  tooltip?: string;
  primaryValue?: ReactText;
  secondaryValue?: ReactText;
}

export const StatsItem = ({
  title,
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
            <Typography className={classes.value} variant="h3">
              {primaryValue}
            </Typography>
          </Box>

          <Typography
            className={classes.value}
            color="textSecondary"
            variant="h3"
          >
            {secondaryValue}
          </Typography>
        </Box>
      ) : (
        <Typography className={classes.value} variant="h3">
          {primaryValue}
        </Typography>
      )}
    </div>
  );
};
