import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NetworkIconText } from '../NetworkIconText';

import { useStakingAssetStyles } from './useStakingAssetStyles';

export const StakingAssetSkeleton = (): JSX.Element => {
  const classes = useStakingAssetStyles();

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item sm xs={12}>
            <NetworkIconText isLoading />
          </Grid>

          <Grid item className={classes.pendingCol} xs="auto">
            <Skeleton width={150} />
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs>
          <Typography className={classes.amount}>
            <Skeleton width={80} />
          </Typography>
        </Grid>

        <Grid item xs="auto">
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
