import { useJwtTokenManagerStyles } from './useJwtTokenManagerStyles';

export const JwtTokenManagerSkeleton = () => {
  const { classes } = useJwtTokenManagerStyles();

  return (
    <div className={classes.skeleton}>
      <div className={classes.item} />
      <div className={classes.item} />
    </div>
  );
};
