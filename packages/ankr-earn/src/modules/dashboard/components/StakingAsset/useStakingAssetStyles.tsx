import { makeStyles, Theme } from '@material-ui/core';

export const useStakingAssetStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(3.75, 3.75, 2.75, 3.75),
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: 220,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',

    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },
  tradeButton: {
    borderRadius: theme.spacing(2),
    background: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.default}`,
    color: theme.palette.background.paper,

    transition: '0.2s all',

    '&:hover': {
      background: theme.palette.background.paper,
      borderColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
  },
}));
