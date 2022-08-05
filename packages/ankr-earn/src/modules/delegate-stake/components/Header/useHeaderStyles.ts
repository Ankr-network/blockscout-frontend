import { darken, makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(2.5, 3),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
    },
  },

  icon: {
    margin: theme.spacing(0, 1),

    [theme.breakpoints.up('sm')]: {
      fontSize: 28,
    },
  },

  balanceRoot: {
    display: 'grid',
    alignItems: 'center',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),

    background: theme.palette.background.paper,

    [theme.breakpoints.up('lg')]: {
      background: theme.palette.background.default,
      padding: 0,
    },
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  balanceIcon: {
    marginRight: theme.spacing(1),
  },

  label: {
    color: theme.palette.text.secondary,
  },

  btn: {
    background: darken(theme.palette.background.default, 0.04),
    color: theme.palette.primary.main,
    height: 26,
    minWidth: 56,
    borderRadius: 8,
    fontSize: 13,
    marginLeft: theme.spacing(1),
  },
}));
