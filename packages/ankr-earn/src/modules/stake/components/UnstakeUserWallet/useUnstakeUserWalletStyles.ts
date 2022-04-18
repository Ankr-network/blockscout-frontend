import { makeStyles } from '@material-ui/core';

export const useUnstakeUserWalletStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: 600,
    margin: theme.spacing(0, 'auto', 0, 'auto'),
    padding: theme.spacing(8, 0, 0, 0),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 0, 0),
    },
  },

  container: {
    '&&': {
      maxWidth: 520 + theme.spacing(4),
      padding: theme.spacing(0, 4, 0, 4),
    },
  },

  footer: {
    margin: theme.spacing(3, 0, 0, 0),
    padding: theme.spacing(0, 0, 4, 0),
  },

  title: {
    maxWidth: 450,
    margin: theme.spacing(0, 'auto', 5, 'auto'),
    textAlign: 'center',
  },

  fieldLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 2, 0),
  },
}));
