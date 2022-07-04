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

    providerField: {
      display: 'flex',
      margin: 0,
      width: '100%',
      height: 54,
      borderRadius: 8,
      paddingLeft: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: theme.palette.background.default,
    },

    providerText: {
      color: theme.palette.text.primary,
      fontSize: 16,
      fontWeight: 400,
    },

    selectProviderErrorColor: {
      color: theme.palette.error.main,
    },

    selectProviderError: {
      margin: theme.spacing(0.5, 1.5, 0),
      fontSize: '0.75rem',
    },

    stakeBtn: {
      borderRadius: 16,
    },
  };
});
