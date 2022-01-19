import { makeStyles, Theme } from '@material-ui/core';

export const usePlaceholderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 2, 6),
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 2, 10),
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
    },
  },

  buttonWrap: {
    minWidth: 170,
  },
}));
