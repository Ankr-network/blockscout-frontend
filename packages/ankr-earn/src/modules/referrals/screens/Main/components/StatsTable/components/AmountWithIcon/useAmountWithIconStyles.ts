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
