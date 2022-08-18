import { Box, Hidden, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { AmountSkeleton } from '../Amount';
import { NetworkIconTextSkeleton } from '../NetworkIconText/NetworkIconTextSkeleton';

import { useDashboardCardStyles } from './useDashboardCardStyles';

export const DashboardCardSkeleton = (): JSX.Element => {
  const classes = useDashboardCardStyles();

  const renderedMenuSkeleton = (
    <Skeleton
      className={classes.buttonSkeleton}
      height={44}
      variant="rect"
      width={44}
    />
  );

  return (
    <Paper className={classes.root}>
      <div className={classes.tokenInfoSlot}>
        <NetworkIconTextSkeleton />
      </div>

      <Hidden lgUp>
        <div className={classes.menuSlot}>{renderedMenuSkeleton}</div>
      </Hidden>

      <div className={classes.amountSlot}>
        <AmountSkeleton />
      </div>

      <div className={classes.buttonsSlot}>
        <Box width={{ lg: 105 }}>
          <Skeleton
            className={classes.buttonSkeleton}
            height={44}
            variant="rect"
            width="100%"
          />
        </Box>

        <Hidden mdDown>{renderedMenuSkeleton}</Hidden>
      </div>
    </Paper>
  );
};
