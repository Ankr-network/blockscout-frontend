import { Box, Grid, Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { useDashboardCardStyles } from './useDashboardCardStyles';

interface IDashboardCardProps {
  amountSlot?: ReactNode;
  badgeSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  menuSlot?: ReactNode;
  networkAndIconSlot?: ReactNode;
}

export const DashboardCard = ({
  amountSlot,
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
        <Grid item sm xs={12}>
          {amountSlot}
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
