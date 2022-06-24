import { darken, makeStyles } from '@material-ui/core';

export const useAnkrBalanceStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    gap: theme.spacing(0, 1),
    padding: theme.spacing(1),

    background: theme.palette.background.paper,

    [theme.breakpoints.up('lg')]: {
      background: theme.palette.background.default,
      padding: 0,
    },
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
  },
}));
