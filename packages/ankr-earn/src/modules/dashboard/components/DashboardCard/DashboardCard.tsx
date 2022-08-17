import { Grid, Paper } from '@material-ui/core';
import { ReactNode } from 'react';

import { useIsMDDown } from 'ui';

import { useDashboardCardStyles } from './useDashboardCardStyles';

interface IDashboardCardProps {
  amountSlot?: ReactNode;
  badgeSlot?: ReactNode;
  buttonsSlot?: ReactNode;
  networkAndIconSlot?: ReactNode;
  menuSlot?: ReactNode;
}

export const DashboardCard = ({
  amountSlot,
  badgeSlot,
  buttonsSlot,
  networkAndIconSlot,
  menuSlot,
}: IDashboardCardProps): JSX.Element => {
  const classes = useDashboardCardStyles();
  const isMDDown = useIsMDDown();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid
          container
          item
          alignItems="center"
          lg={4}
          md={12}
          spacing={2}
          xs={12}
        >
          <Grid container item alignItems="center" lg="auto" md={12} xs={12}>
            <Grid item lg="auto" md={12} xs={12}>
              <div className={classes.wrapper}>
                {networkAndIconSlot}

                {isMDDown && menuSlot}
              </div>
            </Grid>
          </Grid>

          {isMDDown && (
            <Grid item lg="auto" md={12} xs={12}>
              {amountSlot}
            </Grid>
          )}

          {isMDDown && badgeSlot && (
            <Grid item className={classes.badgeSlot} lg="auto" md={12} xs={12}>
              {badgeSlot}
            </Grid>
          )}
        </Grid>

        <Grid container item alignItems="center" lg={8} md={12} xs={12}>
          <Grid
            container
            item
            alignItems="center"
            lg={4}
            md={6}
            spacing={2}
            xs={12}
          >
            {!isMDDown && (
              <Grid item lg={12} xs={12}>
                {amountSlot}
              </Grid>
            )}

            {!isMDDown && badgeSlot && (
              <Grid item className={classes.badgeSlot} lg={12} md={12} xs={12}>
                {badgeSlot}
              </Grid>
            )}
          </Grid>

          <Grid
            container
            item
            alignItems="center"
            className={classes.buttons}
            justifyContent="flex-end"
            lg={8}
            md={12}
            xs={12}
          >
            {buttonsSlot && (
              <Grid item className={classes.controls} lg={10} md={12} xs={12}>
                {buttonsSlot}
              </Grid>
            )}

            {!isMDDown && menuSlot && <Grid item>{menuSlot}</Grid>}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
