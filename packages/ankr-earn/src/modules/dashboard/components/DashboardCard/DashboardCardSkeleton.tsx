import { Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useIsMDDown } from 'ui';

import { NetworkIconText } from '../NetworkIconText';

import { useDashboardCardStyles } from './useDashboardCardStyles';

export const DashboardCardSkeleton = (): JSX.Element => {
  const classes = useDashboardCardStyles();
  const isMDDown = useIsMDDown();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid container item alignItems="center" lg={4} md={12} xs={12}>
          <Grid container item alignItems="center" lg="auto" md={12} xs={12}>
            <Grid item lg="auto" md={12} xs={12}>
              <div className={classes.wrapper}>
                <NetworkIconText isLoading />

                {isMDDown && (
                  <Skeleton
                    className={classes.menuSkeleton}
                    height={40}
                    variant="rect"
                    width={40}
                  />
                )}
              </div>
            </Grid>
          </Grid>

          {isMDDown && (
            <Grid item lg="auto" md={12} xs={12}>
              <div>
                <Skeleton width={80} />

                <Skeleton width={80} />
              </div>
            </Grid>
          )}

          {isMDDown && (
            <Grid item className={classes.badgeSlot} lg="auto" md={12} xs={12}>
              <Skeleton width={240} />
            </Grid>
          )}
        </Grid>

        <Grid container item alignItems="center" lg={8} md={12} xs={12}>
          <Grid container item alignItems="center" lg={5} md={6} xs={12}>
            {!isMDDown && (
              <Grid item lg={12} xs={12}>
                <Skeleton width={80} />

                <Skeleton width={80} />
              </Grid>
            )}

            {!isMDDown && (
              <Grid item className={classes.badgeSlot} lg={12} md={12} xs={12}>
                <Skeleton width={240} />
              </Grid>
            )}
          </Grid>

          <Grid
            container
            item
            alignItems="center"
            className={classes.buttons}
            justifyContent="flex-end"
            lg={7}
            md={12}
            xs={12}
          >
            <Grid item className={classes.controls} lg={10} md={12} xs={12}>
              <Skeleton className={classes.btnSkeleton} variant="rect" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
