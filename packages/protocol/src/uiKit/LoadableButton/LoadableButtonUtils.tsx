import { CircularProgress } from '@mui/material';

import { useStyles } from './LoadableButtonStyles';

export const LoadableButtonLoader = () => {
  const { classes } = useStyles();

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
