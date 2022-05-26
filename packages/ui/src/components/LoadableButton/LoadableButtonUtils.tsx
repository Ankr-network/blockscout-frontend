import { CircularProgress } from '@material-ui/core';
import { useStyles } from './LoadableButtonStyles';

export const LoadableButtonLoader = () => {
  const classes = useStyles();

  return (
    <>
      <CircularProgress
        className={classes.downLoader}
        variant="determinate"
        value={100}
        size={24}
      />
      <CircularProgress size={24} />
    </>
  );
};
