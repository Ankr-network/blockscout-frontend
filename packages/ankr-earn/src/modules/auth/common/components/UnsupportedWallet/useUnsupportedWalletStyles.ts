import { makeStyles } from '@material-ui/core';

export const useUnsupportedWalletStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
    padding: theme.spacing(6, 3, 4),
    maxWidth: 620,
    margin: '0 auto',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10, 6, 6),
    },
  },

  icon: {
    display: 'inline-block',
    height: 72,
    marginBottom: theme.spacing(2),
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  button: {
    marginTop: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8),
    },
  },
}));
