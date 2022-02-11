import { makeStyles } from '@material-ui/core';

export const useSuccessEth2SwapStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    padding: theme.spacing(6, 14),
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 4),
    },
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: theme.spacing(0, 0, 4),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 3),
    },
  },

  info: {
    fontSize: 16,
    lineHeight: '20.8px',
    textAlign: 'center',

    margin: theme.spacing(0, 0, 4),
  },

  link: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },

  button: {
    width: '100%',

    '& + &': {
      marginTop: theme.spacing(3),
    },
  },
}));
