import { makeStyles } from '@material-ui/core';

export const useProtfolioHeaderStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,

    [theme.breakpoints.up('md')]: {
      fontSize: 30,
    },
  },

  checkbox: {
    marginRight: 0,
  },

  button: {
    minWidth: 180,
    borderRadius: 16,
    fontSize: 16,
    transition: 'background 0.2s, color 0.2s, border 0.2s',
  },

  link: {
    fontWeight: 600,
    padding: theme.spacing(1, 0),
  },

  divider: {
    display: 'block',
    height: 16,
    margin: 'auto',

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
