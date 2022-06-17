import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NetworkIconText } from '../NetworkIconText';

import { useDashboardCardStyles } from './useDashboardCardStyles';

export const DashboardCardSkeleton = (): JSX.Element => {
  const classes = useDashboardCardStyles();

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <NetworkIconText isLoading />
          </Grid>

          <Grid item className={classes.menuCol} xs="auto">
            <Skeleton
              className={classes.menuSkeleton}
              height={32}
              variant="rect"
              width={32}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container alignItems="flex-end" spacing={2}>
        <Grid item sm xs={12}>
          <Typography variant="h3">
            <Skeleton width={80} />
          </Typography>
        </Grid>

        <Grid item sm="auto" xs={12}>
          <Typography>
            <Skeleton
              className={classes.btnSkeleton}
              height={40}
              variant="rect"
              width={115}
            />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
