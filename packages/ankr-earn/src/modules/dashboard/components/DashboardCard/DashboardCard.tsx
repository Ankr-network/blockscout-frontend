import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';

import { DEFAULT_FIXED } from 'modules/common/const';

import { useDashboardCardStyles } from './useDashboardCardStyles';

interface IDashboardCardProps {
  amount?: BigNumber;
  amountInfoSlot?: ReactNode;
  badgeSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  menuSlot?: ReactNode;
  networkAndIconSlot?: ReactNode;
}

export const DashboardCard = ({
  amount,
  amountInfoSlot,
  badgeSlot,
  buttonsSlot,
  menuSlot,
  networkAndIconSlot,
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

          {amountInfoSlot && (
            <Typography
              className={classes.amountInfo}
              color="textSecondary"
              variant="subtitle1"
            >
              {amountInfoSlot}
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
