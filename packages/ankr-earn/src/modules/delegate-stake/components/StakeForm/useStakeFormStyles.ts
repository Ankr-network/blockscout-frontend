import { makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => {
  return {
    box: {
      position: 'relative',
      padding: theme.spacing(6, 7.5, 3),
    },

    periodLabel: {
      display: 'flex',
      alignItems: 'center',
    },

    stepper: {
      maxWidth: 380,
      margin: theme.spacing(1, 'auto', 0),
    },

    approvalSettings: {
      textAlign: 'center',
      fontWeight: 500,
      fontSize: 13,
      lineHeight: 1.23,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1.5),
      cursor: 'pointer',
    },
  };
});
