import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => {
  return {
    box: {
      position: 'relative',
    },

    periodLabel: {
      display: 'flex',
      alignItems: 'center',
    },

    stepper: {
      maxWidth: 380,
      margin: theme.spacing(1, 'auto', 0),
    },
  };
});
