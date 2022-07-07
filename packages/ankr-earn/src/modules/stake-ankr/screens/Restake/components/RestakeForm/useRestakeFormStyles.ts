import { makeStyles } from '@material-ui/core';

export const useRestakeFormStyles = makeStyles(theme => {
  return {
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
  };
});
