import { t } from '@ankr.com/common';
import { Divider, Skeleton, Typography } from '@mui/material';

import { useMainNavigationStyles } from './useMainNavigationStyles';

interface MainNavigationSkeletionProps {
  isMobileSideBar: boolean;
  isLoggedIn: boolean;
}

export const MainNavigationSkeleton = ({
  isMobileSideBar,
  isLoggedIn,
}: MainNavigationSkeletionProps) => {
  const { classes } = useMainNavigationStyles(isMobileSideBar);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div>
          <Typography className={classes.tip}>
            {t('main-navigation.endpoints')}
          </Typography>
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
      </div>
      {isLoggedIn && isMobileSideBar && (
        <div className={classes.logout}>
          <Skeleton className={classes.skeleton} variant="rectangular" />
        </div>
      )}
    </div>
  );
};
