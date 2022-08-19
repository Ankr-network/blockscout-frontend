import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useAmountStyles } from './useAmountStyles';

export const AmountSkeleton = (): JSX.Element => {
  const classes = useAmountStyles();

  return (
    <>
      <Typography className={classes.amount}>
        <Skeleton width={75} />
      </Typography>

      <Typography className={classes.amountInfo} color="textSecondary">
        <Skeleton width={120} />
      </Typography>
    </>
  );
};
