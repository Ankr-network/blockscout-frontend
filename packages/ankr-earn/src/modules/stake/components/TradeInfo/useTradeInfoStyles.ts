import { makeStyles } from '@material-ui/core';

export const useTradeInfoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(2.5, 2.75, 2.5, 2.75),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  infoArea: {
    margin: theme.spacing(1.75, 0, 2, 0),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 0, 2),
    },
  },

  actionsArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
  },

  icon: {
    fontSize: 50,

    [theme.breakpoints.up('md')]: {
      fontSize: 66,
    },
  },

  title: {
    margin: theme.spacing(0, 0, 0.375, 0),
    fontSize: 16,
    fontWeight: 600,
  },

  link: {
    height: 38,
  },
}));
