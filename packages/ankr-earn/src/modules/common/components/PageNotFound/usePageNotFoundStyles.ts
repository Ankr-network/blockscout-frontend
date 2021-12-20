import { makeStyles, Theme } from '@material-ui/core';

export const usePageNotFoundStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: '20vh 0',
  },

  box: {
    maxWidth: 600,
    margin: '0 auto',
    padding: theme.spacing(4, 2),
    textAlign: 'center',
  },

  title: {
    marginBottom: theme.spacing(2),
    fontSize: 60,

    [theme.breakpoints.up('sm')]: {
      fontSize: 80,
    },
  },

  button: {
    minWidth: 180,
  },
}));
