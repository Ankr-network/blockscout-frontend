import { makeStyles, Theme } from '@material-ui/core';

export const useStakingAssetStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: 220,
    maxWidth: 566,
  },
  amount: {
    fontSize: 30,
    fontWeight: 'bold',

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },
  tradeButton: {
    borderRadius: theme.spacing(2),
    background: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.default}`,
    color: theme.palette.text.secondary,

    transition: '0.2s all',

    '&:hover': {
      background: theme.palette.background.paper,
      borderColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
  },
  upperWrapper: {
    flexDirection: 'column',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      marginBottom: 0,
    },
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
  pendingWrapper: {
    justifyContent: 'flex-start',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  },
}));
