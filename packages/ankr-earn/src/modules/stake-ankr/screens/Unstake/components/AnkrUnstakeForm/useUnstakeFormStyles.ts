import { makeStyles } from '@material-ui/core';

export const useUnstakeFormStyles = makeStyles(theme => ({
  box: {
    position: 'relative',
  },

  stepper: {
    maxWidth: 380,
    margin: theme.spacing(1, 'auto', 0),
  },
}));
