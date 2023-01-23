import { Skeleton } from '@mui/material';
import { useNavigationStyles } from './useNavigationStyles';

export const NavigationSkeleton = () => {
  const { classes } = useNavigationStyles();

  return (
    <div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rectangular" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rectangular" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rectangular" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rectangular" />
      </div>
    </div>
  );
};
