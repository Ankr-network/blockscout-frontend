import { Divider, Skeleton } from '@mui/material';

import { useMainNavigationStyles } from './useMainNavigationStyles';

interface MainNavigationSkeletionProps {
  isLoggedIn: boolean;
}

export const MainNavigationSkeleton = ({
  isLoggedIn,
}: MainNavigationSkeletionProps) => {
  const { classes } = useMainNavigationStyles();

  return (
    <div className={classes.root}>
      <nav>
        <Skeleton className={classes.skeleton} variant="rectangular" />
        <Skeleton className={classes.skeleton} variant="rectangular" />
        <Skeleton className={classes.skeleton} variant="rectangular" />
        {isLoggedIn && (
          <Skeleton className={classes.skeleton} variant="rectangular" />
        )}
      </nav>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <nav>
        <Skeleton className={classes.skeleton} variant="rectangular" />
        <Skeleton className={classes.skeleton} variant="rectangular" />
        <Skeleton className={classes.skeleton} variant="rectangular" />
      </nav>
    </div>
  );
};
