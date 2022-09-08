import { makeStyles } from '@material-ui/core';

export const useYieldStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 3),
  },

  slider: {
    display: 'block',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1),
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 700,
  },

  apy: {
    fontSize: 13,
  },

  value: {
    fontSize: 24,
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      fontSize: 28,
    },
  },
}));
