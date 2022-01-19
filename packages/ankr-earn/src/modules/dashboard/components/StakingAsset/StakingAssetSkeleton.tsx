import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { NetworkIconText } from '../NetworkIconText';
import { useStakingAssetStyles } from './useStakingAssetStyles';

export const StakingAssetSkeleton = () => {
  const classes = useStakingAssetStyles();

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm>
            <NetworkIconText isLoading />
          </Grid>

          <Grid item xs="auto" className={classes.pendingCol}>
            <Skeleton width={150} />
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
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
              variant="rect"
              width={115}
              height={40}
              className={classes.btnSkeleton}
            />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
