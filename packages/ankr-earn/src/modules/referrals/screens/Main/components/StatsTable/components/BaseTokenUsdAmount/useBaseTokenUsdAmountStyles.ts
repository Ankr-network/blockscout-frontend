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
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },

  bigValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigValue: {
    fontSize: 22,
    fontWeight: 700,
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },

  chip: {
    height: 28,
    borderRadius: '12px',
    fontSize: 13,
    fontWeight: 500,
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
