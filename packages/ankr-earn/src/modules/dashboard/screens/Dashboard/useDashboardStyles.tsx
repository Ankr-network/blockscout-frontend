import { makeStyles, Theme } from '@material-ui/core';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(7.5),
  },

  title: {
    marginBottom: theme.spacing(4),
  },

  assetsTitle: {
    fontSize: 24,
    marginBottom: theme.spacing(4),
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
    fontSize: 40,
  },
}));
