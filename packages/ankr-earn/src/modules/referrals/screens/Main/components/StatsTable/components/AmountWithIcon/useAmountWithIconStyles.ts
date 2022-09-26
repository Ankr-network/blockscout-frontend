import { makeStyles } from '@material-ui/core';

export const useAmountWithIconStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  icon: {
    width: 34,
    height: 34,
    marginRight: theme.spacing(1),
  },

  values: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
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
}));
