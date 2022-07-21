import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => ({
  box: {
    position: 'relative',
  },

  periodLabel: {
    display: 'flex',
    alignItems: 'center',
  },

  stakeBtn: {
    borderRadius: 16,
  },

  stepper: {
    maxWidth: 380,
    margin: theme.spacing(1, 'auto', 0),
  },
}));
