import { makeStyles, Theme } from '@material-ui/core';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(7.5),
  },

  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 30,
      marginBottom: theme.spacing(4),
    },
  },

  assetsTitle: {
    fontSize: 20,
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
      marginBottom: theme.spacing(4),
    },
  },

  paper: {
    padding: theme.spacing(2.75, 3.75),
    marginBottom: theme.spacing(5.5),
  },
  balanceLabel: {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 30,

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },
}));
