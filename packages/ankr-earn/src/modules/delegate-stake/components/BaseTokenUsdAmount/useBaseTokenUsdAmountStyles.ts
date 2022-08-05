import { makeStyles } from '@material-ui/core';

export const useBaseTokenUsdAmountStyles = makeStyles(theme => ({
  root: {
    alignItems: 'inherit',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
}));
