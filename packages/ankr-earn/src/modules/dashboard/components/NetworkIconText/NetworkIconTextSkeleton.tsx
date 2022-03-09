import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { useNetworkIconTextStyles } from './useNetworkIconTextStyles';

export const NetworkIconTextSkeleton = (): JSX.Element => {
  const classes = useNetworkIconTextStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Skeleton
          className={classNames(classes.icon, classes.iconSkeleton)}
          variant="rect"
        />
      </Grid>

      <Grid item>
        <Typography className={classes.token}>
          <Skeleton width={80} />
        </Typography>

        <Typography className={classes.network}>
          <Skeleton width={94} />
        </Typography>
      </Grid>
    </Grid>
  );
};
