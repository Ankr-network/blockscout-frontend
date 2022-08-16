import { Skeleton } from '@material-ui/lab';

import { useStyles } from './EmailSkeletonStyles';

export const EmailSkeleton = () => {
  const classes = useStyles();

  return <Skeleton className={classes.email} variant="text" />;
};
