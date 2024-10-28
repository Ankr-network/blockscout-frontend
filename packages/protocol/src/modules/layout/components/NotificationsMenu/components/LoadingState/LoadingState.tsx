import { Skeleton } from '@mui/material';

import { SKELETON_ROWS_ARRAY } from 'modules/notifications/const';

import { useLoadingStateStyles } from './useLoadingStateStyles';

export const LoadingState = () => {
  const { classes } = useLoadingStateStyles();

  return (
    <div className={classes.root}>
      {SKELETON_ROWS_ARRAY.map((_, index) => (
        <div key={index} className={classes.item}>
          <Skeleton className={classes.icon} variant="circular" />
          <div className={classes.textWrapper}>
            <Skeleton className={classes.title} variant="rectangular" />
            <Skeleton className={classes.description} variant="rectangular" />
          </div>
        </div>
      ))}
    </div>
  );
};
