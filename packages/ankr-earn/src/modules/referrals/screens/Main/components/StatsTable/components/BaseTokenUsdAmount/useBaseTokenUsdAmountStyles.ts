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

  bigValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigValue: {
    fontSize: 22,
    fontWeight: 700,
    marginRight: theme.spacing(1),
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
    color: theme.palette.primary.main,
  },
}));
