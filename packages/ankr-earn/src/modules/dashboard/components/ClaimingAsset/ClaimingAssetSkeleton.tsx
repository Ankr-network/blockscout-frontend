import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { NetworkIconText } from '../NetworkIconText';

import { useClaimingAssetStyles } from './useClaimingAssetStyles';

export const ClaimingAssetSkeleton = (): JSX.Element => {
  const classes = useClaimingAssetStyles();

  return (
    <Paper className={classes.root}>
      <Box mb={{ xs: 3, sm: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item sm xs={12}>
            <NetworkIconText isLoading />
          </Grid>

          <Grid item xs="auto">
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
