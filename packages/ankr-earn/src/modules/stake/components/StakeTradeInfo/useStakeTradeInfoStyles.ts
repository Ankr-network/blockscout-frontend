import { makeStyles } from '@material-ui/core';

export const useStakeTradeInfoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2.5, 2.75, 2.5, 2.75),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  infoArea: {
    margin: theme.spacing(0, 2, 0, 2),

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1.75, 0, 2, 0),
    },
  },
  actionsArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },

  icon: {
    fontSize: 66,

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },
  },

  title: {
    margin: theme.spacing(0, 0, 0.375, 0),
    fontSize: 16,
    fontWeight: 600,
  },

  link: {
    height: 38,

    '&:nth-child(2)': {
      margin: theme.spacing(1.5, 0, 0, 0),

      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 0, 0, 2),
      },
    },
  },
}));
