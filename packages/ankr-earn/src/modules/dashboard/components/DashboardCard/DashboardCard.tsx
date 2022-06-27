import { Box, ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DEFAULT_FIXED } from 'modules/common/const';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useDashboardCardStyles } from './useDashboardCardStyles';

interface IDashboardCardProps {
  amount?: BigNumber;
  nativeAmountText?: string;
  badgeSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  menuSlot?: ReactNode;
  networkAndIconSlot?: ReactNode;
  tooltip?: string;
}

export const DashboardCard = ({
  amount,
  nativeAmountText,
  badgeSlot,
  buttonsSlot,
  menuSlot,
  networkAndIconSlot,
  tooltip,
}: IDashboardCardProps): JSX.Element => {
  const classes = useDashboardCardStyles();

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs>
            {networkAndIconSlot}
          </Grid>

          {menuSlot && (
            <Grid item className={classes.menuCol} xs="auto">
              {menuSlot}
            </Grid>
          )}

          {badgeSlot && (
            <Grid item sm="auto" xs={12}>
              {badgeSlot}
            </Grid>
          )}
        </Grid>
      </Box>

      <Grid container alignItems="flex-end" spacing={2}>
        <Grid item sm>
          {amount && (
            <Typography className={classes.amount}>
              {amount.decimalPlaces(DEFAULT_FIXED).toFormat()}
            </Typography>
          )}

          {nativeAmountText && (
            <Typography
              className={classes.amountInfo}
              color="textSecondary"
              component="p"
              variant="subtitle1"
            >
              {nativeAmountText}

              {tooltip && (
                <Tooltip arrow title={tooltip}>
                  <ButtonBase>
                    <QuestionIcon htmlColor="inherit" size="xs" />
                  </ButtonBase>
                </Tooltip>
              )}
            </Typography>
          )}
        </Grid>

        {buttonsSlot && (
          <Grid item sm="auto" xs={12}>
            {buttonsSlot}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
