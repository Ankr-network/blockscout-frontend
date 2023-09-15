import { Skeleton } from '@mui/material';

import { useUserEndpointCardStyles } from './useUserEndpointCardStyles';

export const UserEndpointCardSkeleton = () => {
  const { classes } = useUserEndpointCardStyles(false);

  return <Skeleton variant="rectangular" className={classes.skeleton} />;
};
