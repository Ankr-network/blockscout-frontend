import { makeStyles } from '@material-ui/core';

export const useTotalClaimedStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 4),
    marginBottom: theme.spacing(4),
    borderRadius: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },

  wrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  amount: {
    marginRight: theme.spacing(3),
    alignItems: 'flex-start',

    [theme.breakpoints.up('md')]: {
      alignItems: 'inherit',
    },
  },
}));
