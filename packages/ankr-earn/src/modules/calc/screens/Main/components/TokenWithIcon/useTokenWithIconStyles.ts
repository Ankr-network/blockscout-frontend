import { makeStyles } from '@material-ui/core';

export const useTokenWithIconStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: theme.spacing(0.5, 1),
  },

  icon: {
    width: '1em',
    height: '1em',
    fontSize: 36,

    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },

  token: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
  },

  apy: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    lineHeight: 1,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
