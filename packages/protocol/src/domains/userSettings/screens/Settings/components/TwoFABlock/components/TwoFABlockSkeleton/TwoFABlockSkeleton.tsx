import { Skeleton } from '@mui/material';

import { useTwoFABlockStyles } from '../../useTwoFABlockStyles';

export const TwoFABlockSkeleton = () => {
  const { classes } = useTwoFABlockStyles();

  return (
    <div>
      <div className={classes.top}>
        <Skeleton variant="rectangular" className={classes.topSkeleton} />
      </div>

      <div className={classes.info}>
        <Skeleton variant="rectangular" className={classes.bottomSkeleton} />
      </div>
    </div>
  );
};
