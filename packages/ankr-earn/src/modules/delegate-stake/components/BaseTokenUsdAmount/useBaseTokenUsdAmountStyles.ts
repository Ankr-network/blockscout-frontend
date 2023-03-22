import { makeStyles } from '@material-ui/core';

export const useBaseTokenUsdAmountStyles = makeStyles(theme => ({
  root: {
    alignItems: 'inherit',

    [theme.breakpoints.up('sm')]: {
      width: '100%',
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
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 2, 0, 0),
    },

    [theme.breakpoints.up('md')]: {
      margin: 0,
    },
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
}));