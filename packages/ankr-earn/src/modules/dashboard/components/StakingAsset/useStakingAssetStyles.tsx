import { makeStyles, Theme } from '@material-ui/core';

export const useStakingAssetStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      minHeight: 220,
      padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    },
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },

  tradeButton: {
    width: 115,
  },

  btnSkeleton: {
    borderRadius: 12,
  },
}));
