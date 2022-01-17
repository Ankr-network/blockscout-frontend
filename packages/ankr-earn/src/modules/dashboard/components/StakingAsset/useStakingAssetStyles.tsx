import { makeStyles, Theme } from '@material-ui/core';

export const useStakingAssetStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 220,

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    },
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },

  tradeButton: {
    width: 115,
  },

  bottomWrapper: {
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  links: {
    justifyContent: 'flex-start',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
}));
