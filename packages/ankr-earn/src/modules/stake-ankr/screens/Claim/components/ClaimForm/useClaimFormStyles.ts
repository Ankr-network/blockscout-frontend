import { makeStyles } from '@material-ui/core';

export const useClaimFormStyles = makeStyles(theme => ({
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

  disabledLabel: {
    color: theme.palette.text.primary,
  },
}));
