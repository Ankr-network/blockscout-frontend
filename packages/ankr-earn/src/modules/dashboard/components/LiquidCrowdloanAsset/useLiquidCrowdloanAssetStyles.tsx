import { makeStyles, Theme } from '@material-ui/core';

export const useLiquidCrowdloanAssetStyles = makeStyles<Theme>(theme => ({
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

  claimButton: {
    width: 115,
  },

  btnSkeleton: {
    borderRadius: 12,
  },

  redeemTimer: {
    borderRadius: 12,
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5, 1.5),
  },

  rewards: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },

  reward: {
    display: 'flex',
    flexDirection: 'column',

    margin: theme.spacing(0, 0, 1, 0),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 5, 0, 0),
    },
  },

  rewardsLabel: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.secondary,

    marginBottom: theme.spacing(0.5),
  },

  rewardsValue: {
    fontWeight: 700,
    fontSize: 22,
  },
}));
