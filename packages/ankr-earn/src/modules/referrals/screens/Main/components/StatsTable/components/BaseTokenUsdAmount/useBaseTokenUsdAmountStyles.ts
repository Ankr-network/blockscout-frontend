import { makeStyles } from '@material-ui/core';

export const useBaseTokenUsdAmountStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  bigValue: {
    fontSize: 22,
    fontWeight: 700,
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
}));
