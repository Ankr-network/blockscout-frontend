import { darken, makeStyles } from '@material-ui/core';

export const useStakeFormStyles = makeStyles(theme => {
  return {
    box: {
      position: 'relative',
    },

    periodLabel: {
      display: 'flex',
      alignItems: 'center',
    },

    selectProviderBtn: {
      width: '100%',
      height: 54,
      justifyContent: 'flex-start',
      background: theme.palette.background.default,
      color: theme.palette.text.secondary,
      fontSize: 16,
      fontWeight: 400,

      '&:hover': {
        background: darken(theme.palette.background.default, 0.02),
        color: theme.palette.text.primary,
      },
    },

    selectProviderIcon: {
      display: 'flex',
      width: '1em',
      height: '1em',
      marginLeft: 'auto',
      fontSize: 24,
      color: theme.palette.text.primary,
    },

    selectProviderErrorColor: {
      color: theme.palette.error.main,
    },

    selectProviderError: {
      margin: theme.spacing(0.5, 1.5, 0),
      fontSize: '0.75rem',
    },
  };
});
