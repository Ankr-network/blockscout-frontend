import { Skeleton } from '@material-ui/lab';
import { useNavigationStyles } from './useNavigationStyles';

export const NavigationSkeleton = () => {
  const classes = useNavigationStyles();

  return (
    <div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rect" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rect" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rect" />
      </div>
      <div className={classes.item}>
        <Skeleton className={classes.skeleton} variant="rect" />
      </div>
    </div>
  );
};
