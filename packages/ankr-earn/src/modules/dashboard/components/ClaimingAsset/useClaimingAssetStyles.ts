import { makeStyles } from '@material-ui/core';

export const useClaimingAssetStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2.5, 2.5, 2.5, 2.5),

    [theme.breakpoints.up('sm')]: {
      minHeight: 220,
      padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    },
  },

  infoLabel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0.75, 1.25, 0.75, 1.25),
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    borderRadius: 30,
  },
  infoLabelTxt: {
    margin: theme.spacing(0, 0, 0, 1),
    fontSize: 13,
    lineHeight: 1,
  },

  amount: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1,

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },

  claimBtn: {
    width: 146,
  },

  btnSkeleton: {
    borderRadius: 12,
  },
}));
