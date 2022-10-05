import { alpha, makeStyles } from '@material-ui/core';

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
    alignItems: 'flex-end',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },

  bigIcon: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      width: 34,
      height: 34,
      marginRight: theme.spacing(1),
      display: 'block',
    },
  },

  smallIcon: {
    display: 'block',
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  values: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    justifyContent: 'center',
  },

  bigValue: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 700,
  },

  usdAmount: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },

  tooltipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 220,
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),

    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.4)}`,

    '&:last-child': {
      borderBottom: 'none',
    },
  },

  text: {
    fontSize: 12,
    fontWeight: 400,
  },
}));
